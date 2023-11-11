import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EventDetailsTile } from '../../components/EventDetailsTile';
import { AppDispatch } from '../../store';
import { fetchEventDetails } from '../../thunks/events/thunks';
import styles from './styles.module.scss';

export const EventDetails = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { eventDetails } = useSelector((state: any) => state.events);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchEventDetails(parseInt(id)));
  }, [dispatch, id]);

  return (
    <div className={styles.eventDetailsContainer}>
      {eventDetails.id ? (
        <EventDetailsTile eventDetails={eventDetails} />
      ) : (
        <Typography variant="h4" color="textPrimary">
          Wydarzenie nie istnieje
        </Typography>
      )}
    </div>
  );
};
