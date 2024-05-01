import { Poppins, Inter } from 'next/font/google';

export const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
