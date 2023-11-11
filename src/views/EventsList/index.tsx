import { CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentDayString } from '../../helpers/Date';
import { EventModel } from '../../models/EventsModel';
import { AppDispatch } from '../../store';
import { fetchEvents } from '../../thunks/events/thunks';
import { EventTile } from './components/EventTile';
import styles from './styles.module.scss';

export const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsList, fetchEventsStatus } = useSelector((state: any) => state.events);
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  const filteredEventsList = eventsList.filter((ev: EventModel) => ev?.date > currentDayString);

  return (
    <>
      {fetchEventsStatus === 'pending' ? (
        <CircularProgress />
      ) : filteredEventsList?.length > 0 ? (
        <div className={styles.eventsList}>
          {filteredEventsList?.map((ev: EventModel) => <EventTile key={ev?.id} ev={ev} />)}
        </div>
      ) : (
        <Typography variant="h4" color="textPrimary" textAlign={'center'}>
          Brak nadchodzących wydarzeń.
        </Typography>
      )}
    </>
  );
};
