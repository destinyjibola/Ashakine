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
  invite: boolean;
  name: string;
  url: string;
  email?: string;
  event?: Event; // Can be event ID or populated Event
  logo: {
    url: string;
    public_id: string;
    altText?: string;
  };
  prizes?: Prize[]; // Populated prizes
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
  slug: string;
  spinCount: number;
  spinLog: { date: string; count: number }[];
  lastSpinDate?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  vendors?: string[] | Vendor[] | null;
  totalWins?: number;
  redeemedCount?: number;
  logo?: {
    url: string;
    public_id: string;
    altText?: string;
  };
  isActive: boolean;
  startTime?: string | null;
  endTime?: string | null;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  phoneNumber: string;
  formerPrice: string;
  price: string;
  discount: number;
  image?: { url: string; public_id: string; altText?: string };
  vendor: string | { _id: string; name: string };
  event: string | Event;
}

export interface Winner {
  _id: string;
  code: string;
  prizeId: Prize | null;
  eventId: string | null;
  redeemed: boolean;
  createdAt: string;
}

export interface NewEventData {
  name: string;
}

export interface NewPrizeData {
  prize: string;
  maxWins: number;
  winCount: number;
  redeemInfo: string;
  eventId: string;
  vendorId?: string | null;
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
  title: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  formerPrice: string;
  discount: string;
  phoneNumber: string;
  vendorId: string;
  image?: FileList;
}
