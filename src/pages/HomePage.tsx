import React from 'react';
import { Container } from '@mantine/core';
import HeroSection from '../components/LandingPage/HeroSection';
import KeyInfoSection from '../components/LandingPage/KeyInfoSection';
import LegislatorTable from '../components/LandingPage/LegislatorTable';

const HomePage: React.FC = () => {
  return (
    <Container size="lg" py="md">
      <HeroSection />
      <KeyInfoSection />
      <LegislatorTable fetchVotesInitially={false} />
    </Container>
  );
};

export default HomePage; 