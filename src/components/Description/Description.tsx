import { Flex, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Description.module.css';

type DescriptionProps = {
  title: string;
  value: string;
};

export default function Description({
  title,
  value,
}: Readonly<DescriptionProps>) {
  const theme = useMantineTheme();
  const matches = useMediaQuery('(max-width: 430px)');

  return (
    <Flex gap={'xs'}>
      <Text
        className={classes.text}
        size={matches ? 'xs' : 'md'}
        c={theme.colors.grey[6]}
      >
        {title}
      </Text>
      <Text size={matches ? 'xs' : 'md'} c='black'>
        {value}
      </Text>
    </Flex>
  );
}
