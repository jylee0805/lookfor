import firebase from "firebase/compat/app";

export type Notify = {
  message: string;
  createdTime: { seconds: number };
  isRead: boolean;
  title: string;
  id?: string;
  postId: string;
  concertId: string;
};

export type OriginView = {
  image: string;
  note: string;
  content: string;
  id: string;
  concert: string;
  createdTime: string;
  row: number;
  seat: number;
  section: string;
  userUID: string;
};

export type ViewPost = {
  image: string;
  note: string;
  content: string;
  id: string;
  comment: Comment[];
  concert: string;
  createdTime: string;
  row: number;
  seat: number;
  section: string;
  userUID: string;
  userName: string | undefined;
  avatar: string | undefined;
};

export type Comment = {
  content: string;
  userUID: string;
  createdTime: string;
  id: string;
  userName?: string;
  avatar?: string;
};

export type PlaceInfo = {
  lat: number | string;
  lng: number | string;
  name: string;
  parkNum: string;
  fee: string;
  openTime: string;
  address?: string;
  placeId?: string;
  availablecar?: number;
  availablemotor?: number;
};

export type PlaceAvailable = {
  availablebus: number;
  availablecar: number;
  availablehandicap: number;
  availableheavymotor: number;
  availablemotor: number;
  id: string;
};

export type MerchPost = {
  concertId: string;
  content: string;
  passDay: string;
  passPlace: string;
  passState: string;
  passTime: string;
  qualify: string;
  userUID: string;
  image: string[];
  createdTime: { seconds: number; nanoseconds: number };
  userName?: string;
  concertName?: string;
  id: string;
  avatar?: string;
  item: string;
};

export type Personal = {
  avatar: string;
  userName: string;
  UID: string;
  id: string;
  keepIds?: string[];
};

export type Concerts = {
  concertName: string;
  date: string[];
  images: string;
  place: string;
  concertId: string;
  firstDay?: string;
  id: string;
  poster?: string;
  endDay: firebase.firestore.Timestamp;
};

export type Detail = {
  ticketPrice: string;
  ticketSaleTime: string[];
  ticketSaleWebsite: string;
  images: string;
};
