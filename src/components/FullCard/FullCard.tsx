import { MovieDetails } from '@customTypes/types';
import classes from './FullCard.module.css';

type FullCardProps = {
  props: MovieDetails;
};

export default function FullCard({ props }: Readonly<FullCardProps>) {
  return <>FullCard</>;
}
