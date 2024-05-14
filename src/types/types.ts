export type General = {
  data: Data;
  genres: {
    genres: Genres[];
  };
};

export type Data = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Genres = {
  id: number;
  name: string;
};

export type Companies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Companies[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideosResults[];
  };
};

type VideosResults = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type StorageDataId = {
  rating: string;
  data: Movie | MovieDetails;
};

export type StorageData = {
  [key: string]: StorageDataId;
};

export type SortOptions = {
  [key: string]: string;
};
