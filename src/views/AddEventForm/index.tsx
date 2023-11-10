import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Grid,
} from '@material-ui/core';

import { updateEvents } from '../../features/events';
import { typeOfEvent } from '../../models/EventsModel';

import styles from './styles.module.scss';

const validationSchema = Yup.object({
  date: Yup.string().required('Data jest wymagana'),
  time: Yup.string().required('Czas jest wymagany'),
  title: Yup.string().required('Tytuł jest wymagany'),
  description: Yup.string().required('Opis jest wymagany'),
  image: Yup.mixed(),
  typeOfEvent: Yup.string().required('Typ wydarzenia jest wymagany'),
  phone_number: Yup.string().required('Numer telefonu jest wymagany'),
  email: Yup.string()
    .email('Nieprawidłowy adres email')
    .required('Email jest wymagany'),
  event_venue: Yup.string().required('Miejsce wydarzenia jest wymagane'),
});

export const AddEventForm = (): JSX.Element => {
  const { eventsList } = useSelector((state: any) => state.events);

  const dispatch = useDispatch();
  console.log(eventsList.length);

  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      title: '',
      description: '',
      image: null,
      typeOfEvent: '',
      phone_number: '',
      email: '',
      event_venue: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateEvents({ id: eventsList.length + 1, ...values }));
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    formik.setFieldValue('image', e.target.files[0]);
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          label="Data"
          type="date"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
        />
        <TextField
          label="Czas"
          type="time"
          name="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
        />
        <TextField
          label="Tytuł"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          label="Opis"
          name="description"
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <Grid item xs={12}>
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            onChange={handleImageChange}
          />
          <label htmlFor="imageInput">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={styles.attachmentButton}
            >
              Dodaj Załącznik
            </Button>
          </label>
        </Grid>
        <FormControl>
          <InputLabel id="typeOfEvent-label">Typ wydarzenia</InputLabel>
          <Select
            labelId="typeOfEvent-label"
            name="typeOfEvent"
            value={formik.values.typeOfEvent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.typeOfEvent && Boolean(formik.errors.typeOfEvent)
            }
          >
            <MenuItem value={typeOfEvent.SPORT}>Sport</MenuItem>
            <MenuItem value={typeOfEvent.CULTURE}>Kultura</MenuItem>
            <MenuItem value={typeOfEvent.ENTERTAINMNENT}>Rozrywka</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Numer telefonu"
          name="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phone_number && Boolean(formik.errors.phone_number)
          }
          helperText={formik.touched.phone_number && formik.errors.phone_number}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Miejsce wydarzenia"
          name="event_venue"
          value={formik.values.event_venue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.event_venue && Boolean(formik.errors.event_venue)
          }
          helperText={formik.touched.event_venue && formik.errors.event_venue}
        />
        <Button type="submit" color="primary" variant="contained">
          Dodaj wydarzenie
        </Button>
      </form>
    </Container>
  );
};

export default AddEventForm;
