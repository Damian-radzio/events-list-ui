import { createSlice } from '@reduxjs/toolkit';
import { statusOfEvent } from 'models/EventsModel';
import { addEvent, fetchEventDetails, fetchEvents } from 'thunks/events/thunks';

const initialState = {
  eventsList: [{}],
  eventDetails: {
    id: null,
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
  fetchEventDetailsStatus: '',
  fetchEventsStatus: '',
  addEventStatus: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEventDetails.pending, state => {
        state.fetchEventDetailsStatus = statusOfEvent.pending;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.fetchEventDetailsStatus = statusOfEvent.succeeded;
        state.eventDetails = action.payload;
      })
      .addCase(fetchEventDetails.rejected, state => {
        state.fetchEventDetailsStatus = statusOfEvent.failed;
      })
      .addCase(fetchEvents.pending, state => {
        state.fetchEventsStatus = statusOfEvent.pending;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.fetchEventsStatus = statusOfEvent.succeeded;
        state.eventsList = action.payload;
      })
      .addCase(fetchEvents.rejected, state => {
        state.fetchEventsStatus = statusOfEvent.failed;
      })
      .addCase(addEvent.pending, state => {
        state.addEventStatus = statusOfEvent.pending;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.addEventStatus = statusOfEvent.succeeded;
        state.eventsList.push(action.payload);
      })
      .addCase(addEvent.rejected, state => {
        state.addEventStatus = statusOfEvent.failed;
      });
  },
});

export const results = (state: any): void => state.events;
export default eventsSlice.reducer;
