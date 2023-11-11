import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EventTile } from '../../components/EventTile';
import { EventModel } from '../../models/EventsModel';
import { AppDispatch } from '../../store';
import { fetchEvents } from '../../thunks/events/thunks';
import styles from './styles.module.scss';

export const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsList } = useSelector((state: any) => state.events);
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      {eventsList?.length > 0 ? (
        <div className={styles.eventsList}>
          {eventsList?.map((ev: EventModel) => <EventTile key={ev?.id} ev={ev} />)}
        </div>
      ) : (
        <Typography variant="h4" color="textPrimary" textAlign={'center'}>
          Brak nadchodzących wydarzeń.
        </Typography>
      )}
    </>
  );
};
