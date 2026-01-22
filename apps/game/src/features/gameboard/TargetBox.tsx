import styles from './Gameboard.module.css';
import { useRef, useEffect } from 'react';
import { Button, LoadingSpinner } from '@waldogame/ui';
import apiclient, { type ClickData } from '@waldogame/apiclient';
import useStore from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import { useMutation } from '@tanstack/react-query';

type TargetBoxProps = {
  boardRef: React.RefObject<null>;
  boardId: number;
};
const TargetBox = ({ boardRef, boardId }: TargetBoxProps) => {
  const {
    characterPosition,
    characters,
    boxIsOpen,
    boxPosition,
    setValidationErr,
    updateAfterValidation,
    setBoxIsOpen,
  } = useStore(
    useShallow((s) => ({
      characterPosition: s.characterPosition,
      characters: s.characters,
      boxIsOpen: s.boxIsOpen,
      boxPosition: s.boxPosition,
      setValidationErr: s.setValidationErr,
      updateAfterValidation: s.updateAfterValidation,
      setBoxIsOpen: s.setBoxIsOpen,
    })),
  );

  const mutation = useMutation({
    mutationFn: (clickData: ClickData) => {
      return apiclient.validateXY(clickData, boardId);
    },
    onError: (error) => {
      console.log('Mutation fails:', error);
      setValidationErr(error.message);
    },

    onSuccess: (data, clickData) => {
      console.log('Update after validation', data);
      updateAfterValidation(data, clickData);
    },
  });

  const handleValidation = (charId: number) => async () => {
    const clickData = {
      x: characterPosition.x.toString(),
      y: characterPosition.y.toString(),
      charId: charId.toString(),
    };
    mutation.mutate(clickData);
  };

  const targetBoxRef = useRef<null | HTMLDivElement>(null);

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
    const handleBoxClose = (e: MouseEvent) => {
      if (
        boardRef.current &&
        targetBoxRef.current &&
        !targetBoxRef.current.contains(e.target as Node) &&
        e.target !== boardRef.current
      ) {
        setBoxIsOpen(false);
      }
    };

    if (boxIsOpen) {
      document.addEventListener('pointerdown', handleBoxClose);
    }

    return () => document.removeEventListener('pointerdown', handleBoxClose);
  }, [boxIsOpen, boardRef]);

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
        <p>Who is there? {mutation.isPending && <LoadingSpinner />}</p>
        <hr />
        <div className={styles['box-characters']}>{charsList}</div>
      </div>
    </div>
  );
};

export default TargetBox;
