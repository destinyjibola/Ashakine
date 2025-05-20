// types.ts
export interface Prize {
  _id: string;
  prize: string;
  event: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Event {
  _id: string;
  name: string;
  prizes: Prize[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewEventData {
  name: string;
}

export interface NewPrizeData {
  prize: string;
  eventId: string;
}