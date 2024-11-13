import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dialog from "../../components/Dialog";
import Loading from "../../components/Loading";
import { useDialog } from "../../hooks/useDialog";
import { OriginView, ViewAction, ViewPost, ViewState } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";
import { ViewContextProvider } from "../../utils/ViewContextProvider";
import Form from "./Form";
import Rows from "./Rows";
import Seat from "./Seats";
import Sections from "./Section";

const StyleAdd = styled(MdOutlineAdd)`
  font-size: 1.5rem;
  margin-right: 4px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  padding: 0 20px;
  @media (max-width: 575px) {
    padding: 0 10px;
  }
`;
const Main = styled.main`
  max-width: 75%;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 1280px) {
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const SectionHeader = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  @media (max-width: 575px) {
    padding: 0;
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
  @media (max-width: 575px) {
    font-size: 1.5rem;
  }
`;
const PostViewBtn = styled.button`
  display: flex;
  align-items: center;
  height: 45px;
  width: 140px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 15px;
  background: #ffffff;
  color: #000;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 0 12px;
    height: 40px;
    width: 140px;
  }
  @media (max-width: 575px) {
    height: 36px;
    width: 120px;
  }
`;
const PostVieBtnText = styled.span``;

const initial: ViewState = {
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

const reducer = (state: ViewState, action: ViewAction): ViewState => {
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

function View() {
  const navigate = useNavigate();
  const location = useLocation();
  const { section, row, seat } = location.state || {};
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const authContext = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initial);
  const [isViewLoad, setIsViewLoad] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSeat = async () => {
      const rows = await api.getRows(section);
      const sectionAry: number[] = Array.isArray(rows) ? rows : [];
      dispatch({ type: "setDefaultSeat", payload: { rowSeats: sectionAry, selectedSection: section, isSelectSection: true, isSelectRow: true, selectedRow: row - 1, selectedSeat: seat - 1 } });
    };
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      setIsViewLoad(true);
    }, 4000);
    const timerLink = setTimeout(() => {
      if (location.state) {
        getSeat();
      }
    }, 1);

    return () => {
      clearTimeout(timer);
      clearTimeout(timerLink);
    };
  }, []);

  useEffect(() => {
    const getAllSeats = async () => {
      const unsubscribesPost: (() => void)[] = [];

      const unsubscribePost = api.getAllSectionViewPost(async (updatedPosts: OriginView[]) => {
        dispatch({ type: "setAllSectionPost", payload: { allPost: updatedPosts as OriginView[] } });
      });

      unsubscribesPost.push(await unsubscribePost);

      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };
    getAllSeats();
  }, [state.viewPosts]);

  const handlePostClick = () => {
    if (authContext?.loginState === null || authContext?.loginState === undefined) {
      setIsOpen(true);
      return;
    }
    dispatch({ type: "togglePostClick", payload: { isPostClick: true, isShowMask: true } });
    document.body.style.overflowY = "hidden";
  };

  const handleConfirm = () => {
    navigate("/login");
    closeDialog();
  };

  return (
    <Container>
      <Dialog isOpen={isOpen} title="您尚未登入" onConfirm={handleConfirm} onCancel={closeDialog} confirmText="前往登入">
        是否前往登入執行更多功能?
      </Dialog>
      {!isViewLoad && <Loading />}

      <Main>
        <ViewContextProvider>
          <Form state={state} dispatch={dispatch} />
        </ViewContextProvider>
        <SectionHeader>
          <Title>區域選擇</Title>
          <PostViewBtn onClick={() => handlePostClick()}>
            <StyleAdd />
            <PostVieBtnText>發佈視角</PostVieBtnText>
          </PostViewBtn>
        </SectionHeader>
        <Sections state={state} dispatch={dispatch} sectionRef={sectionRef} />
        <Rows state={state} dispatch={dispatch} sectionRef={sectionRef} />
        <Seat state={state} dispatch={dispatch} />
      </Main>
    </Container>
  );
}

export default View;
