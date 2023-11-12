import { Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentDayString } from '../../helpers/Date';
import { EventModel, EventTimeModel } from '../../models/EventsModel';
import { AppDispatch } from '../../store';
import { fetchEvents } from '../../thunks/events/thunks';
import { EventTile } from './components/EventTile';
import styles from './styles.module.scss';

export const EventsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { eventsList, fetchEventsStatus } = useSelector((state: any) => state.events);
  const [filter, setFilter] = useState<EventTimeModel>(EventTimeModel.future);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, filter]);

  const filteredEventsList = eventsList.filter((ev: EventModel) => {
    if (filter === 'past') {
      return ev.date < currentDayString;
    } else if (filter === 'future') {
      return ev.date >= currentDayString;
    }
    return true;
  });

  const handleFilter = (filterType: EventTimeModel): void => {
    setFilter(filterType);
  };

  return (
    <div className={styles.EventsListView}>
      <div className={styles.buttonsWrapper}>
        <Button
          disabled={filter === EventTimeModel.past}
          onClick={() => handleFilter(EventTimeModel.past)}>
          Ubiegłe wydarzenia
        </Button>
        <Button
          disabled={filter === EventTimeModel.all}
          onClick={() => handleFilter(EventTimeModel.all)}>
          Wszystkie wydarzenia
        </Button>
        <Button
          disabled={filter === EventTimeModel.future}
          onClick={() => handleFilter(EventTimeModel.future)}>
          Przyszłe wydarzenia
        </Button>
      </div>
      {fetchEventsStatus === 'pending' ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : filteredEventsList?.length > 0 ? (
        <div className={styles.eventsList}>
          {filteredEventsList?.map((ev: EventModel) => <EventTile key={ev?.id} ev={ev} />)}
        </div>
      ) : (
        <Typography variant="h4" color="textPrimary" textAlign={'center'}>
          Brak nadchodzących wydarzeń.
        </Typography>
      )}
    </div>
  );
};
