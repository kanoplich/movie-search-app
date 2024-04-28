import type { Metadata } from 'next';

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
      <body>{children}</body>
    </html>
  );
}
