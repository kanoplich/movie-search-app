'use client';

import {
  Card,
  Image,
  Text,
  Group,
  Title,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { IconStarFilled } from '@tabler/icons-react';
import { Movie, MovieDetails } from '@customTypes/types';
import Link from 'next/link';
import Modal from '@components/Modal/Modal';
import { useDisclosure } from '@mantine/hooks';
import { useStorage } from '@hooks/useStorage';
import { useEffect, useState } from 'react';
import classes from './MovieCard.module.css';

type MovieCardProps = {
  movie: Movie | MovieDetails;
};

export default function MovieCard({ movie }: Readonly<MovieCardProps>) {
  const theme = useMantineTheme();
  const {
    id,
    original_title,
    release_date,
    vote_average,
    vote_count,
    poster_path,
  } = movie;

  const [opened, { open, close }] = useDisclosure(false);
  const { storageData, genresList } = useStorage();
  const [genresMovie, setGenresMovie] = useState<string>('');
  const [img, setImg] = useState(
    `https://image.tmdb.org/t/p/w200/${poster_path}`
  );

  useEffect(() => {
    let genresMovie;

    if ('genre_ids' in movie) {
      if (movie.genre_ids.length > 0) {
        genresMovie = genresList
          .filter((genres) => movie.genre_ids.includes(genres.id))
          .map((genres) => genres.name)
          .join(', ');
      } else {
        genresMovie = '';
      }
    } else if ('genres' in movie) {
      if (movie.genres.length > 0) {
        genresMovie = movie.genres.map((genre) => genre.name).join(', ');
      } else {
        genresMovie = '';
      }
    } else {
      genresMovie = '';
    }

    setGenresMovie(genresMovie);
  }, [genresList, movie]);

  let count;
  if (+vote_count > 999) {
    count = `${(+vote_count / 1000).toFixed()}K`;
  } else if (+vote_count > 999999) {
    count = `${(+vote_count / 1000000).toFixed()}M`;
  } else {
    count = vote_count;
  }

  return (
    <Card radius='lg' className={classes.card}>
      <Group className={classes.group}>
        <Image
          className={classes.image}
          src={img}
          alt={original_title}
          onError={() => setImg('/poster.svg')}
        />
        <div className={classes.body}>
          <Box>
            <Link
              className={classes.link}
              href={{ pathname: '/movies/movie', query: { id: `${id}` } }}
            >
              <Title order={3} className={classes.title} mb='xs'>
                {original_title}
              </Title>
            </Link>
            <Text className={classes.data} mt='xs' mb='xs'>
              {release_date ? release_date.slice(0, 4) : ''}
            </Text>
            <Group wrap='nowrap' gap='xs' align='center'>
              <Group gap={'4px'} wrap='nowrap' align='center'>
                <IconStarFilled
                  color={theme.colors.yellow[6]}
                  width={28}
                  height={28}
                />
                <Text className={classes.voteAverage}>
                  {vote_average ? Number(vote_average).toFixed(1) : 0}
                </Text>
              </Group>
              <Text size='md' c={theme.colors.grey[6]}>
                ({count ?? 0})
              </Text>
            </Group>
          </Box>

          <Group wrap='nowrap' gap='xs' className={classes.genresWrapper}>
            <Group gap='xs' wrap='nowrap'>
              <Text size='md' c={theme.colors.grey[6]}>
                Genres
              </Text>
            </Group>
            <Text size='md' c='black'>
              {genresMovie}
            </Text>
          </Group>
        </div>
      </Group>

      <Group gap={'4px'} wrap='nowrap' className={classes.ratingWrapper}>
        <IconStarFilled
          color={
            `${id}` in storageData
              ? theme.colors.purple[5]
              : theme.colors.grey[3]
          }
          onClick={open}
          style={{ cursor: 'pointer', width: '28px', height: '28px' }}
        />
        <Text className={classes.rating}>
          {`${id}` in storageData ? storageData[id].rating : ''}
        </Text>
      </Group>
      <Modal opened={opened} close={close} movie={movie} />
    </Card>
  );
}
