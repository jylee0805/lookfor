import styled from "styled-components";
import leftEyes from "../../images/leftEyes.png";
import rightEyes from "../../images/rightEyes.png";
import Dialog from "../../components/Dialog";
import VenueHeader from "../../components/VenueHeader";
import Post from "./Post";
import Sections from "./Sections";
import Rows from "./Rows";
import Seat from "./Seat";
import api from "../../utils/api";
import Loading from "../../components/Loading";
import { OriginView, ViewPost, Comment } from "../../types";
import { useDialog } from "../../utils/useDialog";
import { useEffect, useReducer, useContext } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import { ComponentContext } from "../../utils/ComponentContextProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  padding: 0 30px;
`;
const Mask = styled.div<{ postClick: boolean }>`
  display: ${(props) => (props.postClick ? "block" : "none")};
  background: #3e3e3e99;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 15;
  backdrop-filter: blur(10px);
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
  width: 160px;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 15px;
  background: #fff8d6;
  color: #000;
  background-image: url("${leftEyes}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 90% 0;

  &:hover {
    background-image: url("${rightEyes}");
  }
  @media (max-width: 768px) {
    padding: 0 12px;
    height: 40px;
    width: 140px;
  }
  @media (max-width: 575px) {
    padding: 0 10px;
    height: 28px;
    width: 110px;
  }
`;
const PostVieBtnText = styled.span`
  display: block;
  padding: 8px 20px 8px 0;
`;

interface Seats {
  sectionName: string;
  row: number[];
}

export interface State {
  allSeats: Seats[];
  rowSeats: number[];
  selectedSection: string;
  selectedRow: number;
  selectedSeat: number;
  deleteViewId: string;
  viewPosts: ViewPost[];
  selectPhoto: File | null;
  localPhotoUrl: string;
  uploadPhotoUrl: string;
  comment: { [key: string]: string };
  commentEdit: string;
  postEdit: ViewPost;
  allPost: OriginView[];
  allRowPost: OriginView[];
  color: string;
  viewId: string;
  deleteCommentId: string;
  isLoading: boolean;
  isSelectRow: boolean;
  isSelectSection: boolean;
  isPostClick: boolean;
  isShowMask: boolean;
}

export type Action =
  | { type: "getAllSeats"; payload: { allSeats: Seats[] } }
  | { type: "selectSection"; payload: { selectedSection: string; rowSeats: number[]; isSelectRow: boolean } }
  | { type: "selectRow"; payload: { selectedRow: number; isSelectRow: boolean; selectedSeat: number } }
  | { type: "selectSeat"; payload: { selectedSeat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: ViewPost[] } }
  | { type: "togglePostClick"; payload: { isPostClick: boolean; isShowMask: boolean } }
  | { type: "setSelectPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setUploadPhotoUrl"; payload: { uploadPhotoUrl: string } }
  | { type: "setComment"; payload: { commentText: string; id: string } }
  | { type: "isSelectRow" }
  | { type: "setLoading"; payload: { isLoading: boolean } }
  | { type: "setCommentMode"; payload: { commentEdit: string } }
  | { type: "setPostMode"; payload: { postEdit: ViewPost; isPostClick: boolean; isShowMask: boolean } }
  | { type: "updatePostMode"; payload: { postEdit: ViewPost } }
  | { type: "setAllSectionPost"; payload: { allPost: OriginView[] } }
  | { type: "setAllRowPost"; payload: { allRowPost: OriginView[] } }
  | { type: "setColor"; payload: { color: string } }
  | { type: "setDeleteViewId"; payload: { deleteViewId: string } }
  | { type: "setDeleteComment"; payload: { viewId: string; deleteCommentId: string } }
  | { type: "setDefaultSeat"; payload: { rowSeats: number[]; selectedSection: string; isSelectSection: boolean; isSelectRow: boolean; selectedRow: number; selectedSeat: number } }
  | { type: "deletePost"; payload: { viewPosts: ViewPost[]; deleteViewId: string } }
  | { type: "editPost"; payload: { viewPosts: ViewPost[]; isLoading: boolean; isPostClick: boolean; isShowMask: boolean; selectPhoto: File | null; localPhotoUrl: string } }
  | {
      type: "resetPost";
      payload: {
        selectedSection: string;
        rowSeats: number[];
        isSelectRow: boolean;
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
  allSeats: [],
  rowSeats: [],
  selectedSection: "0",
  selectedRow: 0,
  selectedSeat: 0,
  isSelectRow: false,
  isSelectSection: false,
  viewPosts: [],
  isPostClick: false,
  deleteViewId: "",
  isShowMask: false,
  selectPhoto: null,
  localPhotoUrl: "",
  uploadPhotoUrl: "",
  comment: {},
  isLoading: false,
  commentEdit: "",
  postEdit: {} as ViewPost,
  allPost: [],
  allRowPost: [],
  color: "",
  viewId: "",
  deleteCommentId: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setDefaultSeat":
      return {
        ...state,
        rowSeats: action.payload.rowSeats,
        selectedSection: action.payload.selectedSection,
        isSelectSection: action.payload.isSelectSection,
        isSelectRow: action.payload.isSelectRow,
        selectedRow: action.payload.selectedRow,
        selectedSeat: action.payload.selectedSeat,
      };
    case "getAllSeats":
      return { ...state, allSeats: action.payload.allSeats };
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
    case "setUploadPhotoUrl":
      return { ...state, uploadPhotoUrl: action.payload.uploadPhotoUrl };
    case "setComment": {
      return { ...state, comment: { ...state.comment, [action.payload.id]: action.payload.commentText } };
    }
    case "setLoading": {
      return { ...state, isLoading: action.payload.isLoading };
    }
    case "setCommentMode": {
      return { ...state, commentEdit: action.payload.commentEdit };
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
    case "setColor": {
      return { ...state, color: action.payload.color };
    }
    case "setDeleteViewId": {
      return { ...state, deleteViewId: action.payload.deleteViewId };
    }
    case "setDeleteComment": {
      return { ...state, viewId: action.payload.viewId, deleteCommentId: action.payload.deleteCommentId };
    }
    case "editPost": {
      return {
        ...state,
        viewPosts: action.payload.viewPosts,
        isLoading: action.payload.isLoading,
        isPostClick: action.payload.isPostClick,
        isShowMask: action.payload.isShowMask,
        selectPhoto: action.payload.selectPhoto,
        localPhotoUrl: action.payload.localPhotoUrl,
      };
    }
    case "resetPost": {
      return {
        ...state,
        rowSeats: action.payload.rowSeats,
        selectedSection: action.payload.selectedSection,
        selectedRow: action.payload.selectedRow,
        isSelectRow: action.payload.isSelectRow,
        selectedSeat: action.payload.selectedSeat,
        isLoading: action.payload.isLoading,
        isPostClick: action.payload.isPostClick,
        isShowMask: action.payload.isShowMask,
        selectPhoto: action.payload.selectPhoto,
        localPhotoUrl: action.payload.localPhotoUrl,
      };
    }
    case "cancelPost": {
      return {
        ...state,
        postEdit: action.payload.postEdit,
        isPostClick: action.payload.isPostClick,
        isShowMask: action.payload.isShowMask,
        selectPhoto: action.payload.selectPhoto,
        localPhotoUrl: action.payload.localPhotoUrl,
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
  const componentContext = useContext(ComponentContext);
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribes: (() => void)[] = [];
      let posts: ViewPost[] = [];

      posts = JSON.parse(
        JSON.stringify(
          state.allPost.filter((post) => {
            console.log(post.section, state.selectedSection, post.row, state.selectedRow, post.seat, state.selectedSeat);
            return post.section === state.selectedSection && post.row - 1 === state.selectedRow && post.seat - 1 === state.selectedSeat;
          })
        )
      );
      console.log(posts);

      const fetchUserNames = async () => {
        const userNamesPromises = posts.map(async (post) => {
          if (post.userUID) {
            const user = await api.getUser(post.userUID);

            return { userName: user.userName, avatar: user.avatar };
          }
          return null;
        });
        const userNames = await Promise.all(userNamesPromises);

        return userNames;
      };

      fetchUserNames().then((userNames) => {
        posts.forEach((post, index) => {
          post.userName = userNames[index]?.userName;
          post.avatar = userNames[index]?.avatar;
        });
      });

      await Promise.all(
        posts.map(async (post) => {
          const unsubscribe = api.getViewComments(post.id, (updatedComments: Comment[]) => {
            console.log(updatedComments);
            const comments = JSON.parse(JSON.stringify(updatedComments));

            const fetchUserNames = async () => {
              const userNamesPromises = comments.map(async (comment: Comment) => {
                if (comment.userUID) {
                  const user = await api.getUser(comment.userUID);

                  return { userName: user.userName, avatar: user.avatar };
                }
                return null;
              });

              const userNames = await Promise.all(userNamesPromises);
              return userNames;
            };

            fetchUserNames().then((userNames) => {
              comments.forEach((comment: Comment, index: number) => {
                if (userNames[index]) {
                  comment.userName = userNames[index]?.userName || comment.userName;
                  comment.avatar = userNames[index]?.avatar || comment.avatar;
                }
              });
              post.comment = comments;
              dispatch({ type: "setViewPosts", payload: { viewPosts: [...posts] } });
            });
          });

          unsubscribes.push(await unsubscribe);
        })
      );

      dispatch({ type: "setViewPosts", payload: { viewPosts: posts } });

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [state.selectedSection, state.selectedRow, state.selectedSeat]);

  useEffect(() => {
    const getSeat = async () => {
      const rows = await api.getRows(section);
      const sectionAry: number[] = Array.isArray(rows) ? rows : [];
      dispatch({ type: "setDefaultSeat", payload: { rowSeats: sectionAry, selectedSection: section, isSelectSection: true, isSelectRow: true, selectedRow: row - 1, selectedSeat: seat - 1 } });
    };
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      componentContext?.setIsViewLoad(true);
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
      try {
        const allSection = (await api.getSections()) as Seats[];

        dispatch({ type: "getAllSeats", payload: { allSeats: allSection } });

        const unsubscribesPost: (() => void)[] = [];

        const unsubscribePost = api.getAllSectionViewPost(async (updatedPosts: OriginView[]) => {
          dispatch({ type: "setAllSectionPost", payload: { allPost: updatedPosts as OriginView[] } });
          console.log(updatedPosts);
        });

        unsubscribesPost.push(await unsubscribePost);

        return () => {
          unsubscribesPost.forEach((unsubscribe) => unsubscribe());
        };
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getAllSeats();
  }, [state.viewPosts]);

  const handlerSection = async (section: string) => {
    const rows = await api.getRows(section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];

    if (section === state.selectedSection) {
      dispatch({ type: "selectSection", payload: { rowSeats: [], selectedSection: "", isSelectRow: false } });
    } else {
      dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, selectedSection: section, isSelectRow: false } });
    }
  };

  const handlerComment = async (id: string) => {
    const response = (await api.getLoginState()) as string;
    const userName = await api.getUser(response);
    await api.setComment(id, state.comment[id], response, userName.userName);
    dispatch({ type: "setComment", payload: { id: id, commentText: "" } });
  };

  const sendImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: target.files[0], localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };

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
      <Mask postClick={state.isShowMask} />
      <Dialog isOpen={isOpen} title="您尚未登入" onConfirm={handleConfirm} onCancel={closeDialog} confirmText="前往登入">
        是否前往登入執行更多功能?
      </Dialog>
      {!componentContext?.isViewLoad && <Loading />}
      <VenueHeader />

      <Main>
        <Post state={state} dispatch={dispatch} sendImage={sendImage} />
        <SectionHeader>
          <Title>區域選擇</Title>
          <PostViewBtn onClick={() => handlePostClick()}>
            <PostVieBtnText>發佈視角</PostVieBtnText>
          </PostViewBtn>
        </SectionHeader>
        <Sections handlerSection={handlerSection} state={state} />
        <Rows state={state} dispatch={dispatch} />
        <Seat state={state} handlerComment={handlerComment} dispatch={dispatch} />
      </Main>
    </Container>
  );
}

export default View;
