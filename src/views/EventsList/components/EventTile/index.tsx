import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { EventModel } from 'models/EventsModel';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  ev: EventModel;
};

export const EventTile = ({ ev }: Props): JSX.Element => {
  return (
    <Link to={`/events/${ev?.id}`} key={ev?.id} className={styles.tileWrapper}>
      <Card sx={{ width: 300 }} className={styles.tile}>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {ev?.date}
          </Typography>
          <Typography variant="h5" component="div" className={styles.title}>
            {ev?.title}
          </Typography>
        </CardContent>
        {ev?.image ? (
          <CardMedia component="img" height="150" alt="Zdjęcie wydarzenia" src={`${ev.image}`} />
        ) : null}
        <CardActions className={styles.moreBtn}>
          <Button size="small">Czytaj Więcej...</Button>
        </CardActions>
      </Card>
    </Link>
  );
};
