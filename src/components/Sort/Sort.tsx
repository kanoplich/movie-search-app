'use client';

import { Flex, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { LocalOptions } from '@customTypes/types';
import classes from './Sort.module.css';

type SortProps = {
  setSort: (value: string) => void;
};

export default function Sort({ setSort }: Readonly<SortProps>) {
  const [value, setValue] = useState<string | null>('Most Popular');

  useEffect(() => {
    const sortData: LocalOptions = {
      'Most Popular': 'popularity.desc',
      'Least Popular': 'popularity.asc',
      'Most Rated': 'vote_average.desc',
      'Least Rated': 'vote_average.asc',
      'Most Voted': 'vote_count.desc',
      'Least Voted': 'vote_count.asc',
      'Most Revenue': 'revenue.desc',
      'Least Revenue': 'revenue.asc',
      'Early Release Date': 'primary_release_date.desc',
      'Late Release Date': 'primary_release_date.asc',
    };

    if (value) {
      setSort(sortData[value]);
    }
  }, [value]);

  return (
    <Flex align={'flex-end'} justify={'end'} mt={'lg'} mb={'lg'}>
      <Select
        classNames={{
          input: classes.input,
          label: classes.label,
          section: classes.section,
          option: classes.option,
        }}
        style={{ maxWidth: '280px', width: '100%' }}
        radius={'md'}
        withCheckIcon={false}
        label='Sort by'
        defaultValue={value}
        data={[
          'Most Popular',
          'Least Popular',
          'Most Rated',
          'Least Rated',
          'Most Voted',
          'Least Voted',
          'Most Revenue',
          'Least Revenue',
          'Early Release Date',
          'Late Release Date',
        ]}
        onChange={(value) => setValue(value)}
      />
    </Flex>
  );
}
