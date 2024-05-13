import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const TOKEN = process.env.ACCESS_TOKEN;
  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get('primary_release_year');
  const genre = searchParams.get('with_genres');
  const sort = searchParams.get('sort_by');
  const page = searchParams.get('page');
  const averageGte = searchParams.get('vote_average.gte');
  const averageLte = searchParams.get('vote_average.lte');

  let url1 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}`;
  const url2 = 'https://api.themoviedb.org/3/genre/movie/list';

  if (year) {
    url1 += `&primary_release_year=${year}`;
  }

  if (genre) {
    url1 += `&with_genres=${genre}`;
  }

  if (averageGte) {
    url1 += `&vote_average.gte=${averageGte}`;
  }

  if (averageLte) {
    url1 += `&vote_average.lte=${averageLte}`;
  }

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const requests = [
    fetch(url1, options).then((res) => res.json()),
    fetch(url2, options).then((res) => res.json()),
  ];

  const [data, genres] = await Promise.all(requests);

  return NextResponse.json({ data, genres });
}
