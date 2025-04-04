import React from 'react';
import { Container, Group, Anchor, Text } from '@mantine/core';


const FooterSection: React.FC = () => {
  const links = [
    { link: 'https://www.linkedin.com/in/brianzan/', label: 'LinkedIn' },
    { link: 'https://github.com/brianzzs', label: 'GitHub' },
    { link: 'mailto:brianzanoni@outlook.com', label: 'Contact' },
  ];

  const items = links.map((link) => (
    <Anchor<'a'> 
      c="dimmed" 
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container fluid mt="xl" py="lg" >
      <Container size="lg">
        <Group justify="center" mb="xs">
          {items}
        </Group>
        <Text c="dimmed" size="sm" ta="center">
          Brian Zanoni | Quorum Coding Challenge
        </Text>
      </Container>
    </Container>
  );
};

export default FooterSection; 