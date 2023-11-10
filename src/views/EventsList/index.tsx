import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { EventModel } from '../../models/EventsModel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const EventsList: React.FC = () => {
  const { eventsList } = useSelector((state: any) => state.events);

  return (
    <div className={styles.eventsList}>
      {eventsList?.length > 0 ? (
        eventsList?.map((ev: EventModel) => (
          <Link to={`/events/${ev.id}`} className={styles.event} key={ev.id}>
            <Card sx={{ minWidth: 275, maxWidth: 300 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {ev?.date}
                </Typography>
                <Typography variant="h5" component="div">
                  {ev?.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Link>
        ))
      ) : (
        <p>Brak wydarzeń</p>
      )}
    </div>
  );
};
