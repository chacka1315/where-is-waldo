import styles from './Header.module.css';
import { Link } from 'react-router';
import { InfoIcon, Button, RankingIcon } from '@waldogame/ui';

function Header({ children }) {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/" end>
            <img src="/logo.webp" alt="logo" />
            <p className={styles['game-name']}>
              <span style={{ color: '#199de4' }}>Where's</span>{' '}
              <span style={{ color: '#bf225a' }}>Waldo?</span>
            </p>
          </Link>
        </div>
        {children}
        <div className={styles.links}>
          <Link className={styles['infos-btn']} to="/gameinfos">
            <InfoIcon />
            <span>Help</span>
          </Link>
          <Link to="/ranking/1">
            <RankingIcon />
            <span>Ranking</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
