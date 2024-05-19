/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Image, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useStorage } from '@hooks/useStorage';
import classes from './ErrorRating.module.css';

export default function ErrorRating() {
  const router = useRouter();
  const { navigate } = useStorage();

  const handleClick = () => {
    router.push('/movies');
    navigate('Movies');
  };
  return (
    <div className={classes.wrapper}>
      <Flex
        className={classes.flex}
        direction={'column'}
        align={'center'}
        justify={'center'}
      >
        <Image
          src='/no_rating.svg'
          className={classes.desktopImage}
          alt='not found'
        />
        <Text className={classes.text}>You haven't rated any films yet</Text>
        <Button
          size='md'
          mt='md'
          className={classes.control}
          onClick={handleClick}
        >
          Find movies
        </Button>
      </Flex>
    </div>
  );
}
