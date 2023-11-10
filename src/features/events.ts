import { createSlice } from '@reduxjs/toolkit';
import { EventsModel, typeOfEvent } from '../models/EventsModel';

export const initialState: EventsModel = {
  eventsList: [
    {
      id: 1,
      date: '19.05.2023',
      time: '20:00',
      title: 'KULT',
      description: 'Nowa odsłona Kult juz za tydzien',
      image: '',
      typeOfEvent: typeOfEvent.SPORT,
      phone_number: '123456789',
      email: 'raek10@vp.pl',
      event_venue: 'Katowice',
    },
  ],
};

const eventsSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    updateEvents: (state, action) => {
      state.eventsList.push(action.payload);
    },
    fetchEventDetails: (state, action) => {
      state.eventsList.find((el: any) => el.id === action.payload);
    },
  },
});

export const { updateEvents, fetchEventDetails } = eventsSlice.actions;
export default eventsSlice.reducer;
