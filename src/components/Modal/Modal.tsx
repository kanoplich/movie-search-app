'use client';

import {
  Button,
  Divider,
  Flex,
  Rating,
  Title,
  Modal as MantineModal,
  useMantineTheme,
  CloseButton,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStorage } from '@hooks/useStorage';
import classes from './Modal.module.css';

type ModalProps = {
  id: number;
  opened: boolean;
  close: () => void;
  title: string;
};

export default function Modal({
  opened,
  close,
  title,
  id,
}: Readonly<ModalProps>) {
  const theme = useMantineTheme();
  const [currentRating, setCurrentRating] = useState<number>(0);
  const { rating, addRating, removeRating } = useStorage();

  useEffect(() => {
    if (`${id}` in rating) {
      setCurrentRating(+rating[id]);
    }
  }, []);

  const handleClickSave = () => {
    addRating(id, currentRating.toString());
    close();
  };

  const handleClickRemove = () => {
    removeRating(id);
    setCurrentRating(0);
    close();
  };

  return (
    <MantineModal
      className={classes.container}
      radius={theme.radius.md}
      opened={opened}
      onClose={close}
      withCloseButton={false}
      centered
      size={'sm'}
    >
      <Flex justify={'space-between'} align={'center'} mb={'md'}>
        <Title order={4} className={classes.title4}>
          Your rating
        </Title>
        <CloseButton className={classes.closeBtn} onClick={close} />
      </Flex>
      <Divider className={classes.divider} />
      <Title order={3} className={classes.title3}>
        {title}
      </Title>
      <Rating
        className={classes.rating}
        defaultValue={currentRating}
        color={theme.colors.yellow[6]}
        size='xl'
        count={10}
        onChange={(value) => setCurrentRating(value)}
      />
      <Flex>
        <Button className={classes.saveBtn} onClick={handleClickSave}>
          Save
        </Button>
        <Button className={classes.removeBtn} onClick={handleClickRemove}>
          Remote rating
        </Button>
      </Flex>
    </MantineModal>
  );
}
