'use client';

import { Title, Container, Flex } from '@mantine/core';
import MovieCard from '@components/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import { useStorage } from '@hooks/useStorage';
import Pagination from '@components/Pagination/Pagination';
import Search from '@components/Search/Search';
import ErrorRating from '@components/ErrorRating/ErrorRating';
import { chunk } from '@utils/chunk';
import { Movie, MovieDetails } from '@customTypes/types';
import classes from './rated.module.css';

export default function Rated() {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [movies, setMovies] = useState<(Movie | MovieDetails)[]>([]);
  const [items, setItems] = useState<JSX.Element[]>();
  const { storageData } = useStorage();

  useEffect(() => {
    const movies = Object.values(storageData).map((movie) => movie.data);
    setMovies(movies);
  }, [storageData]);

  useEffect(() => {
    setTotalPage(Math.ceil(movies.length / 4));
    try {
      const items = chunk(movies, 4)[activePage - 1].map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ));
      setItems(items);
    } catch {
      if (totalPage > 1) {
        setTotalPage((prev) => prev - 1);
        setActivePage(1);
      } else {
        setItems([]);
      }
    }
  }, [activePage, movies, totalPage]);

  return (
    <Container className={classes.container}>
      {movies.length == 0 ? (
        <ErrorRating />
      ) : (
        <>
          <Flex className={classes.wrapper}>
            <Title order={2} className={classes.title}>
              Rated movies
            </Title>
            <Search setMovies={setMovies} />
          </Flex>
          <Flex className={classes.flex}>{items}</Flex>
          {movies && (
            <div className={classes.pagination}>
              <Pagination
                total={totalPage ?? 1}
                setActivePage={setActivePage}
                activePage={activePage}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
