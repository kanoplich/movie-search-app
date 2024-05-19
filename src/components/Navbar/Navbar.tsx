'use client';

import { useEffect } from 'react';
import { Group, Title, Image, Anchor } from '@mantine/core';
import { poppins } from '@assets/fonts/fonts';
import Link from 'next/link';
import { useStorage } from '@hooks/useStorage';
import classes from './Navbar.module.css';

export default function Navbar() {
  const { navigate, active } = useStorage();

  useEffect(() => {
    window.location.pathname === '/rated' && navigate('Rated movies');
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} wrap='nowrap'>
          <Image className={classes.logo} src='/logo.svg' alt='Arrow Flicks' />
          <Title order={1} className={`${classes.title} ${poppins.className}`}>
            ArrowFlicks
          </Title>
        </Group>
        <Anchor
          component={Link}
          className={classes.link}
          href={'/movies'}
          data-active={'Movies' === active || undefined}
          onClick={() => {
            navigate('Movies');
          }}
        >
          Movies
        </Anchor>
        <Anchor
          component={Link}
          className={classes.link}
          href={'/rated'}
          data-active={'Rated movies' === active || undefined}
          onClick={() => {
            navigate('Rated movies');
          }}
        >
          Rated movies
        </Anchor>
      </div>
    </nav>
  );
}
