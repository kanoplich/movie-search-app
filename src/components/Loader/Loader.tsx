import { Loader as MantineLoader } from '@mantine/core';

export default function Loader() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <MantineLoader color='#9854F6' />
    </div>
  );
}
