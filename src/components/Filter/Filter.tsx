'use client';

import { Flex, Select, NumberInput, Button, MultiSelect } from '@mantine/core';
import { Genres } from '@customTypes/types';
import { useEffect, useState } from 'react';
import classes from './Filter.module.css';

type FilterProps = {
  genres: Genres[];
  setYear: (year: string) => void;
  setWithGenres: (genres: string) => void;
  setAverageGte: (average: number | string) => void;
  setAverageLte: (average: number | string) => void;
  setPage: (value: number) => void;
};

export default function Filter({
  genres,
  setYear,
  setWithGenres,
  setAverageGte,
  setAverageLte,
  setPage,
}: Readonly<FilterProps>) {
  const [genresSelected, setGenresSelected] = useState<string[]>([]);
  const [yearSelected, setYearSelected] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState<number | string>('');
  const [secondValue, setSecondValue] = useState<number | string>('');

  const genresData = genres.map((genres) => genres.name);
  const yearData = [...Array(145)].map((_, i) => `${2031 - i}`);

  const handleReset = () => {
    setGenresSelected([]);
    setYearSelected(null);
    setFirstValue('');
    setSecondValue('');
    setPage(1);
  };

  useEffect(() => {
    yearSelected === null ? setYear('') : setYear(yearSelected);
    const genresItem = genres
      .filter((genre) => genresSelected.includes(genre.name))
      .map((item) => item.id)
      .join(',');
    setWithGenres(genresItem);
    setAverageGte(firstValue);
    setAverageLte(secondValue);
    setPage(1);
  }, [yearSelected, genresSelected, firstValue, secondValue, genresSelected]);

  return (
    <Flex align={'flex-end'} gap={'md'}>
      <MultiSelect
        classNames={{
          input: classes.input,
          label: classes.label,
          pill: classes.pill,
          section: classes.section,
          option: classes.option,
          pillsList: classes.pillList,
        }}
        style={{ maxWidth: '280px', width: '100%' }}
        withCheckIcon={false}
        label='Genres'
        radius={'md'}
        placeholder={genresSelected.length > 0 ? '' : 'Select genre'}
        data={genresData}
        onChange={setGenresSelected}
        value={genresSelected}
      />
      <Select
        classNames={{
          input: classes.input,
          label: classes.label,
          section: classes.section,
          option: classes.option,
        }}
        style={{ maxWidth: '280px', width: '100%' }}
        withCheckIcon={false}
        label='Release year'
        radius={'md'}
        placeholder='Select release year'
        data={yearData}
        onChange={setYearSelected}
        value={yearSelected}
      />
      <NumberInput
        classNames={{
          input: classes.input,
          label: classes.label,
          section: classes.sectionNumber,
          control: classes.control,
        }}
        style={{ maxWidth: '138px' }}
        label='Rating'
        radius={'md'}
        onChange={(value) => setFirstValue(value)}
        placeholder='From'
        value={firstValue}
        min={0}
        max={typeof secondValue === 'number' ? secondValue : 10}
      />
      <NumberInput
        classNames={{
          input: classes.input,
          label: classes.label,
          section: classes.sectionNumber,
          control: classes.control,
        }}
        style={{ maxWidth: '138px' }}
        radius={'md'}
        label=' '
        onChange={(value) => setSecondValue(value)}
        placeholder='To'
        value={secondValue}
        min={typeof firstValue === 'number' ? firstValue : 0}
        max={10}
      />
      <Button
        classNames={{
          root: classes.rootButton,
          label: classes.labelButton,
        }}
        onClick={handleReset}
      >
        Reset filters
      </Button>
    </Flex>
  );
}
