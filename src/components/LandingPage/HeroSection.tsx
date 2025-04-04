import React from 'react';
import { Title, Text, Container } from '@mantine/core';

const HeroSection: React.FC = () => {

  return (
    <Container size="md" py="xl" style={{ textAlign: 'center', color: '#032d61', backgroundColor: 'var(--mantine-color-white)', marginBottom: 'var(--mantine-spacing-xl)' }}>
      <Title order={1} mb="sm">
        Explore US Bills and Legislators
      </Title>
      <Text c="dimmed" mb="xl" size="lg">
        Stay informed about the latest legislative activity. Access data on bills, votes, and legislators.
      </Text>
    </Container>
  );
};

export default HeroSection; 