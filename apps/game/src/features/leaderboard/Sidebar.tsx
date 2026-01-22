import styles from './Leaderboard.module.css';
import { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router';
import { Button, CloseIcon, RankingIcon } from '@waldogame/ui';
import { useQuery } from '@tanstack/react-query';
import useStore from '../../store/store';
import apiclient from '@waldogame/apiclient';

export function Sidebar() {
  const { isLoading: boardsLoading, data: boards } = useQuery({
    queryKey: ['boards'],
    queryFn: apiclient.getAllBoards,
    staleTime: Infinity,
  });
  const menulist = boards?.map((b) => {
    return (
      <NavLink to={`/ranking/${b.id}`} key={b.id}>
        <RankingIcon /> Level {b.level}
      </NavLink>
    );
  });
  return (
    <div className="ranking-sidebar" data-testid="sidebar">
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.webp" alt="logo" />
          <p className={styles['game-name']}>
            <span style={{ color: '#199de4' }}>Where's</span>{' '}
            <span style={{ color: '#bf225a' }}>Waldo?</span>
          </p>
        </Link>
      </div>
      {boardsLoading && (
        <div>
          <p>Loading...</p>{' '}
        </div>
      )}
      {boards && menulist}
    </div>
  );
}

export function RankingMenu() {
  const isOpen = useStore((s) => s.rankingMenuIsOpen);
  const setIsOpen = useStore((s) => s.setRankingMenuIsOpen);

  const { isLoading: boardsLoading, data: boards } = useQuery({
    queryKey: ['boards'],
    queryFn: apiclient.getAllBoards,
    staleTime: Infinity,
  });

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClose);
    }

    return () => document.removeEventListener('pointerdown', handleClose);
  }, [isOpen]);

  const menulist = boards?.map((b) => {
    return (
      <NavLink
        to={`/ranking/${b.id}`}
        key={b.id}
        onClick={() => setIsOpen(false)}
      >
        <RankingIcon /> Level {b.level}
      </NavLink>
    );
  });

  return (
    <div
      className={
        isOpen
          ? `${styles['menu-backrop']} ${styles['show-ranking-menu']}`
          : `${styles['hide-ranking-menu']}`
      }
    >
      <div className="ranking-menu" ref={menuRef}>
        <Button
          className={styles['close-menu-btn']}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </Button>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/logo.webp" alt="logo" />
            <p className={styles['game-name']}>
              <span style={{ color: '#199de4' }}>Where's</span>{' '}
              <span style={{ color: '#bf225a' }}>Waldo?</span>
            </p>
          </Link>
        </div>
        {boardsLoading && (
          <div>
            <p>Loading...</p>{' '}
          </div>
        )}
        {boards && menulist}
      </div>
    </div>
  );
}
