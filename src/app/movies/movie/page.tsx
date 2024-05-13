'use client';

import FullCard from '@components/FullCard/FullCard';
import { MovieDetails } from '@customTypes/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../../loading';

export default function Movie() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<MovieDetails>();

  useEffect(() => {
    const id = searchParams.get('id');

    const fetchData = async () => {
      const response = await fetch(`/api/movies/movie?id=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [searchParams]);

  return <>{!data ? <Loading /> : <FullCard props={data} />}</>;
}