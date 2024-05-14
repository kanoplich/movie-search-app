import { useContext } from 'react';
import { StorageContext } from '@context/storage-context';

export const useStorage = () => {
  return useContext(StorageContext);
};
