import { useState, useEffect, useCallback } from 'react';
import styles from './Leaderboard.module.css';
import { useParams, Link } from 'react-router';
import apiclient from '@waldogame/apiclient';
import { formatMsToChrono } from '@waldogame/utils';
import Title from '../../layout/Title';
import { Button, MenuIcon, PulseLoader } from '@waldogame/ui';
import { Sidebar, RankingMenu } from './Sidebar';

function Leaderboard() {
  const [ranksData, setRanksData] = useState();
  const [error, setError] = useState(null);
  const [boardsIsLoading, setBoardsIsLoading] = useState(true);
  const [ranksIsLoading, setRanksIsLoading] = useState(true);
  const [boards, setBoards] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { boardId } = useParams();

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
        setBoardsIsLoading(false);
      }
    };
    getBoards();
  }, []);

  useEffect(() => {
    const getRankings = async () => {
      try {
        const data = await apiclient.getLeaderboard(boardId);
        setRanksData(data);
        setError(null);
      } catch (error) {
        setError(error.msg || 'A network error encountered.');
        setRanksData(null);
      } finally {
        setRanksIsLoading(false);
      }
    };

    getRankings();
  }, [boardId]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = () => setIsOpen(true);

  if (error) {
    return (
      <div data-testid="leaderboard-error">
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  const rankList = ranksData?.rankings.map((r, index) => (
    <Item rank={r} index={index} key={r.id} />
  ));

  return (
    <div className={styles['ranking-page']} data-testid="leaderboard">
      <Title>Leaderboard</Title>
      <Sidebar boards={boards} isLoading={boardsIsLoading} />
      <RankingMenu
        boards={boards}
        isLoading={boardsIsLoading}
        closeMenu={closeMenu}
        isOpen={isOpen}
      />
      <div className={styles['rankings-container']}>
        {ranksIsLoading && (
          <div>
            <div className={styles.loading}>
              <PulseLoader color="#bf225a" />
            </div>
          </div>
        )}

        {ranksData && (
          <div className={styles['rank-infos']}>
            <Button onClick={openMenu} className={styles['menu-btn-toggle']}>
              <MenuIcon />
            </Button>
            <img src={ranksData.board.imageUrl} alt="" />

            <p className={styles.complexity}>{ranksData.board.complexity}</p>
            <Link to={`/play/${boardId}`}>Play</Link>
          </div>
        )}
        {ranksData?.rankings.length > 0 && (
          <>
            <div className={styles['rank-card-header']}>
              <p>Rank</p>
              <p>Player</p>
              <p>Time</p>
              <p>Date</p>
            </div>
            {rankList}
          </>
        )}
        {ranksData?.rankings.length === 0 && (
          <p className={styles['no-rank']}>
            No player won on this board yet,{' '}
            <Link to={`/play/${ranksData.board.id}`}>be the first!</Link>
          </p>
        )}
      </div>
    </div>
  );
}

function Item({ rank, index }) {
  const date = new Date(rank.createdAt).toISOString().split('T')[0];
  const award = {
    1: '/first-award.svg',
    2: '/second-award.svg',
    3: '/third-award.svg',
  };

  const playerName =
    rank.playerName.length > 10
      ? rank.playerName.slice(0, 9) + '...'
      : rank.playerName;
  const awardLink = award[index + 1];
  return (
    <div className={styles['rank-card']} data-testid="rank-card">
      <p className={styles['player-rank']}>
        {awardLink ? <img src={awardLink} alt="" /> : index + 1}
      </p>
      <p className={styles['player-name']}>{playerName}</p>
      <p className={styles.time}>{formatMsToChrono(rank.time)}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
}

export default Leaderboard;
