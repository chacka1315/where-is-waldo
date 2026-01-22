import styles from './Gameboard.module.css';
import { useNavigate } from 'react-router';
import { useState, type ChangeEvent, type ReactNode } from 'react';
import { Button, CloseIcon, Error } from '@waldogame/ui';
import { LabeledInput, LoadingSpinner } from '@waldogame/ui';
import apiclient from '@waldogame/apiclient';
import { useMutation } from '@tanstack/react-query';
import useStore from '../../store/store';
import type { FormEvent } from 'react';

const SubmitScore = ({ boardId }: { boardId: number }) => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const setSubmitIsOpen = useStore((s) => s.setSubmitIsOpen);

  const mutation = useMutation({
    mutationFn: () => apiclient.submitScore({ playerName }, boardId),
    onSuccess: () => {
      navigate(`/ranking/${boardId}`);
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleClose = () => {
    const confirmation = confirm(
      'You will lose all data of this part, close anyway?',
    );

    if (!confirmation) return;

    setSubmitIsOpen(false);
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  let errorsList: ReactNode[] = [];
  if (mutation.error) {
    if ('errors' in mutation.error && Array.isArray(mutation.error.errors)) {
      errorsList = mutation.error.errors?.map((e) => (
        <Error error={e.msg} key={e.msg} />
      ));
    } else {
      errorsList = [
        <Error
          error={mutation.error?.message || 'Unextpected error.'}
          key="error"
        />,
      ];
    }
  }

  return (
    <div className={styles['sub-backrop']}>
      <form onSubmit={handleSubmit}>
        <Button
          type="button"
          className={styles['sub-close-btn']}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
        <p>Wouhh...You found them all!</p>
        <LabeledInput
          onChange={onChange}
          label="Enter your name to submit your score."
          value={playerName}
          id="name"
          autoFocus={true}
        >
          {errorsList}
        </LabeledInput>
        <Button className={styles['sub-btn']}>
          {mutation.isPending ? <LoadingSpinner /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default SubmitScore;
