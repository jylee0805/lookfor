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

export type ViewState = {
  rowSeats: number[];
  selectedSection: string;
  selectedRow: number;
  selectedSeat: number;
  viewPosts: ViewPost[];
  selectPhoto: File | null;
  localPhotoUrl: string;
  postEdit: ViewPost;
  allPost: OriginView[];
  allRowPost: OriginView[];
  isLoading: boolean;
  isSelectRow: boolean;
  isSelectSection: boolean;
  isPostClick: boolean;
  isShowMask: boolean;
};
export type ViewAction =
  | { type: "selectSection"; payload: { selectedSection: string; rowSeats: number[]; isSelectRow: boolean } }
  | { type: "selectRow"; payload: { selectedRow: number; isSelectRow: boolean; selectedSeat: number } }
  | { type: "selectSeat"; payload: { selectedSeat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: ViewPost[] } }
  | { type: "togglePostClick"; payload: { isPostClick: boolean; isShowMask: boolean } }
  | { type: "setSelectPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "isSelectRow" }
  | { type: "setLoading"; payload: { isLoading: boolean } }
  | { type: "setPostMode"; payload: { postEdit: ViewPost; isPostClick: boolean; isShowMask: boolean } }
  | { type: "updatePostMode"; payload: { postEdit: ViewPost } }
  | { type: "setAllSectionPost"; payload: { allPost: OriginView[] } }
  | { type: "setAllRowPost"; payload: { allRowPost: OriginView[] } }
  | { type: "setDefaultSeat"; payload: { rowSeats: number[]; selectedSection: string; isSelectSection: boolean; isSelectRow: boolean; selectedRow: number; selectedSeat: number } }
  | { type: "editPost"; payload: { viewPosts: ViewPost[]; isLoading: boolean; isPostClick: boolean; isShowMask: boolean; selectPhoto: File | null; localPhotoUrl: string } }
  | {
      type: "resetPost";
      payload: {
        selectedSection: string;
        rowSeats: number[];
        isSelectRow: boolean;
        isSelectSection: boolean;
        selectedRow: number;
        selectedSeat: number;
        isLoading: boolean;
        isPostClick: boolean;
        isShowMask: boolean;
        selectPhoto: File | null;
        localPhotoUrl: string;
      };
    }
  | { type: "cancelPost"; payload: { postEdit: ViewPost; isPostClick: boolean; isShowMask: boolean; selectPhoto: File | null; localPhotoUrl: string } };
