import React from 'react';
import { Group, Text, ThemeIcon } from '@mantine/core';
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { useLegislatorVotes } from '../../hooks/useLegislatorVotes'; 
import { CardStatus } from './CardStatus'; 

interface LegislatorVoteCountsProps {
    legislatorId: number;
}

export const LegislatorVoteCounts: React.FC<LegislatorVoteCountsProps> = ({ legislatorId }) => {
    const { 
        supportedCount, 
        opposedCount, 
        isLoadingSupported, 
        isLoadingOpposed, 
        isErrorSupported, 
        isErrorOpposed, 
        errorSupported, 
        errorOpposed 
    } = useLegislatorVotes(legislatorId);

    const isLoading = isLoadingSupported || isLoadingOpposed;
    const isError = isErrorSupported || isErrorOpposed;
    const error = errorSupported || errorOpposed;

    return (
        <CardStatus isLoading={isLoading} isError={isError} error={error}>
            <Group mt="sm" grow>
                <Text ta="center" component="div">
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck size="1rem" />
                    </ThemeIcon>
                    <Text size="lg" fw={700} component="span" ml={5}>{supportedCount}</Text> Supported
                </Text>
                <Text ta="center" component="div">
                    <ThemeIcon color="red" size={24} radius="xl">
                        <IconCircleX size="1rem" />
                    </ThemeIcon>
                    <Text size="lg" fw={700} component="span" ml={5}>{opposedCount}</Text> Opposed
                </Text>
            </Group>
        </CardStatus>
    );
}

export default LegislatorVoteCounts;