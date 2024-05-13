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
import { Genres, Movie } from '@customTypes/types';
import Link from 'next/link';
import Modal from '@components/Modal/Modal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './MovieCard.module.css';

type MovieCardProps = {
  movie: Movie;
  genresList: Genres[];
};

export default function MovieCard({
  movie,
  genresList,
}: Readonly<MovieCardProps>) {
  const theme = useMantineTheme();
  const {
    id,
    original_title,
    release_date,
    vote_average,
    vote_count,
    poster_path,
    genre_ids,
  } = movie;

  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState<string>('0');

  const genres = genresList
    .filter((genres) => genre_ids.includes(genres.id))
    .map((genres) => genres.name)
    .join(', ');

  let count;
  if (+vote_count > 999) {
    count = `${(+vote_count / 1000).toFixed()}K`;
  } else if (+vote_count > 999999) {
    count = `${(+vote_count / 1000000).toFixed()}M`;
  } else {
    count = vote_count;
  }

  return (
    <Card radius='lg' p={24} className={classes.card}>
      <Group wrap='nowrap' gap={0} align='flex-start'>
        <Image
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : '/poster.svg'
          }
          height={170}
          width={119}
          alt={original_title}
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
              {release_date.slice(0, 4)}
            </Text>
            <Group wrap='nowrap' gap='xs'>
              <Group gap={'4px'} wrap='nowrap'>
                <IconStarFilled
                  color={theme.colors.yellow[6]}
                  width={28}
                  height={28}
                />
                <Text className={classes.rating}>
                  {Number(vote_average).toFixed(1)}
                </Text>
              </Group>
              <Text size='md' c={theme.colors.grey[6]}>
                ({count})
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
              {genres}
            </Text>
          </Group>
        </div>
      </Group>

      <Group gap={'4px'} wrap='nowrap' className={classes.ratingWrapper}>
        <IconStarFilled
          color={theme.colors.grey[3]}
          onClick={open}
          style={{ cursor: 'pointer', width: '28px', height: '28px' }}
        />
        <Text className={classes.rating}>{rating}</Text>
      </Group>
      <Modal opened={opened} close={close} title={original_title} id={id} />
    </Card>
  );
}
