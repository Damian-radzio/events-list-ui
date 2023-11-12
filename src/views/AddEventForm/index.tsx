import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { currentDayString, currentTimeString } from 'helpers/Date';
import { TypeOfEvent } from 'models/EventsModel';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store';
import { addEvent, fetchEvents } from 'thunks/events/thunks';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const validationSchema = Yup.object({
  date: Yup.string().required('Data jest wymagana'),
  time: Yup.string().required('Czas jest wymagany'),
  title: Yup.string().required('Tytuł jest wymagany'),
  description: Yup.string().required('Opis jest wymagany'),
  image: Yup.string().required('Zdjęcie jest wymagane'),
  typeOfEvent: Yup.string().required('Typ wydarzenia jest wymagany'),
  phone_number: Yup.string()
    .min(9, 'Minimalna liczba znaków to 9')
    .required('Numer telefonu jest wymagany'),
  email: Yup.string().email('Nieprawidłowy adres email').required('Email jest wymagany'),
  event_venue: Yup.string().required('Miejsce wydarzenia jest wymagane'),
});

export const AddEventForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { eventsList } = useSelector((state: any) => state.events);
  const [selectedFileName, setSelectedFileName] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      id: eventsList[eventsList.length - 1].id + 1,
      date: '',
      time: '',
      title: '',
      description: '',
      image: '',
      typeOfEvent: null,
      phone_number: '',
      email: '',
      event_venue: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(addEvent({ ...values }));
      navigate('/events');
    },
  });

  const resetForm = (): void => {
    formik.resetForm();
    setSelectedFileName('');
    setIsFormSaved(false);
    setIsImageUploaded(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.currentTarget.files) return;

    const reader = new FileReader();
    reader.onload = () => {
      formik.setFieldValue('image', reader.result);
    };
    reader.readAsDataURL(e.currentTarget.files[0]);
    setSelectedFileName(e.currentTarget.files[0].name);
    setIsImageUploaded(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedDate = e.target.value;
    formik.handleChange(e);

    if (selectedDate === currentDayString) {
      formik.setFieldValue('time', currentTimeString);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedTime = e.target.value;
    formik.handleChange(e);
    if (formik.values.date === currentDayString) {
      if (selectedTime < currentTimeString) {
        formik.setFieldValue('time', currentTimeString);
      } else {
        formik.setFieldValue('time', selectedTime);
      }
    }
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className={styles.form} encType="multipart/form-data">
        <TextField
          type="date"
          name="date"
          value={formik.values.date}
          onChange={handleDateChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          inputProps={{ min: currentDayString }}
        />
        <TextField
          type="time"
          name="time"
          value={formik.values.time}
          onChange={handleTimeChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
          inputProps={{ min: currentTimeString }}
        />
        <TextField
          label="Tytuł"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          inputProps={{
            min: formik.values.date === currentDayString ? currentTimeString : undefined,
          }}
        />
        <TextField
          label="Opis"
          name="description"
          multiline
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Grid item xs={12}>
          <input
            name="image"
            type="file"
            accept="image/*"
            id="imageInput"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="imageInput">
            <Button variant="contained" color="primary" component="span">
              Dodaj Załącznik
            </Button>
          </label>
          {selectedFileName && <span className={styles.attachmentName}>{selectedFileName}</span>}
          {isFormSaved && !isImageUploaded ? (
            <span className={styles.uploadImageError}>Zdjęcie jest wymagane</span>
          ) : null}
        </Grid>

        <FormControl>
          <InputLabel id="typeOfEvent-label">Typ wydarzenia</InputLabel>
          <Select
            labelId="typeOfEvent-label"
            name="typeOfEvent"
            value={formik.values.typeOfEvent}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.typeOfEvent && Boolean(formik.errors.typeOfEvent)}>
            <MenuItem value={TypeOfEvent.SPORT}>Sport</MenuItem>
            <MenuItem value={TypeOfEvent.CULTURE}>Kultura</MenuItem>
            <MenuItem value={TypeOfEvent.ENTERTAINMNENT}>Rozrywka</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Numer telefonu"
          name="phone_number"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
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
          error={formik.touched.event_venue && Boolean(formik.errors.event_venue)}
          helperText={formik.touched.event_venue && formik.errors.event_venue}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => setIsFormSaved(true)}>
          Dodaj wydarzenie
        </Button>
        <Button type="button" color="primary" variant="outlined" onClick={resetForm}>
          Zresetuj formularz
        </Button>
      </form>
    </Container>
  );
};

export default AddEventForm;
