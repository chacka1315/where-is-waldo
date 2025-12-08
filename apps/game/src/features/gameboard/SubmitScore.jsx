import styles from './Gameboard.module.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Button, CloseIcon, Error } from '@waldogame/ui';
import { LabeledInput, LoadingSpinner } from '@waldogame/ui';
import apiclient from '@waldogame/apiclient';
import { ACTIONS } from './reducer';
import { useGameDispatch } from './gameContext';

const SubmitScore = ({ boardId }) => {
  const [playerName, setPlayerName] = useState('');
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useGameDispatch();

  const onChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleClose = () => {
    const confirmation = confirm(
      'You will lose all data of this part, close anyway?',
    );

    if (!confirmation) return;

    dispatch({ type: ACTIONS.CLOSE_SUBMIT });
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiclient.submitScore({ playerName }, boardId);
      setErr(null);
      navigate(`/ranking/${boardId}`);
    } catch (err) {
      setErr(err.errors || err.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const errorsList = err?.map((e) => <Error error={e.msg} key={e.msg} />);

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
          {isLoading ? <LoadingSpinner /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default SubmitScore;
