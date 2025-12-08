import styles from './Gameboard.module.css';
import { useRef, useEffect } from 'react';
import { Button, LoadingSpinner } from '@waldogame/ui';
import { useGame, useGameDispatch } from './gameContext';
import { ACTIONS } from './reducer';
import apiclient from '@waldogame/apiclient';

const TargetBox = ({ boardRef }) => {
  const {
    characterPosition,
    board,
    isValidating,
    characters,
    boxIsOpen,
    boxPosition,
  } = useGame();

  const dispatch = useGameDispatch();

  const handleValidation = (charId) => async () => {
    dispatch({ type: ACTIONS.VALIDATE_START });
    const clickData = { ...characterPosition, charId };

    try {
      const data = await apiclient.validateXY(clickData, board.id);
      dispatch({
        type: ACTIONS.VALIDATE_SUCCESS,
        payload: { data, clickData },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.VALIDATE_ERROR,
        payload: err.msg || 'A network error encountered.',
      });
    }
  };

  const targetBoxRef = useRef(null);

  const charsList = characters.map((item) => {
    const char = item.character;
    const name = char.name;
    if (!char.found) {
      return (
        <Button key={name} onClick={handleValidation(char.id)}>
          <img src={char.iconUrl} alt={name} />
          <p>{name.split(' ')[0]}</p>
        </Button>
      );
    }
  });

  useEffect(() => {
    const handleBoxClose = (e) => {
      if (
        boardRef.current &&
        targetBoxRef.current &&
        !targetBoxRef.current.contains(e.target) &&
        e.target !== boardRef.current
      ) {
        dispatch({ type: ACTIONS.CLOSE_BOX });
      }
    };

    if (boxIsOpen) {
      document.addEventListener('pointerdown', handleBoxClose);
    }

    return () => document.removeEventListener('pointerdown', handleBoxClose);
  }, [boxIsOpen, boardRef, dispatch]);

  const boxStyles = {
    transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
  };

  const className = boxIsOpen ? styles['show-box'] : styles['hide-box'];
  return (
    <div
      className={className}
      style={boxStyles}
      ref={targetBoxRef}
      data-testid="target-box"
      hidden={!boxIsOpen}
    >
      <div className={styles['target-box']}>
        <p>Who is there? {isValidating && <LoadingSpinner />}</p>
        <hr />
        <div className={styles['box-characters']}>{charsList}</div>
      </div>
    </div>
  );
};

export default TargetBox;
