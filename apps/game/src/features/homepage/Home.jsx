import styles from './Home.module.css';
import { Link } from 'react-router';
import Title from '../../layout/Title';
import apiclient from '@waldogame/apiclient';
import { PulseLoader } from '@waldogame/ui';
import { useState, useEffect } from 'react';

function Home() {
  const [boards, setBoards] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getBoards = async () => {
      try {
        const data = await apiclient.getAllBoards();
        setBoards(data);
        setError(null);
      } catch (err) {
        setBoards(null);
        setError(err.msg || 'A network error encountered.');
      } finally {
        setIsLoading(false);
      }
    };

    getBoards();
  }, []);

  const boardsList = boards?.map((board) => {
    return <Board board={board} key={board.id} />;
  });

  return (
    <div className={styles.homepage} data-testid="homepage">
      <Title>Home</Title>
      {isLoading && (
        <div className={styles.loading} data-testid="loading">
          <PulseLoader color="#fff" />
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {boards && <div className={styles['boards-container']}>{boardsList}</div>}
    </div>
  );
}

const complexityColors = {
  Hard: '#bf225a',
  Normal: '#199de4',
  Easy: '#2b2828',
};

function Board({ board }) {
  return (
    <BoardCard>
      <Link to={`/play/${board.id}`}>
        <img src={board.imageUrl} alt={`level ${board.level} board`} />
        <div className={styles['board-infos']}>
          <p
            style={{ backgroundColor: complexityColors[board.complexity] }}
            className={styles.complexity}
          >
            {board.complexity}
          </p>
          <p className={styles.level}>Level {board.level}</p>
          <hr />
          <CharactersToFind coordinates={board.coordinates} />
        </div>
      </Link>
    </BoardCard>
  );
}

function CharactersToFind({ coordinates }) {
  const charsList = coordinates.map((item) => {
    const char = item.character;
    const name = char.name;
    return (
      <div key={name}>
        {char.iconUrl && <img src={char.iconUrl} alt={name} />}
        <p>{name.split(' ')[0]}</p>
      </div>
    );
  });

  return <div className={styles.characters}>{charsList}</div>;
}

function BoardCard({ children }) {
  return <div className={styles['board-card']}>{children}</div>;
}

export default Home;
