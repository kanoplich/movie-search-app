'use client';

import { Image, Text, Button, Flex, Group, Title } from '@mantine/core';
import { poppins } from '@assets/fonts/fonts';
import { useRouter } from 'next/navigation';
import classes from './not-found.module.css';

export default function NotFound() {
  const router = useRouter();

  const handleClick = () => {
    router.replace('/movies');
  };
  return (
    <div className={classes.wrapper}>
      <Group className={classes.header} wrap='nowrap'>
        <Image className={classes.logo} src='/logo.svg' alt='Arrow Flicks' />
        <Title order={1} className={`${classes.title} ${poppins.className}`}>
          ArrowFlicks
        </Title>
      </Group>
      <Flex
        className={classes.flex}
        direction={'column'}
        align={'center'}
        justify={'center'}
      >
        <Image
          src='/404.svg'
          className={classes.desktopImage}
          alt='not found'
        />
        <Text className={classes.text}>
          We can’t find the page you are looking for
        </Text>
        <Button
          variant='outline'
          size='md'
          mt='md'
          className={classes.control}
          onClick={handleClick}
        >
          Go Home
        </Button>
      </Flex>
    </div>
  );
}
