import styles from './Gameboard.module.css';
import { useParams } from 'react-router';
import { useCallback, useEffect, useRef } from 'react';
import { CheckedIcon, PulseLoader } from '@waldogame/ui';
import apiclient from '@waldogame/apiclient';
import Title from '../../layout/Title';
import Header from '../../layout/Header';
import SubmitScore from './SubmitScore';
import TargetBox from './TargetBox';
import { ACTIONS } from './reducer';
import { useGame, useGameDispatch } from './gameContext';

function Gameboard() {
  const boardRef = useRef(null);
  const { boardId } = useParams();
  const {
    board,
    loadError,
    isLoading,
    boxIsOpen,
    validationRes,
    validationErr,
    isShowingRes,
    markers,
    submitIsOpen,
  } = useGame();

  const dispatch = useGameDispatch();

  useEffect(() => {
    const startRound = async () => {
      try {
        const data = await apiclient.startRound(boardId);
        dispatch({
          type: ACTIONS.LOAD_SUCCESS,
          payload: { board: data, characters: data.coordinates },
        });
      } catch (err) {
        dispatch({
          type: ACTIONS.LOAD_ERROR,
          payload: err.msg || 'A network error encountered.',
        });
      }
    };

    startRound();
  }, [boardId, dispatch]);

  const closeBox = useCallback(() => {
    dispatch({ type: ACTIONS.CLOSE_BOX });
  }, [dispatch]);

  const openBox = (e) => {
    dispatch({ type: ACTIONS.OPEN_BOX, payload: e });
  };

  const markersList = markers.map((m) => (
    <Marker key={m.charId} position={m} boardRef={boardRef} />
  ));

  return (
    <div className={styles['gameboard-page']} data-testid="gameboard">
      {isLoading && (
        <div data-testid="loading">
          <Title>Where's Waldo?</Title>
          <Header></Header>
          <div className={styles.loading}>
            <PulseLoader color="#bf225a" />
          </div>
        </div>
      )}

      {loadError && (
        <div>
          <Header></Header>
          <p className={styles.error}>{loadError}</p>
        </div>
      )}

      {board && (
        <>
          <Title>{`Level ${board.level}`}</Title>
          <Header>
            <CharactersToFind />
            {isShowingRes && (
              <ResponsePopUp>
                <p>{validationErr || validationRes.msg}</p>
              </ResponsePopUp>
            )}
          </Header>

          {submitIsOpen && <SubmitScore boardId={boardId} />}

          <TargetBox boardRef={boardRef} />

          <div className={styles.board}>
            <div className={styles['board-content']}>
              {markersList}
              <img
                ref={boardRef}
                src={board.imageUrl}
                alt={`level ${board.level} board`}
                onClick={boxIsOpen ? closeBox : openBox}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CharactersToFind() {
  const { characters } = useGame();
  const charsList = characters.map((item) => {
    const char = item.character;
    const name = char.name;

    return (
      <div
        key={name}
        style={
          char.found
            ? { color: '#199de4' }
            : { color: 'rgb(128, 128, 128, 0.2)' }
        }
      >
        <img src={char.iconUrl} alt={name} />
        <CheckedIcon />
      </div>
    );
  });

  return <div className={styles['characters-to-find']}>{charsList}</div>;
}

const ResponsePopUp = ({ children }) => {
  const { isShowingRes, validationRes } = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    const handleClose = () => {
      dispatch({ type: ACTIONS.HIDE_RESPONSE });
    };

    if (isShowingRes) {
      document.addEventListener('pointerdown', handleClose);
    }

    return () => document.removeEventListener('pointerdown', handleClose);
  }, [isShowingRes, dispatch]);

  const style = validationRes.match
    ? { borderColor: '#199de4', color: '#199de4' }
    : { borderColor: '#bf225a', color: '#bf225a' };

  return (
    <div style={style} className={styles['response-popup']}>
      {children}
    </div>
  );
};

function Marker({ position }) {
  const style = {
    position: 'absolute',
    top: `${position.y * 100}%`,
    left: `${position.x * 100}%`,
    zIndex: '1',
  };

  return (
    <span style={style} className={styles['checked']} key={position.charId}>
      <CheckedIcon />
    </span>
  );
}

export default Gameboard;
