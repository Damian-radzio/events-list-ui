export interface EventsModel {
  eventsList: EventModel[];
  eventDetails: EventModel;
  fetchEventDetailsStatus: statusOfEvent | null;
  fetchEventsStatus: statusOfEvent | null;
  addEventStatus: statusOfEvent | null;
}
export type EventModel = {
  id: number | null;
  date: string;
  time: string;
  title: string;
  description: string;
  image: string;
  typeOfEvent: typeOfEvent | string;
  phone_number: string;
  email: string;
  event_venue: string;
};

export enum typeOfEvent {
  SPORT = 'Sport',
  CULTURE = 'Kultura',
  ENTERTAINMNENT = 'Rozrywka',
}

export enum statusOfEvent {
  pending = 'pending',
  succeeded = 'fulfilled',
  failed = 'failed',
}
