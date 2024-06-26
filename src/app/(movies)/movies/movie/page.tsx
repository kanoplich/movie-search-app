'use client';

import { MovieDetails } from '@customTypes/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@components/Card/Card';
import Loading from '../../../loading';

export default function Movie() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<MovieDetails>();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id');

    const fetchData = async () => {
      const response = await fetch(`/api/movies/movie?id=${id}`);
      const data = await response.json();
      setData(data);
    };

    fetchData().catch((e) => {
      console.log('Failed to run promise', e);
    });
  }, [router, searchParams]);

  return <>{!data ? <Loading /> : <Card props={data} />}</>;
}
