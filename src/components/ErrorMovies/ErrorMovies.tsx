/* eslint-disable react/no-unescaped-entities */
import { Flex, Image, Text } from '@mantine/core';
import classes from './ErrorMovies.module.css';

export default function ErrorMovies() {
  return (
    <Flex
      className={classes.flex}
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Image
        src='/no_movies.svg'
        className={classes.desktopImage}
        alt='not found'
      />
      <Text className={classes.text}>
        We don't have such movies, look for another one
      </Text>
    </Flex>
  );
}
