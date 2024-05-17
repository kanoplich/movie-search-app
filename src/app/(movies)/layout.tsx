import { Flex } from '@mantine/core';
import Navbar from '@components/Navbar/Navbar';

export default function MoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      <Navbar />
      {children}
    </Flex>
  );
}
