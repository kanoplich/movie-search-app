'use client';

import { Title, Container, Flex } from '@mantine/core';
import Filter from '@components/Filter/Filter';
import Sort from '@components/Sort/Sort';
import MovieCard from '@components/MovieCard/MovieCard';
import { Data } from '@customTypes/types';
import { useEffect, useState } from 'react';
import Pagination from '@components/Pagination/Pagination';
import ErrorMovies from '@components/ErrorMovies/ErrorMovies';
import Loader from '@components/Loader/Loader';
import classes from './movies.module.css';

export default function Movies() {
  const [data, setData] = useState<Data | null>();
  const [year, setYear] = useState<string>('');
  const [withGenres, setWithGenres] = useState<string>('');
  const [averageGte, setAverageGte] = useState<number | string>('');
  const [averageLte, setAverageLte] = useState<number | string>('');
  const [sort, setSort] = useState<string>('popularity.desc');
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    setData(null);

    let url = `/api/movies?sort_by=${sort}&page=${activePage}`;

    if (year) {
      url += `&primary_release_year=${year}`;
    }
    if (withGenres) {
      url += `&with_genres=${withGenres}`;
    }
    if (typeof averageGte === 'number') {
      url += `&vote_average.gte=${averageGte}`;
    }
    if (typeof averageLte === 'number') {
      url += `&vote_average.lte=${averageLte}`;
    }

    const fetchData = async () => {
      const response = await fetch(url);
      const data: Data = await response.json();
      setData(data);
    };

    fetchData().catch((e) => {
      console.log('Failed to run promise', e);
    });
  }, [year, withGenres, averageGte, averageLte, sort, activePage]);

  return (
    <Container className={classes.container}>
      <Title order={2} className={classes.title}>
        Movies
      </Title>
      <Filter
        setYear={setYear}
        setWithGenres={setWithGenres}
        setAverageGte={setAverageGte}
        setAverageLte={setAverageLte}
        setPage={setActivePage}
      />
      <Sort setSort={setSort} setPage={setActivePage} />
      <Flex className={classes.flex}>
        {!data ? (
          <Loader />
        ) : (
          data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </Flex>
      {data?.results.length == 0 ? (
        <ErrorMovies />
      ) : (
        data && (
          <div className={classes.pagination}>
            <Pagination
              total={data.total_pages}
              setActivePage={setActivePage}
              activePage={activePage}
            />
          </div>
        )
      )}
    </Container>
  );
}
