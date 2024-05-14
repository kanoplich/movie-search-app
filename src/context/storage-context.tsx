'use client';

import { LocalOptions } from '@customTypes/types';
import useLocalStorage from '@hooks/useLocalStorage';
import { isObject } from '@utils/isObject';
import { createContext, useEffect, useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  rating: {} as LocalOptions,
  addRating: (id: number, value: string) => {},
  removeRating: (id: number) => {},
};

export const StorageContext = createContext(INITIAL_STATE);

const StorageContextProvider = ({ children }: Props) => {
  const [data, setData] = useLocalStorage('rating', {});
  const [rating, setRating] = useState<LocalOptions>({});

  useEffect(() => {
    if (!isObject(data)) {
      setData({});
    }

    if (data) {
      setRating(data);
    }
  }, []);

  useEffect(() => {
    setData(rating);
  }, [rating]);

  const addRating = (id: number, value: string) => {
    setRating((prev) => ({ ...prev, [id]: value }));
  };

  const removeRating = (id: number) => {
    const newRating = { ...rating };
    delete newRating[id];
    setRating(newRating);
  };

  const value = useMemo(() => {
    return {
      rating,
      addRating,
      removeRating,
    };
  }, [rating]);

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageContextProvider;
