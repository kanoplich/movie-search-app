'use client';

import { Flex, Image, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { SortOptions } from '@customTypes/types';
import classes from './Sort.module.css';

type SortProps = {
  setSort: (value: string) => void;
  setPage: (value: number) => void;
};

export default function Sort({ setSort, setPage }: Readonly<SortProps>) {
  const [value, setValue] = useState<string | null>('Most Popular');
  const [isSelect, setIsSelect] = useState<boolean>(false);

  useEffect(() => {
    const sortData: SortOptions = {
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
      setPage(1);
    }
  }, [value]);

  return (
    <Flex align={'flex-end'} justify={'end'} mt={'lg'} mb={'lg'}>
      <Select
        classNames={{
          wrapper: classes.wrapper,
          input: classes.input,
          label: classes.label,
          option: classes.option,
        }}
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
        onDropdownOpen={() => setIsSelect(true)}
        onDropdownClose={() => setIsSelect(false)}
        rightSectionWidth={'48'}
        rightSection={
          isSelect ? (
            <Image src='/up.svg' alt='up' />
          ) : (
            <Image src='down.svg' alt='down' />
          )
        }
      />
    </Flex>
  );
}
