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

  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sort}`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  if (year) {
    url += `&primary_release_year=${year}`;
  }

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  if (averageGte) {
    url += `&vote_average.gte=${averageGte}`;
  }

  if (averageLte) {
    url += `&vote_average.lte=${averageLte}`;
  }

  const data = await fetch(url, options).then((res) => res.json());

  return NextResponse.json(data);
}
