'use client';

import { useEffect, useState } from 'react';
import { Group, Title, Image, Anchor } from '@mantine/core';
import { poppins } from '@assets/fonts/fonts';
import Link from 'next/link';
import classes from './Navbar.module.css';

export default function Navbar() {
  const [active, setActive] = useState('Movies');

  useEffect(() => {
    window.location.pathname === '/rated' && setActive('Rated movies');
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
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
            setActive('Movies');
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
            setActive('Rated movies');
          }}
        >
          Rated movies
        </Anchor>
      </div>
    </nav>
  );
}
