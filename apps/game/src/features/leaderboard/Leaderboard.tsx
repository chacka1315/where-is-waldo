import styles from './Leaderboard.module.css';
import { useParams, Link } from 'react-router';
import apiclient from '@waldogame/apiclient';
import { formatMsToChrono } from '@waldogame/utils';
import Title from '../../layout/Title';
import { Button, MenuIcon, PulseLoader } from '@waldogame/ui';
import { Sidebar, RankingMenu } from './Sidebar';
import { useQuery } from '@tanstack/react-query';
import useStore from '../../store/store';
import type { Rank } from '@waldogame/apiclient/dist/boards';

function Leaderboard() {
  const setIsOpen = useStore((s) => s.setRankingMenuIsOpen);
  const { boardId: id } = useParams();
  const boardId = Number(id);

  const {
    data: ranksData,
    error: rankError,
    isLoading: rankLoading,
  } = useQuery({
    queryKey: ['ranks', boardId],
    staleTime: 1000 * 10,
    queryFn: () => apiclient.getLeaderboard(boardId),
  });

  if (rankError) {
    return (
      <div data-testid="leaderboard-error">
        <p className={styles.error}>{rankError.message}</p>
      </div>
    );
  }

  const rankList = ranksData?.rankings.map((r, index) => (
    <Item rank={r} index={index} key={r.id} />
  ));

  return (
    <div className={styles['ranking-page']} data-testid="leaderboard">
      <Title>Leaderboard</Title>
      <Sidebar />
      <RankingMenu />
      <div className={styles['rankings-container']}>
        {rankLoading && (
          <div>
            <div className={styles.loading}>
              <PulseLoader color="#bf225a" />
            </div>
          </div>
        )}

        {ranksData && (
          <div className={styles['rank-infos']}>
            <Button
              onClick={() => setIsOpen(true)}
              className={styles['menu-btn-toggle']}
            >
              <MenuIcon />
            </Button>
            <img src={ranksData.board.imageUrl} alt="" />

            <p className={styles.complexity}>{ranksData.board.complexity}</p>
            <Link to={`/play/${boardId}`}>Play</Link>
          </div>
        )}
        {ranksData && ranksData.rankings.length > 0 && (
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
        {ranksData && ranksData?.rankings.length === 0 && (
          <p className={styles['no-rank']}>
            No player won on this board yet,{' '}
            <Link to={`/play/${ranksData.board.id}`}>be the first!</Link>
          </p>
        )}
      </div>
    </div>
  );
}

function Item({ rank, index }: { rank: Rank; index: number }) {
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
  const awardLink = award[(index + 1) as keyof typeof award];
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
