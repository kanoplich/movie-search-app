/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Image, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './ErrorRating.module.css';

export default function ErrorRating() {
  const router = useRouter();

  const handleClick = () => {
    router.replace('/movies');
  };
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
      <Text className={classes.text}>You haven't rated any films yet</Text>
      <Button
        variant='outline'
        size='md'
        mt='md'
        className={classes.control}
        onClick={handleClick}
      >
        Find movies
      </Button>
    </Flex>
  );
}
