import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider, Container } from '@mantine/core';
import StorageContextProvider from '@context/storage-context';
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
            <StorageContextProvider>
              <main>{children}</main>
            </StorageContextProvider>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
