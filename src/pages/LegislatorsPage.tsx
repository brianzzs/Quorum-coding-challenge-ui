import React, { useState } from 'react';
import { Container, Select, Card, Group, Title, ThemeIcon, Text } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { useLegislators } from '../hooks/useLegislators';
import { CardStatus } from '../components/common/CardStatus'; 
import { LegislatorVoteCounts } from '../components/common/LegislatorVoteCounts';
import LegislatorTable from '../components/LandingPage/LegislatorTable';

const LegislatorsPage: React.FC = () => {
    const [selectedLegislatorId, setSelectedLegislatorId] = useState<number | null>(null);

    const { data: legislatorsData, isLoading: isLoadingLegislators, isError: isErrorLegislators, error: errorLegislators } = useLegislators();

    const legislatorOptions = legislatorsData?.map(leg => ({ value: leg.id.toString(), label: leg.name })) ?? [];

  return (
    <Container size="lg" py="md">
      <Title order={2} mb="lg">Legislator Information</Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" mb="md">
            <Title order={4}>View  Legislator Activity</Title>
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
                <Text c="dimmed" size="sm" ta="center" mt="md">Select a legislator to see their detailed activity.</Text>
            )}
        </CardStatus>
      </Card>
      <LegislatorTable />
    </Container>
  );
};

export default LegislatorsPage; 