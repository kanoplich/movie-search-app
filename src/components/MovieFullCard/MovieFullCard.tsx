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
import { MovieDetails } from '@customTypes/types';
import Modal from '@components/Modal/Modal';
import { useDisclosure } from '@mantine/hooks';
import { useStorage } from '@hooks/useStorage';
import Description from '@components/Description/Description';
import classes from './MovieFullCard.module.css';
import { useState } from 'react';

type MovieFullCardProps = {
  movie: MovieDetails;
};

export default function MovieFullCard({ movie }: Readonly<MovieFullCardProps>) {
  const theme = useMantineTheme();
  const {
    id,
    original_title,
    release_date,
    vote_average,
    vote_count,
    poster_path,
    budget,
    revenue,
    runtime,
    genres,
  } = movie;

  const [opened, { open, close }] = useDisclosure(false);
  const { storageData } = useStorage();
  const [img, setImg] = useState(
    `https://image.tmdb.org/t/p/w300/${poster_path}`
  );

  let count;
  if (+vote_count > 999) {
    count = `${(+vote_count / 1000).toFixed()}K`;
  } else if (+vote_count > 999999) {
    count = `${(+vote_count / 1000000).toFixed()}M`;
  } else {
    count = vote_count;
  }

  let time = '';
  if (runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    time = hours ? `${hours}h ${minutes}m` : `${minutes}m`;
  }
  const genresList = genres.map((genre) => genre.name).join(', ');
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
  const date = release_date
    ? new Date(release_date).toLocaleDateString('en-US', options)
    : '';
  const money = budget ? `$${budget.toLocaleString('en-US')}` : '';
  const income = revenue ? `$${revenue.toLocaleString('en-US')}` : '';

  const title = ['Duration', 'Premiere', 'Budget', 'Gross worldwide', 'Genres'];
  const data = [time, date, money, income, genresList];

  return (
    <Card radius='lg' className={classes.card}>
      <Group className={classes.groupWrapper}>
        <Image
          className={classes.image}
          src={img}
          alt={original_title}
          onError={() => setImg('/poster.svg')}
        />
        <div className={classes.body}>
          <Box>
            <Title order={3} className={classes.title} mb='xs'>
              {original_title}
            </Title>
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
              <Text
                className={classes.voteCount}
                size='md'
                c={theme.colors.grey[6]}
              >
                ({count ?? 0})
              </Text>
            </Group>
          </Box>

          <Box className={classes.description}>
            {title.map((item, i) => (
              <Description key={item} title={item} value={data[i]} />
            ))}
          </Box>
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
