import { MovieDetails } from '@customTypes/types';
import { Anchor, Breadcrumbs, Container, Flex, Text } from '@mantine/core';
import MovieFullCard from '@components/MovieFullCard/MovieFullCard';
import TrailerCard from '@components/TrailerCard/TrailerCard';
import classes from './Card.module.css';

type CardProps = {
  props: MovieDetails;
};

export default function Card({ props }: Readonly<CardProps>) {
  const { original_title } = props;

  return (
    <Container className={classes.container}>
      <Flex
        className={classes.breadcrumbsWrapper}
        justify={'flex-start'}
        align={'center'}
      >
        <Breadcrumbs>
          <Anchor className={classes.breadcrumbs} href='/movies'>
            Movies
          </Anchor>
          <Text className={classes.breadcrumbs}>{original_title}</Text>
        </Breadcrumbs>
      </Flex>
      <MovieFullCard movie={props} />
      <TrailerCard movie={props} />
    </Container>
  );
}
