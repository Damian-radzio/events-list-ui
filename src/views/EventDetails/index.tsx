import EventBusyIcon from '@mui/icons-material/EventBusy';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../store';
import { fetchEventDetails } from '../../thunks/events/thunks';
import { EventDetailsTile } from './components/EventDetailsTile';
import styles from './styles.module.scss';

export const EventDetails = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { eventDetails, fetchEventDetailsStatus } = useSelector((state: any) => state.events);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchEventDetails(parseInt(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.eventDetailsContainer}>
      {fetchEventDetailsStatus === 'pending' ? (
        <CircularProgress />
      ) : eventDetails.id ? (
        <EventDetailsTile eventDetails={eventDetails} />
      ) : (
        <div className={styles.infoWrapper}>
          <Typography variant="h4" color="textPrimary">
            To wydarzenie nie istnieje lub dobiegło końca
          </Typography>
          <EventBusyIcon sx={{ fontSize: 240, color: '#1876D1', opacity: 0.5 }} />
        </div>
      )}
    </div>
  );
};
