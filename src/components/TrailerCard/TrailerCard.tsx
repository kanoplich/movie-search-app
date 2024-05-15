import {
  AspectRatio,
  Card,
  Text,
  Title,
  Divider,
  Image,
  List,
  ListItem,
  ThemeIcon,
} from '@mantine/core';
import { MovieDetails } from '@customTypes/types';
import classes from './TrailerCard.module.css';

type TrailerCardProps = {
  movie: MovieDetails;
};

export default function TrailerCard({ movie }: Readonly<TrailerCardProps>) {
  const { overview, videos, production_companies } = movie;

  return (
    <Card radius='lg' p={'lg'} className={classes.card}>
      {videos.results.length > 0 && (
        <>
          <Title order={3} className={classes.title}>
            Trailer
          </Title>
          <AspectRatio ratio={16 / 9} maw={500}>
            <iframe
              src={`https://www.youtube.com/embed/${videos.results[0].key}`}
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
      <List listStyleType='none'>
        {production_companies &&
          production_companies.map((company) => (
            <ListItem
              className={classes.listItem}
              key={company.id}
              icon={
                <ThemeIcon className={classes.iconWrapper}>
                  <Image
                    className={classes.icon}
                    src={
                      company.logo_path
                        ? `https://image.tmdb.org/t/p/w500${company.logo_path}`
                        : '/clapperboard.svg'
                    }
                    alt={company.name}
                  />
                </ThemeIcon>
              }
            >
              {company.name}
            </ListItem>
          ))}
      </List>
    </Card>
  );
}
