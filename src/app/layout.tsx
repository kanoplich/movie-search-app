import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider, Container } from '@mantine/core';
import { theme } from '../theme';
import classes from './layout.module.css';

export const metadata: Metadata = {
  title: 'ArrowFlicks',
  description: 'Movie search app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Container className={classes.container}>
            <header></header>
            <main>{children}</main>
            <footer></footer>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
