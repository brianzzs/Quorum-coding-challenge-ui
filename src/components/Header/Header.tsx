import { Container, Group, Burger, Title, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import classes from './Header.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/bills', label: 'Bills' },
  { link: '/legislators', label: 'Legislators' },
];

export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { pathname } = useLocation();

  const items = links.map((link) => (
    <Anchor
      key={link.label}
      component={Link}
      to={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Container size="lg" className={classes.inner}>
      <Title order={3} className={classes.title} component={Link} to="/">Quorum Coding Challenge</Title>
      <Group gap="md" visibleFrom="sm">
        {items}
      </Group>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
    </Container>
  );
}

export default HeaderComponent;