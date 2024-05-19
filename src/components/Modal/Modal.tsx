'use client';

import {
  Button,
  Divider,
  Flex,
  Rating,
  Title,
  Modal as MantineModal,
  useMantineTheme,
  CloseButton,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStorage } from '@hooks/useStorage';
import { Movie, MovieDetails } from '@customTypes/types';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Modal.module.css';

type ModalProps = {
  movie: Movie | MovieDetails;
  opened: boolean;
  close: () => void;
};

export default function Modal({ movie, opened, close }: Readonly<ModalProps>) {
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 390px)');
  const [currentRating, setCurrentRating] = useState<number>(0);
  const { storageData, addRating, removeRating } = useStorage();

  useEffect(() => {
    if (`${movie.id}` in storageData) {
      setCurrentRating(+storageData[movie.id].rating);
    }
  }, []);

  const handleClickSave = () => {
    addRating(movie.id, { rating: currentRating.toString(), data: movie });
    close();
  };

  const handleClickRemove = () => {
    removeRating(movie.id);
    setCurrentRating(0);
    close();
  };

  return (
    <MantineModal
      className={classes.container}
      radius={theme.radius.md}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      size={'sm'}
    >
      <Flex justify={'space-between'} align={'center'} mb={'md'}>
        <Title order={4} className={classes.title4}>
          Your rating
        </Title>
        <CloseButton className={classes.closeBtn} onClick={close} />
      </Flex>
      <Divider className={classes.divider} />
      <Title order={3} className={classes.title3}>
        {movie.original_title}
      </Title>
      <Rating
        className={classes.rating}
        defaultValue={currentRating}
        color={theme.colors.yellow[6]}
        size={matches ? 'md' : 'xl'}
        count={10}
        onChange={(value) => setCurrentRating(value)}
      />
      <Flex>
        <Button className={classes.saveBtn} onClick={handleClickSave}>
          Save
        </Button>
        <Button className={classes.removeBtn} onClick={handleClickRemove}>
          Remote rating
        </Button>
      </Flex>
    </MantineModal>
  );
}
