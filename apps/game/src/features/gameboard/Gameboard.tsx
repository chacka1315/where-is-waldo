import styles from './Gameboard.module.css';
import { useParams } from 'react-router';
import {
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { CheckedIcon, PulseLoader } from '@waldogame/ui';
import apiclient from '@waldogame/apiclient';
import Title from '../../layout/Title';
import Header from '../../layout/Header';
import SubmitScore from './SubmitScore';
import TargetBox from './TargetBox';
import { useQuery } from '@tanstack/react-query';
import useStore from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import type { ClickData } from '@waldogame/apiclient';

function Gameboard() {
  const boardRef = useRef(null);
  const { boardId: id } = useParams();
  const boardId = Number(id);
  const resetGame = useStore((s) => s.reset);

  const {
    boxIsOpen,
    validationRes,
    isShowingRes,
    markers,
    submitIsOpen,
    validationErr,
    setBoxIsOpen,
    openBox,
    setCharacters,
  } = useStore(
    useShallow((s) => ({
      boxIsOpen: s.boxIsOpen,
      validationRes: s.validationRes,
      isShowingRes: s.isShowingRes,
      markers: s.markers,
      submitIsOpen: s.submitIsOpen,
      validationErr: s.validationErr,
      setBoxIsOpen: s.setBoxIsOpen,
      openBox: s.openBox,
      setCharacters: s.setCharacters,
    })),
  );

  const {
    isLoading,
    data: board,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['boards', 'round', boardId],
    queryFn: () => apiclient.startRound(boardId),
  });

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log('Sucess board load');

      setCharacters(board.coordinates);
    }
  }, [isSuccess]);

  const closeBox = () => setBoxIsOpen(false);
  const handleBoxOpening = (e: MouseEvent<HTMLImageElement>) => openBox(e);

  const markersList = markers.map((m) => (
    <Marker key={m.charId} position={m} />
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

      {error && (
        <div>
          <Header></Header>
          <p className={styles.error}>{error.message}</p>
        </div>
      )}

      {board && (
        <>
          <Title>{`Level ${board.level}`}</Title>
          <Header>
            <CharactersToFind />
            {isShowingRes && (
              <ResponsePopUp>
                <p>{validationErr || validationRes?.msg}</p>
              </ResponsePopUp>
            )}
          </Header>

          {submitIsOpen && <SubmitScore boardId={boardId} />}

          <TargetBox boardRef={boardRef} boardId={boardId} />

          <div className={styles.board}>
            <div className={styles['board-content']}>
              {markersList}
              <img
                ref={boardRef}
                src={board.imageUrl}
                alt={`level ${board.level} board`}
                onClick={boxIsOpen ? closeBox : handleBoxOpening}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CharactersToFind() {
  const characters = useStore((s) => s.characters);

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

const ResponsePopUp = ({ children }: { children: ReactNode }) => {
  const isShowingRes = useStore((s) => s.isShowingRes);
  const validationRes = useStore((s) => s.validationRes);
  const setIsShowingRes = useStore((s) => s.setIsShowingRes);

  useEffect(() => {
    const handleClose = () => {
      setIsShowingRes(false);
    };

    if (isShowingRes) {
      document.addEventListener('pointerdown', handleClose);
    }

    return () => document.removeEventListener('pointerdown', handleClose);
  }, [isShowingRes]);

  const style = validationRes?.match
    ? { borderColor: '#199de4', color: '#199de4' }
    : { borderColor: '#bf225a', color: '#bf225a' };

  return (
    <div style={style} className={styles['response-popup']}>
      {children}
    </div>
  );
};

type MarkerProps = {
  position: ClickData;
};

function Marker({ position }: MarkerProps) {
  const style: CSSProperties = {
    position: 'absolute',
    top: `${Number(position.y) * 100}%`,
    left: `${Number(position.x) * 100}%`,
    zIndex: '1',
  };

  return (
    <span style={style} className={styles['checked']} key={position.charId}>
      <CheckedIcon />
    </span>
  );
}

export default Gameboard;
