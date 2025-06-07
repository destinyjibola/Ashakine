// types.ts
export interface Prize {
  _id: string;
  prize: string;
  maxWins: number;
  winCount: number;
  redeemInfo?: string;
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
  maxWins: number;
  redeemInfo?: string;
  eventId: string;
  winCount: number
}
