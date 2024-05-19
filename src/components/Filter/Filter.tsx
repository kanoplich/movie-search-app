'use client';

import {
  Flex,
  Select,
  NumberInput,
  Button,
  MultiSelect,
  Image,
  Group,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStorage } from '@hooks/useStorage';
import classes from './Filter.module.css';

type FilterProps = {
  setYear: (year: string) => void;
  setWithGenres: (genres: string) => void;
  setAverageGte: (average: number | string) => void;
  setAverageLte: (average: number | string) => void;
  setPage: (value: number) => void;
};

export default function Filter({
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const { genresList } = useStorage();

  const genresData = genresList.map((genres) => genres.name);
  const yearData = [...Array(145)].map((_, i) => `${2031 - i}`);

  const handleReset = () => {
    setGenresSelected([]);
    setYearSelected(null);
    setFirstValue('');
    setSecondValue('');
    setPage(1);
    setIsDisabled(true);
  };

  useEffect(() => {
    if (
      yearSelected ||
      genresSelected.length > 0 ||
      typeof firstValue === 'number' ||
      typeof secondValue === 'number'
    ) {
      setIsDisabled(false);
    }

    yearSelected === null ? setYear('') : setYear(yearSelected);
    const genresItem = genresList
      .filter((genre) => genresSelected.includes(genre.name))
      .map((item) => item.id)
      .join(',');
    setWithGenres(genresItem);
    setAverageGte(firstValue);
    setAverageLte(secondValue);
    setPage(1);
  }, [yearSelected, genresSelected, firstValue, secondValue, genresSelected]);

  return (
    <Flex align={'flex-end'} gap={'md'} wrap={'wrap'}>
      <MultiSelect
        classNames={{
          wrapper: classes.wrapper,
          input: classes.input,
          label: classes.label,
          pill: classes.pill,
          option: classes.option,
          pillsList: classes.pillList,
        }}
        withCheckIcon={false}
        label='Genres'
        radius={'md'}
        placeholder={genresSelected.length > 0 ? '' : 'Select genre'}
        data={genresData}
        onChange={setGenresSelected}
        value={genresSelected}
        onDropdownOpen={() => setIsMultiSelect(true)}
        onDropdownClose={() => setIsMultiSelect(false)}
        rightSectionWidth={'48'}
        maxValues={3}
        rightSection={
          isMultiSelect ? (
            <Image src='/up.svg' alt='up' />
          ) : (
            <Image src='down.svg' alt='down' />
          )
        }
      />
      <Select
        classNames={{
          wrapper: classes.wrapper,
          input: classes.input,
          label: classes.label,
          option: classes.option,
        }}
        withCheckIcon={false}
        label='Release year'
        radius={'md'}
        placeholder='Select release year'
        data={yearData}
        onChange={setYearSelected}
        value={yearSelected}
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
      <Group align='end' gap={'xs'}>
        <NumberInput
          classNames={{
            wrapper: classes.wrapperNumber,
            label: classes.label,
            input: classes.input,
            controls: classes.controls,
            control: classes.control,
          }}
          label='Ratings'
          radius={'md'}
          onChange={(value) => setFirstValue(value)}
          placeholder='From'
          value={firstValue}
          min={0}
          max={typeof secondValue === 'number' ? secondValue : 10}
        />
        <NumberInput
          classNames={{
            wrapper: classes.wrapperNumber,
            input: classes.input,
            controls: classes.controls,
            control: classes.control,
          }}
          radius={'md'}
          label=' '
          onChange={(value) => setSecondValue(value)}
          placeholder='To'
          value={secondValue}
          min={typeof firstValue === 'number' ? firstValue : 0}
          max={10}
        />
      </Group>
      <Button
        className={classes.btn}
        variant='transparent'
        onClick={handleReset}
        disabled={isDisabled}
      >
        Reset filters
      </Button>
    </Flex>
  );
}
