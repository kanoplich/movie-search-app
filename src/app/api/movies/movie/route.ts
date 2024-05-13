import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const TOKEN = process.env.ACCESS_TOKEN;
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  const url = `https://api.themoviedb.org/3/movie/${id}`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options).then((res) => res.json());

  return NextResponse.json(data);
}
