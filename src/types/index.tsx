import firebase from "firebase/compat/app";

export interface Notify {
  message: string;
  createdTime: { seconds: number };
  isRead: boolean;
  title: string;
  id?: string;
  postId: string;
  concertId: string;
}

export interface OriginView {
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
}

export interface ViewPost {
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
}

export interface Comment {
  content: string;
  userUID: string;
  createdTime: string;
  id: string;
  userName?: string;
  avatar?: string;
}
export interface Seats {
  sectionName: string;
  row: number[];
}

export interface PlaceInfo {
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
}

export interface PlaceAvailable {
  availablebus: number;
  availablecar: number;
  availablehandicap: number;
  availableheavymotor: number;
  availablemotor: number;
  id: string;
}

export interface MerchPost {
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
  id?: string;
  avatar?: string;
  item: string;
}

export interface Personal {
  avatar: string;
  userName: string;
  UID: string;
  id: string;
  keepIds?: string[];
}

export interface Concerts {
  concertName: string;
  date: string[];
  images: string;
  place: string;
  concertId: string;
  firstDay?: string;
  id: string;
  poster?: string;
  endDay: firebase.firestore.Timestamp;
}

export interface Detail {
  ticketPrice: string;
  ticketSaleTime: string[];
  ticketSaleWebsite: string;
  images: string;
}
