'use client';

import { Title, Container, Flex } from '@mantine/core';
import MovieCard from '@components/MovieCard/MovieCard';
import { Data, Genres } from '@customTypes/types';
import { useState } from 'react';
import Pagination from '@components/Pagination/Pagination';
import ErrorMovies from '@components/ErrorMovies/ErrorMovies';
import Search from '@components/Search/Search';
import Loading from '../../app/loading';
import classes from './rated.module.css';

export default function Rated() {
  const [data, setData] = useState<Data | null>();
  const [genresList, setGenresList] = useState<Genres[]>([]);
  const [page, setPage] = useState<number>(1);

  return (
    <Container className={classes.container}>
      <Title order={2} className={classes.title}>
        Rated movies
      </Title>
      <Search />
      <Flex
        gap='md'
        justify='flex-start'
        align='flex-start'
        direction='row'
        wrap='wrap'
      >
        {!data ? (
          <Loading />
        ) : (
          data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genresList={genresList} />
          ))
        )}
      </Flex>
      {data?.results.length == 0 ? (
        <ErrorMovies />
      ) : (
        data && (
          <Pagination page={page} setPage={setPage} pages={data.total_pages} />
        )
      )}
    </Container>
  );
}
