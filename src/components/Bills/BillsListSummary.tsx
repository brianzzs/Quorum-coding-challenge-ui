import React, { useMemo } from 'react';
import { Card, Text, Group, Title, List, Badge } from '@mantine/core';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { useBills } from '../../hooks/useBills';
import { useVoteSummaries } from '../../hooks/useVoteSummaries';
import { Bill } from '../../types/api/bills';
import { CardStatus } from '../common/CardStatus';

interface BillWithSummary extends Bill {
    supporters_count: number | null;
    opponents_count: number | null;
}

export const BillsListSummary: React.FC = () => {
    const { data: billsData, isLoading: isLoadingBills, isError: isErrorBills, error: errorBills } = useBills();
    const { data: voteSummaryData, isLoading: isLoadingVoteSummary, isError: isErrorVoteSummary, error: errorVoteSummary } = useVoteSummaries();

    const combinedBillData: BillWithSummary[] = useMemo(() => {
        if (!billsData || !voteSummaryData) return [];
        const voteSummaryMap = new Map(voteSummaryData.map(summary => [summary.bill_id, summary]));
        return billsData.map(bill => ({
            ...bill,
            supporters_count: voteSummaryMap.get(bill.id)?.supporters_count ?? null,
            opponents_count: voteSummaryMap.get(bill.id)?.opponents_count ?? null,
        }));
    }, [billsData, voteSummaryData]);

    const isLoadingCombinedBills = isLoadingBills || isLoadingVoteSummary;
    const isErrorCombinedBills = isErrorBills || isErrorVoteSummary;
    const errorCombinedBills = errorBills || errorVoteSummary;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder >
            <Group justify="space-between" mb="xs">
                <Title order={4}>Recently Introduced Bills</Title>
            </Group>
            <CardStatus isLoading={isLoadingCombinedBills} isError={isErrorCombinedBills} error={errorCombinedBills}>
                {combinedBillData && combinedBillData.length > 0 ? (
                    <List spacing="sm" size="sm" mt="sm" >
                        {combinedBillData.slice(0, 10).map(bill => (
                            <List.Item key={bill.id}>
                                <Text size="sm" fw={500}>{bill.title}</Text>
                                <Text size="xs" c="dimmed" mb={4}>{bill.sponsor_name ?? 'No Sponsor Info'}</Text>
                                {(bill.supporters_count !== null || bill.opponents_count !== null) && (
                                    <Group gap="xs">
                                        <Badge size="sm" variant="light" color="teal" leftSection={<IconThumbUp size={14} />}>
                                            {bill.supporters_count ?? '-'}
                                        </Badge>
                                        <Badge size="sm" variant="light" color="red" leftSection={<IconThumbDown size={14} />}>
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
    );
}; 