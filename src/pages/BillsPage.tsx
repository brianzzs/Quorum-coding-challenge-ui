import React, { useState, useMemo } from 'react';
import { Container, Select, Card, Group, Title, Text, Table, Badge, Grid } from '@mantine/core';
import { IconListDetails, IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { useBills } from '../hooks/useBills';
import { useVoteSummaries } from '../hooks/useVoteSummaries';
import { useBillVoteResults } from '../hooks/useBillVoteResults';
import { CardStatus } from '../components/common/CardStatus';
import { BillsListSummary } from '../components/Bills/BillsListSummary';
import {Bill} from "../types/api/bills"

interface BillWithSummary extends Bill {
    supporters_count: number | null;
    opponents_count: number | null;
}

const BillVoteResultsTable = ({ billId }: { billId: number }) => {
    const { data: voteResults, isLoading, isError, error } = useBillVoteResults(billId);

    const rows = voteResults?.map((vote) => (
        <Table.Tr key={vote.vote_id + vote.legislator_name}>
            <Table.Td>{vote.legislator_name}</Table.Td>
            <Table.Td ta="center">
                <Badge color={vote.vote_type === 'Yea' ? 'teal' : vote.vote_type === 'Nay' ? 'red' : 'gray'}
                       variant="light">
                    {vote.vote_type}
                </Badge>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
            <Title order={4} mb="md">Detailed Votes</Title>
            <CardStatus isLoading={isLoading} isError={isError} error={error}>
                {voteResults && voteResults.length > 0 ? (
                    <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="xs">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Legislator</Table.Th>
                                <Table.Th ta="center">Vote</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                ) : (
                    <Text c="dimmed" ta="center" mt="md">No detailed vote results found for this bill.</Text>
                )}
            </CardStatus>
        </Card>
    );
};

const BillsPage: React.FC = () => {
    const [selectedBillId, setSelectedBillId] = useState<number | null>(null);

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

    const billOptions = combinedBillData.map(bill => ({
        value: bill.id.toString(),
        label: bill.title,
        supporters: bill.supporters_count,
        opponents: bill.opponents_count
    })) ?? [];

    const isLoadingDropdown = isLoadingBills || isLoadingVoteSummary;
    const isErrorDropdown = isErrorBills || isErrorVoteSummary;
    const errorDropdown = errorBills || errorVoteSummary;

    return (
        <Container size="lg" py="md">
            <Title order={2} mb="lg">Bill Information</Title>

            <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl" style={{ height: '100%' }}>
                        <Group justify="space-between" mb="md">
                            <Title order={4}>View Bill Details & Votes</Title>
                            <IconListDetails size="1.5rem" />
                        </Group>
                        <CardStatus isLoading={isLoadingDropdown} isError={isErrorDropdown} error={errorDropdown}>
                            <Select
                                data={billOptions}
                                value={selectedBillId?.toString() ?? null}
                                onChange={(_value) => setSelectedBillId(_value ? parseInt(_value, 10) : null)}
                                placeholder="Select a bill to see details..."
                                searchable
                                clearable
                                nothingFoundMessage="No bills found"
                                disabled={isLoadingDropdown}
                            />
                            {selectedBillId && (
                                <Group mt="md" justify='center'>
                                    <Badge size="lg" variant="light" color="teal" leftSection={<IconThumbUp size={16} />}>
                                        {billOptions.find(b => b.value === selectedBillId.toString())?.supporters ?? '-'}
                                    </Badge>
                                    <Badge size="lg" variant="light" color="red" leftSection={<IconThumbDown size={16} />}>
                                        {billOptions.find(b => b.value === selectedBillId.toString())?.opponents ?? '-'}
                                    </Badge>
                                </Group>
                            )}
                            {!selectedBillId && (
                                <Text c="dimmed" size="sm" ta="center" mt="md">Select a bill to see its vote summary and details.</Text>
                            )}
                        </CardStatus>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <BillsListSummary />
                </Grid.Col>
            </Grid>

            {selectedBillId && (
                <BillVoteResultsTable billId={selectedBillId} />
            )}
        </Container>
    );
};

export default BillsPage; 