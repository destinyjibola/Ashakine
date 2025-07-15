// types.ts
export interface Prize {
  _id: string;
  prize: string;
  maxWins: number;
  redeemInfo?: string;
  winCount: number;
  event: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  vendor?: string; // Vendor ID
}

export interface Vendor {
  _id: string;
  name: string;
  url: string;
  email?: string;
  event: string | Event; // Can be event ID or populated Event

  prizes?: Prize[]; // Populated prizes
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Event {
  _id: string;
  name: string;
  type: "Single" | "Vendor";
  prizes: Prize[];
  user: string;
  spinCount: number;
  images: string[];
  spinLog: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  vendors?: string[] | Vendor[]; // Can be vendor IDs or populated Vendor objects
  totalWins?: number;
  redeemedCount?: number;
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

export interface NewEventData {
  name: string;
}

export interface NewPrizeData {
  prize: string;
  maxWins: number;
  winCount: number;
  redeemInfo?: string;
  eventId: string;
  vendorId?: string; // Add vendorId for associating prizes with vendors
}

export interface NewVendorData {
  name: string;
  url: string;
  email?: string;
  eventId: string;
}

export interface PrizeData {
  _id?: string;
  option: string;
  segColor: string;
  emoji: string;
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
