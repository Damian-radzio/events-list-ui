import CardMedia from '@material-ui/core/CardMedia';
import { Divider, Paper, Typography } from '@mui/material';

import { EventModel } from '../../../../models/EventsModel';
import styles from './styles.module.scss';

type Props = {
  eventDetails: EventModel;
};

export const EventDetailsTile = ({ eventDetails }: Props): JSX.Element => {
  const eventInfo = `${eventDetails.date} | ${eventDetails.time} |  ${eventDetails.event_venue}`;

  return (
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
          <CardMedia
            component="img"
            height="350"
            alt="Zdjęcie wydarzenia"
            src={`${eventDetails.image}`}
          />
        </>
      ) : null}
    </Paper>
  );
};
