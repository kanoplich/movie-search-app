import { NextResponse } from 'next/server';

export async function GET() {
  const TOKEN = process.env.ACCESS_TOKEN;

  const url = 'https://api.themoviedb.org/3/genre/movie/list';

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options).then((res) => res.json());

  return NextResponse.json(data);
}
