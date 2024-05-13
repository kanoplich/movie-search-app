'use client';

import {
  Pagination as MantinePagination,
  useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './Pagination.module.css';

type PaginationProps = {
  page: number;
  pages: number | null | undefined;
  setPage: (page: number) => void;
};

export default function Pagination({
  page,
  pages,
  setPage,
}: Readonly<PaginationProps>) {
  const theme = useMantineTheme();
  const [totalPages, setTotalPages] = useState<number>(500);

  useEffect(() => {
    if (pages) {
      setTotalPages(pages > 500 ? totalPages : pages);
    }
  }, [pages, totalPages]);

  return (
    <div className={classes.wrapper}>
      <MantinePagination
        classNames={{
          dots: classes.dots,
        }}
        total={totalPages}
        defaultValue={1}
        boundaries={-1}
        value={page}
        color={theme.colors.purple[5]}
        mt={'xl'}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
}
