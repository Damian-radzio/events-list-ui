import { EventModel } from 'models/EventsModel';

import { BASE_URL } from './base_url';
import client from './client';

export const getEventById = async (id: number): Promise<any> => {
  return await client(`${BASE_URL}/events/${id}`, {
    method: 'GET',
  });
};

export const getEvents = async (): Promise<any> => {
  return await client(`${BASE_URL}/events`, {
    method: 'GET',
  });
};

export const postEvent = async (data: EventModel): Promise<any> => {
  const response = await client(`${BASE_URL}/events`, {
    method: 'POST',
    data: data,
  });
  return response.data;
};
