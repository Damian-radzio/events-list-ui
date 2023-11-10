import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from '../features/events';

export default configureStore({
  reducer: {
    events: eventsSlice,
  },
});
