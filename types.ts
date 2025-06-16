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


export interface Winner {
  _id: string;
  code: string;
  prizeId: Prize; // Can be populated or just ID
  eventId: string;
  redeemed: boolean;
  createdAt: string;
  // Remove the prize property since it's not in the API response
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



export interface PrizeData {
  _id?: string;
  option: string;
  segColor: string;
  emoji: string;
  redeemInfo?: string;
}

export interface Prize {
  _id: string;
  prize: string;
  redeemInfo?: string;
}

export interface WinnerData {
  code: string;
  prizeId: string;
  eventId: string;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface ImageItem {
  src: any;
  alt: string;
}