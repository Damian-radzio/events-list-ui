import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from 'features/events';
import { useDispatch } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    events: eventsSlice,
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
