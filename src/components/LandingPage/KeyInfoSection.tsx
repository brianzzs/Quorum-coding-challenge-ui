import React, { useState, useMemo } from 'react';
import { SimpleGrid, Card, Text, Group, Title, NumberFormatter, Select, List, ThemeIcon, Badge } from '@mantine/core';
import { IconUsers, IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { useBills } from '../../hooks/useBills';
import { useVoteSummaries } from '../../hooks/useVoteSummaries';
import { useLegislators } from '../../hooks/useLegislators';
import { Bill } from '../../types/api/bills';
import { CardStatus } from '../common/CardStatus';
import { LegislatorVoteCounts } from '../common/LegislatorVoteCounts';

interface BillWithSummary extends Bill {
    supporters_count: number | null;
    opponents_count: number | null;
}

const KeyInfoSection: React.FC = () => {
  const [selectedLegislatorId, setSelectedLegislatorId] = useState<number | null>(null);

  const { data: billsData, isLoading: isLoadingBills, isError: isErrorBills, error: errorBills } = useBills();
  const { data: voteSummaryData, isLoading: isLoadingVoteSummary, isError: isErrorVoteSummary, error: errorVoteSummary } = useVoteSummaries();
  const { data: legislatorsData, isLoading: isLoadingLegislators, isError: isErrorLegislators, error: errorLegislators } = useLegislators();

  const combinedBillData: BillWithSummary[] = useMemo(() => {
    if (!billsData || !voteSummaryData) return [];
    const voteSummaryMap = new Map(voteSummaryData.map(summary => [summary.bill_id, summary]));
    return billsData.map(bill => ({
        ...bill,
        supporters_count: voteSummaryMap.get(bill.id)?.supporters_count ?? null,
        opponents_count: voteSummaryMap.get(bill.id)?.opponents_count ?? null,
    }));
  }, [billsData, voteSummaryData]);

  const legislatorOptions = legislatorsData?.map(leg => ({ value: leg.id.toString(), label: leg.name })) ?? [];
  const totalBillsCount = billsData?.length ?? 0;
  const totalLegislatorsCount = legislatorsData?.length ?? 0;
  const isLoadingCombinedBills = isLoadingBills || isLoadingVoteSummary;
  const isErrorCombinedBills = isErrorBills || isErrorVoteSummary;
  const errorCombinedBills = errorBills || errorVoteSummary;

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing="lg"
      p="lg"
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
        <Group justify="space-between" mb="xs">
          <Title order={4} style={{ color: '#3C3B6E' }}>Recently Introduced Bills</Title>
        </Group>
        <CardStatus isLoading={isLoadingCombinedBills} isError={isErrorCombinedBills} error={errorCombinedBills}>
          {combinedBillData && combinedBillData.length > 0 ? (
             <List spacing="sm" size="sm" mt="sm" >
              {combinedBillData.slice(0, 5).map(bill => (
                  <List.Item key={bill.id}>
                      <Text size="sm" fw={500}>{bill.title}</Text>
                      <Text size="xs" c="dimmed" mb={4}>{bill.sponsor_name ?? 'No Sponsor Info'}</Text>
                      {(bill.supporters_count !== null || bill.opponents_count !== null) && (
                          <Group gap="xs">
                              <Badge
                                size="sm"
                                variant="light"
                                color="teal"
                                leftSection={<IconThumbUp size={14} />}
                              >
                                  {bill.supporters_count ?? '-'}
                              </Badge>
                              <Badge
                                size="sm"
                                variant="light"
                                color="red"
                                leftSection={<IconThumbDown size={14} />}
                              >
                                  {bill.opponents_count ?? '-'}
                              </Badge>
                          </Group>
                      )}
                  </List.Item>
              ))}
            </List>
          ) : (
            <Text c="dimmed" size="sm" mt="sm">No bills found.</Text>
          )}
        </CardStatus>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
        <Group justify="space-between" mb="md">
            <Title order={4} style={{ color: '#3C3B6E' }}>Legislator Activity</Title>
            <ThemeIcon variant="light" size={30}><IconUsers size="1.2rem" /></ThemeIcon>
        </Group>
        <CardStatus isLoading={isLoadingLegislators} isError={isErrorLegislators} error={errorLegislators}>
            <Select
                data={legislatorOptions}
                value={selectedLegislatorId?.toString() ?? null}
                onChange={(_value) => setSelectedLegislatorId(_value ? parseInt(_value, 10) : null)}
                placeholder="Select a legislator..."
                searchable
                clearable
                nothingFoundMessage="No legislators found"
                disabled={isLoadingLegislators}
                mb="md"
            />
            {selectedLegislatorId && (
                <LegislatorVoteCounts legislatorId={selectedLegislatorId} />
            )}
             {!selectedLegislatorId && (
                <Text c="dimmed" size="sm" ta="center" mt="md">Select a legislator to see their activity.</Text>
            )}
        </CardStatus>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: '100%' }}>
        <Title order={4} mb="md" style={{ color: '#3C3B6E' }}>Platform Statistics</Title>
        <CardStatus isLoading={isLoadingBills || isLoadingLegislators} isError={isErrorBills || isErrorLegislators} error={errorBills || errorLegislators}>
            <SimpleGrid cols={2} spacing="md">
            <div>
                <Text size="xs" c="dimmed">Tracked Bills</Text>
                <Text fw={500} size="lg"><NumberFormatter value={totalBillsCount} thousandSeparator /></Text>
            </div>
            <div>
                <Text size="xs" c="dimmed">Tracked Legislators</Text>
                <Text fw={500} size="lg"><NumberFormatter value={totalLegislatorsCount} thousandSeparator /></Text>
            </div>
            </SimpleGrid>
        </CardStatus>
      </Card>
    </SimpleGrid>
  );
};

export default KeyInfoSection; 