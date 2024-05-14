import { MovieDetails } from '@customTypes/types';
import {
  AspectRatio,
  Card,
  Text,
  Title,
  Divider,
  Group,
  Image,
} from '@mantine/core';
import classes from './TrailerCard.module.css';

type TrailerCardProps = {
  movie: MovieDetails;
};

export default function TrailerCard({ movie }: Readonly<TrailerCardProps>) {
  const { overview, videos } = movie;

  return (
    <Card radius='lg' p={'lg'} className={classes.card}>
      {videos.results.length > 0 && (
        <>
          <Title order={3} className={classes.title}>
            Trailer
          </Title>
          <AspectRatio ratio={16 / 9} maw={500}>
            <iframe
              src={`https://youtube.com/watch?v=${videos.results[0].key}`}
              title='YouTube video player'
              style={{
                borderRadius: '9px',
                borderColor: 'transparent',
              }}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </AspectRatio>
          <Divider className={classes.divider} />
        </>
      )}
      <Title order={3} className={classes.title}>
        Description
      </Title>
      <Text className={classes.text}>{overview}</Text>
      <Divider className={classes.divider} />
      <Title order={3} className={classes.title}>
        Production
      </Title>
      <Group gap={'4px'} wrap='nowrap'>
        <Image radius='md' src='' alt='' />
        <Text>Company</Text>
      </Group>
    </Card>
  );
}
