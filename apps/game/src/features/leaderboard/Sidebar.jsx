import styles from './Leaderboard.module.css';
import { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router';
import { Button, CloseIcon, RankingIcon } from '@waldogame/ui';

export function Sidebar({ boards, isLoading }) {
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
        <Link to="/" end>
          <img src="/logo.webp" alt="logo" />
          <p className={styles['game-name']}>
            <span style={{ color: '#199de4' }}>Where's</span>{' '}
            <span style={{ color: '#bf225a' }}>Waldo?</span>
          </p>
        </Link>
      </div>
      {isLoading && (
        <div>
          <p>Loading...</p>{' '}
        </div>
      )}
      {boards && menulist}
    </div>
  );
}

export function RankingMenu({ isLoading, boards, closeMenu, isOpen }) {
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClose);
    }

    return () => document.removeEventListener('pointerdown', handleClose);
  }, [isOpen, closeMenu]);

  const menulist = boards?.map((b) => {
    return (
      <NavLink to={`/ranking/${b.id}`} key={b.id}>
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
        <Button className={styles['close-menu-btn']} onClick={closeMenu}>
          <CloseIcon />
        </Button>
        <div className={styles.logo}>
          <Link to="/" end>
            <img src="/logo.webp" alt="logo" />
            <p className={styles['game-name']}>
              <span style={{ color: '#199de4' }}>Where's</span>{' '}
              <span style={{ color: '#bf225a' }}>Waldo?</span>
            </p>
          </Link>
        </div>
        {isLoading && (
          <div>
            <p>Loading...</p>{' '}
          </div>
        )}
        {boards && menulist}
      </div>
    </div>
  );
}
