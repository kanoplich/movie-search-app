import { TextInput, Button, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './Search.module.css';

export default function Search() {
  return (
    <TextInput
      className={classes.input}
      radius='md'
      placeholder='Search movie title'
      rightSectionWidth={98}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <Button className={classes.btn} radius='md' variant='filled'>
          Search
        </Button>
      }
    />
  );
}
