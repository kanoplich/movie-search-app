'use client';

import { useState } from 'react';
import { Group, Title, Image } from '@mantine/core';
import { poppins } from '@assets/fonts/fonts';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Movies' },
  { link: '', label: 'Rated movies' },
];

export default function Navbar() {
  const [active, setActive] = useState('Movies');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <Image className={classes.logo} src='/logo.svg' alt='Arrow Flicks' />
          <Title order={1} className={`${classes.title} ${poppins.className}`}>
            ArrowFlicks
          </Title>
        </Group>
        {links}
      </div>
    </nav>
  );
}
