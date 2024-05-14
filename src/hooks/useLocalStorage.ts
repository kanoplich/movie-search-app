import { LocalOptions } from '@customTypes/types';
import { useState, useEffect } from 'react';

const useLocalStorage = (key: string, defaultValue: LocalOptions) => {
  const [value, setValue] = useState(() => {
    let storageValue;
    try {
      storageValue = JSON.parse(
        localStorage.getItem(key) ?? String(defaultValue)
      );
    } catch {
      storageValue = defaultValue;
    }

    return storageValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
