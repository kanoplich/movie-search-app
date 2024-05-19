'use client';

import {
  Genres,
  GenresList,
  StorageData,
  StorageDataId,
} from '@customTypes/types';
import useLocalStorage from '@hooks/useLocalStorage';
import { isObject } from '@utils/isObject';
import { createContext, useEffect, useMemo, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const INITIAL_STATE = {
  storageData: {} as StorageData,
  addRating: (id: number, value: StorageDataId) => {},
  removeRating: (id: number) => {},
  genresList: [] as Genres[],
  navigate: (value: string) => {},
  active: 'Movies',
};

export const StorageContext = createContext(INITIAL_STATE);

const StorageContextProvider = ({ children }: Props) => {
  const [data, setData] = useLocalStorage('rating', {});
  const [storageData, setStorageData] = useState<StorageData>({});
  const [genresList, setGenresList] = useState<Genres[]>([]);
  const [active, setActive] = useState<string>('Movies');

  useEffect(() => {
    let url = `/api`;
    const fetchData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { genres }: GenresList = await response.json();
      setGenresList(genres);
    };

    fetchData();

    if (!isObject(data)) {
      setData({});
    }
    if (data) {
      setStorageData(data);
    }
  }, []);

  useEffect(() => {
    setData(storageData);
  }, [storageData]);

  const addRating = (id: number, value: StorageDataId) => {
    setStorageData((prev) => ({ ...prev, [id]: value }));
  };

  const removeRating = (id: number) => {
    const newRating = { ...storageData };
    delete newRating[id];
    setStorageData(newRating);
  };

  const navigate = (value: string) => {
    setActive(value);
  };

  const value = useMemo(() => {
    return {
      genresList,
      storageData,
      addRating,
      removeRating,
      navigate,
      active,
    };
  }, [genresList, storageData, active]);

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
};

export default StorageContextProvider;
