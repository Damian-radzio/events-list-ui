export interface EventsModel {
  eventsList: EventModel[];
}
export type EventModel = {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  image: string;
  typeOfEvent: typeOfEvent;
  phone_number: string;
  email: string;
  event_venue: string;
};
export enum typeOfEvent {
  SPORT = 'Sport',
  CULTURE = 'Kultura',
  ENTERTAINMNENT = 'Rozrywka',
}
