import React, { useMemo, useState, useEffect } from 'react';
import { Table, Loader, Alert, Text, Title, Card, Box } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { useLegislators } from '../../hooks/useLegislators';
import { useLegislatorVoteQueries } from '../../hooks/useLegislatorVoteQueries';
import { Legislator } from '../../types/api/legislator';

interface LegislatorStats extends Legislator {
    supportedCount: number | null;
    opposedCount: number | null;
    isLoadingVotes: boolean;
    isErrorVotes: boolean;
}

interface LegislatorTableProps {
    fetchVotesInitially?: boolean;
}

const LegislatorTable: React.FC<LegislatorTableProps> = ({ fetchVotesInitially = true }) => {
    const [enableVoteQueries, setEnableVoteQueries] = useState(fetchVotesInitially);

    const { data: legislators, isLoading: isLoadingLegislators, isError: isErrorLegislators, error: errorLegislators } = useLegislators();

    const voteResults = useLegislatorVoteQueries(legislators, enableVoteQueries);

    useEffect(() => {
        if (!fetchVotesInitially && legislators && !enableVoteQueries) {
            setEnableVoteQueries(true);
        }
    }, [fetchVotesInitially, legislators, enableVoteQueries]);

    const tableData: LegislatorStats[] = useMemo(() => {
        if (!legislators) return [];
        return legislators.map((legislator, index) => {
            const voteResult = voteResults[index];
            return {
                ...legislator,
                supportedCount: voteResult.data?.supportedCount ?? null,
                opposedCount: voteResult.data?.opposedCount ?? null,
                isLoadingVotes: voteResult.isLoading,
                isErrorVotes: voteResult.isError,
            };
        });
    }, [legislators, voteResults]);

    if (isLoadingLegislators) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
                <Title order={4} mb="md">Legislator Bill Activity Summary</Title>
                <Box ta="center" py="xl"><Loader /></Box>
            </Card>
        );
    }

    if (isErrorLegislators) {
        const message = errorLegislators instanceof Error ? errorLegislators.message : 'Failed to load legislators';
        return (
            <Alert icon={<IconAlertCircle size="1rem" />} title="Error Loading Legislators" color="red" mt="xl">
                {message}
            </Alert>
        );
    }

    const rows = tableData.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td ta="center">
                {enableVoteQueries && item.isLoadingVotes ? (
                    <Loader size="xs" />
                ) : item.isErrorVotes ? (
                    <Text c="red" size="xs">Error</Text>
                ) : (
                    enableVoteQueries ? (item.supportedCount ?? '-') : <Loader size="xs" />
                )}
            </Table.Td>
            <Table.Td ta="center">
                {enableVoteQueries && item.isLoadingVotes ? (
                    <Loader size="xs" />
                ) : item.isErrorVotes ? (
                    <Text c="red" size="xs">Error</Text>
                ) : (
                    enableVoteQueries ? (item.opposedCount ?? '-') : <Loader size="xs" />
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
            <Title order={4} mb="md" style={{ color: '#3C3B6E' }}>Legislator Bill Activity Summary</Title>
            <Table striped highlightOnHover withTableBorder withColumnBorders verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th style={{ color: '#3C3B6E' }}>Legislator</Table.Th>
                        <Table.Th ta="center" style={{ color: '#3C3B6E' }}><IconCircleCheck size={16} style={{ verticalAlign: 'middle'}}/> Supported</Table.Th>
                        <Table.Th ta="center" style={{ color: '#b41240' }}><IconCircleX size={16} style={{ verticalAlign: 'middle'}}/> Opposed</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows.length > 0 ? rows : <Table.Tr><Table.Td colSpan={3} ta="center">No legislator data found.</Table.Td></Table.Tr>}</Table.Tbody>
            </Table>
        </Card>
    );
};

export default LegislatorTable; 