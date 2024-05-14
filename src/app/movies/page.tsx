'use client';

import { Title, Container, Flex } from '@mantine/core';
import Filter from '@components/Filter/Filter';
import Sort from '@components/Sort/Sort';
import MovieCard from '@components/MovieCard/MovieCard';
import { Data, General, Genres } from '@customTypes/types';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import Pagination from '@components/Pagination/Pagination';
import ErrorMovies from '@components/ErrorMovies/ErrorMovies';
import classes from './movies.module.css';

export default function Movies() {
  const [data, setData] = useState<Data | null>();
  const [genresList, setGenresList] = useState<Genres[]>([]);

  const [year, setYear] = useState<string>('');
  const [withGenres, setWithGenres] = useState<string>('');
  const [averageGte, setAverageGte] = useState<number | string>('');
  const [averageLte, setAverageLte] = useState<number | string>('');
  const [sort, setSort] = useState<string>('popularity.desc');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setData(null);

    let url = `/api/movies?sort_by=${sort}&page=${page}`;

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data, genres }: General = await response.json();
      setData(data);
      setGenresList(genres.genres);
    };

    fetchData();
  }, [year, withGenres, averageGte, averageLte, sort, page]);

  return (
    <Container className={classes.container}>
      <Title order={2} className={classes.title}>
        Movies
      </Title>
      <Filter
        genres={genresList}
        setYear={setYear}
        setWithGenres={setWithGenres}
        setAverageGte={setAverageGte}
        setAverageLte={setAverageLte}
        setPage={setPage}
      />
      <Sort setSort={setSort} />
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
