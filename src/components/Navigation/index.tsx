import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ListIcon from '@mui/icons-material/List';
import { Button } from '@mui/material';
import classnames from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
export const Navigation = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    setActiveButton(window.location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.navbarWrapper}>
      <div
        className={classnames(styles.backBtn, activeButton === '/events' ? styles.disabled : null)}
        onClick={() => navigate(-1)}>
        <ArrowBackIosIcon sx={{ fontSize: 32, color: '#1876D1' }} />
      </div>
      <Link
        onClick={() => setActiveButton('/events')}
        className={classnames(styles.navLink, activeButton === '/events' ? styles.disabled : null)}
        to="/events">
        <Button variant="contained">
          <ListIcon />
          Lista Wydarzeń
        </Button>
      </Link>
      <Link
        onClick={() => setActiveButton('/add-event')}
        className={classnames(
          styles.navLink,
          activeButton === '/add-event' ? styles.disabled : null
        )}
        to="/add-event">
        <Button variant="contained">
          <AddIcon />
          Dodaj Wydarzenie
        </Button>
      </Link>
    </div>
  );
};
