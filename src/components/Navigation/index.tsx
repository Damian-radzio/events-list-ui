import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
export const Navigation = (): JSX.Element => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navLinksWrapper}>
        <Link className={styles.navLink} to="/events">
          Lista Wydarzeń
        </Link>
        <Link className={styles.navLink} to="/add-event">
          Dodaj Wydarzenie
        </Link>
      </div>
    </div>
  );
};
