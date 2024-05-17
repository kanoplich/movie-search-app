import {
  Pagination as MantinePagination,
  useMantineTheme,
} from '@mantine/core';
import classes from './Pagination.module.css';

type PaginationProps = {
  activePage: number;
  total: number;
  setActivePage: (page: number) => void;
};

export default function Pagination({
  activePage,
  total,
  setActivePage,
}: Readonly<PaginationProps>) {
  const theme = useMantineTheme();

  return (
    <MantinePagination
      classNames={{
        dots: classes.dots,
      }}
      total={total}
      boundaries={-1}
      value={activePage}
      color={theme.colors.purple[5]}
      mt={'xl'}
      onChange={(value) => setActivePage(value)}
    />
  );
}
