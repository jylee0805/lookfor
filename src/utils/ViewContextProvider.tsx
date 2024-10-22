import { createContext, useReducer, useRef } from "react";
import { FieldErrors, useForm, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetError, UseFormWatch } from "react-hook-form";
import { OriginView, ViewPost } from "../types";

export interface State {
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
}
export type Action =
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

const initial: State = {
  rowSeats: [],
  selectedSection: "0",
  selectedRow: 0,
  selectedSeat: 0,
  isSelectRow: false,
  isSelectSection: false,
  viewPosts: [],
  isPostClick: false,
  isShowMask: false,
  selectPhoto: null,
  localPhotoUrl: "",
  isLoading: false,
  postEdit: {} as ViewPost,
  allPost: [],
  allRowPost: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setDefaultSeat":
      return {
        ...state,
        ...action.payload,
      };
    case "selectSection":
      return { ...state, selectedSection: action.payload.selectedSection, rowSeats: action.payload.rowSeats, isSelectRow: action.payload.isSelectRow, isSelectSection: true };
    case "selectRow":
      return { ...state, selectedRow: action.payload.selectedRow, isSelectRow: action.payload.isSelectRow, selectedSeat: action.payload.selectedSeat };
    case "selectSeat":
      return { ...state, selectedSeat: action.payload.selectedSeat };
    case "setViewPosts":
      return { ...state, viewPosts: action.payload.viewPosts };
    case "isSelectRow":
      return { ...state, isSelectRow: false };
    case "togglePostClick":
      return { ...state, isPostClick: action.payload.isPostClick, isShowMask: action.payload.isShowMask };
    case "setSelectPhoto":
      return { ...state, selectPhoto: action.payload.selectPhoto, localPhotoUrl: action.payload.localPhotoUrl };
    case "setLoading": {
      return { ...state, isLoading: action.payload.isLoading };
    }
    case "setPostMode": {
      return { ...state, postEdit: action.payload.postEdit, isPostClick: action.payload.isPostClick, isShowMask: action.payload.isShowMask };
    }
    case "updatePostMode": {
      return { ...state, postEdit: action.payload.postEdit };
    }
    case "setAllSectionPost": {
      return { ...state, allPost: action.payload.allPost };
    }
    case "setAllRowPost": {
      return { ...state, allRowPost: action.payload.allRowPost };
    }
    case "editPost": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "resetPost": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "cancelPost": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export interface FormInputs {
  section: string;
  row: string;
  seat: string;
  concert: string;
  note: string;
  content: string;
  image: object;
}
export interface ViewContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  sectionRef: React.RefObject<HTMLDivElement>;

  register: UseFormRegister<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  reset: UseFormReset<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  getValues: UseFormGetValues<FormInputs>;
  setError: UseFormSetError<FormInputs>;
  formState: {
    errors: FieldErrors<FormInputs>;
  };
}

export const ViewContext = createContext<ViewContextType>({} as ViewContextType);

export function ViewContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormInputs>();
  return <ViewContext.Provider value={{ register, handleSubmit, reset, watch, getValues, formState: { errors }, setError, state, dispatch, sectionRef }}>{children}</ViewContext.Provider>;
}
