import React from 'react';
import { Group, Loader, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

interface CardStatusProps {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    children: React.ReactNode;
}

export const CardStatus: React.FC<CardStatusProps> = ({ isLoading, isError, error, children }) => {
    if (isLoading) {
        return <Group justify="center" mt="md"><Loader /></Group>;
    }
    if (isError) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return (
            <Alert icon={<IconAlertCircle size="1rem" />} title="Error" color="red" mt="md">
                {errorMessage}
            </Alert>
        );
    }
    return <>{children}</>;
};

export default CardStatus;