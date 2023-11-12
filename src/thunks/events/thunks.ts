import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEventById, getEvents, postEvent } from 'api/events';
import { EventModel } from 'models/EventsModel';

export const fetchEventDetails = createAsyncThunk(
  'machines/fetchEventDetails',
  async (id: number) => {
    const { data } = await getEventById(id);
    return data;
  }
);

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const { data } = await getEvents();
  return data;
});

export const addEvent = createAsyncThunk('events/addEvent', async (data: EventModel | never) => {
  const response = await postEvent(data);
  return response.data;
});
