import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EventModel } from '../../models/EventsModel';
import { Paper, Typography, Divider } from '@mui/material';
import styles from './styles.module.scss';
export const EventDetails = () => {
  const { eventsList } = useSelector((state: any) => state.events);
  const { id } = useParams();
  const eventDetails =
    id && eventsList.find((el: EventModel) => el.id === parseInt(id));

  const eventInfo = `${eventDetails.date} | ${eventDetails.time} |  ${eventDetails.event_venue}`;
  return (
    <div className={styles.eventDetailsContainer}>
      {eventDetails ? (
        <Paper className={styles.paper}>
          <div className={styles.header}>
            <Typography variant="h5" gutterBottom>
              {eventDetails.title}
            </Typography>
            <div className={styles.description}>
              <Typography variant="body1" paragraph>
                {eventDetails.description}
              </Typography>
            </div>
          </div>
          <div className={styles.date}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {eventInfo}
            </Typography>
          </div>
          <Divider />

          <div className={styles.header}>
            <Typography variant="h5" textAlign={'left'} marginTop={'12px'}>
              Kontakt
            </Typography>
          </div>
          <div className={styles.contactInfo}>
            <Typography variant="subtitle1" color="textSecondary">
              Telefon: {eventDetails.phone_number}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Email: {eventDetails.email}
            </Typography>
          </div>

          <Divider />
          <div className={styles.additionalInfo}>
            <Typography variant="subtitle2" color="textSecondary">
              Typ wydarzenia: {eventDetails.typeOfEvent}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Miejsce: {eventDetails.event_venue}
            </Typography>
          </div>

          {eventDetails.image ? (
            <>
              <Divider />
              <img src={eventDetails.image} alt="Zdjęcie wydarzenia" />
            </>
          ) : null}
        </Paper>
      ) : (
        <div>Wydarzenie nie istnieje.</div>
      )}
    </div>
  );
};
