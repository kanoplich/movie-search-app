import { Group, Text, useMantineTheme } from '@mantine/core';
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
    <Group wrap='nowrap' gap='xs' className={classes.wrapper}>
      <Group gap='xs' wrap='nowrap' className={classes.group}>
        <Text size={matches ? 'xs' : 'md'} c={theme.colors.grey[6]}>
          {title}
        </Text>
      </Group>
      <Text size={matches ? 'xs' : 'md'} c='black'>
        {value}
      </Text>
    </Group>
  );
}
