'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  colors: {
    grey: [
      '',
      '#F5F5F6',
      '#EAEBED',
      '#D5D6DC',
      '',
      '#ACADB9',
      '#7B7C88',
      '',
      '',
      '#232134',
    ],
    purple: [
      '',
      '#F2ECFA',
      '#E5D5FA',
      '#D1B4F8',
      '#BD93F7',
      '#9854F6',
      '#541F9D',
      '',
      '',
      '',
    ],
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
});
