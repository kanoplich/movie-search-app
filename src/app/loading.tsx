import { Loader } from '@mantine/core';

export default function Loading() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Loader color='#9854F6' />
    </div>
  );
}
