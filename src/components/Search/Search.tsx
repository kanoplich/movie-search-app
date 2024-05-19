'use client';

import { TextInput, Button, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useStorage } from '@hooks/useStorage';
import { Movie, MovieDetails } from '@customTypes/types';
import { useState } from 'react';
import classes from './Search.module.css';

type SearchProps = {
  setMovies: (data: (Movie | MovieDetails)[]) => void;
};

export default function Search({ setMovies }: Readonly<SearchProps>) {
  const [value, setValue] = useState<string>('');
  const { storageData } = useStorage();

  const handleClick = () => {
    const searchMovies = Object.values(storageData)
      .filter((movie) =>
        movie.data.original_title.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => item.data);

    setMovies(searchMovies);
  };

  return (
    <TextInput
      classNames={{
        wrapper: classes.wrapper,
        input: classes.input,
      }}
      radius='md'
      placeholder='Search movie title'
      rightSectionWidth={'110'}
      onChange={(event) => setValue(event.currentTarget.value)}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <Button
          className={classes.btn}
          radius='md'
          variant='filled'
          onClick={handleClick}
        >
          Search
        </Button>
      }
    />
  );
}
