import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <div>
        <p>Where is Waldo? | &copy; 2025 All rights not reserved.</p>
        <p>
          Created by <a href="#">siaka.d</a>
        </p>
        <p>
          Learning coding from{' '}
          <a href="https://theodinproject.com">The Odin Project</a>
        </p>
      </div>
      <div className={styles.credits}>
        <p>
          Characters pics and app logo from{' '}
          <a href="https://waldo.fandom.com/wiki/Category:Characters">
            Where's waldo fandom
          </a>
        </p>
        <p>
          Characters icons from{' '}
          <a href="https://whereiswaldo.com/">Where's Waldo online</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
