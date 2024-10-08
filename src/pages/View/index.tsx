import styled from "styled-components";
import Sections from "./Sections";
import Rows from "./Rows";
import Seat from "./Seat";
import api from "../../utils/api";
import { useEffect, useReducer, useContext } from "react";
import Post from "./Post";
import { AuthContext } from "../../utils/AuthContextProvider";
import { ComponentContext } from "../../utils/ComponentContextProvider";
import VenueHeader from "../../components/VenueHeader";
import LoginDialog from "../../components/LoginDialog";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import leftEyes from "../../images/leftEyes.png";
import rightEyes from "../../images/rightEyes.png";

const Container = styled.div`
  width: 100%;
  max-width: 100vw; /* 確保容器寬度不超出螢幕 */
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
  /* display: grid;
  grid-template-columns: 65% 1fr; */

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
  max-width: 100vw; /* 確保容器寬度不超出螢幕 */
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  @media (max-width: 575px) {
    padding: 0;
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
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
  @media (max-width: 575px) {
    font-size: 1.5rem;
  }
`;
const PostVieBtnText = styled.span`
  display: block;
  padding: 8px 20px 8px 0;
`;
export interface Comment {
  content?: string;
  userUID?: string;
  createdTime?: string;
  id: string;
  userName?: string;
  avatar?: string;
}
export interface PostState {
  image?: string;
  note?: string;
  content?: string;
  id: string;
  comment?: Comment[];
  concert?: string;
  createdTime?: string;
  row?: number;
  seat?: number;
  section?: string;
  userUID?: string;
  userName?: string;
  avatar?: string;
}

interface Seats {
  sectionName: string;
  row: number[];
}

export interface State {
  allSeats: Seats[];
  rowSeats: number[];
  section: string;
  row: number;
  seat: number;
  isSelectRow: boolean;
  isSelectSection: boolean;
  isPostClick: boolean;
  viewPosts: PostState[];
  viewComments: Comment[];
  selectPhoto: File | null;
  localPhotoUrl: string;
  uploadPhotoUrl: string;
  comment: { [key: string]: string };
  isLoading: boolean;
  isCommentEditMode: string;
  isPostEditMode: PostState;
  allSectionPost: AllPost[] | undefined;
  allRowPost: AllPost[] | undefined;
  color: string;
}
export interface AllPost {
  row: number;
  seat: number;
  section: string;
  img: string;
}

export type Action =
  | { type: "getAllSeats"; payload: { allSeats: Seats[] } }
  | { type: "selectSection"; payload: { section: string; rowSeats: number[]; isSelectRow: boolean } }
  | { type: "selectRow"; payload: { row: number; isSelectRow: boolean } }
  | { type: "selectSeat"; payload: { seat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: PostState[] } }
  | { type: "setViewComments"; payload: { viewComments: Comment[]; id: string } }
  | { type: "togglePostClick"; payload: { isPostClick: boolean } }
  | { type: "setSelectPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setUploadPhotoUrl"; payload: { uploadPhotoUrl: string } }
  | { type: "setComment"; payload: { commentText: string; id: string } }
  | { type: "isSelectSection" }
  | { type: "isSelectRow" }
  | { type: "setLoading" }
  | { type: "toggleCommentMode"; payload: { isCommentEditMode: string } }
  | { type: "setPostMode"; payload: { isPostEditMode: PostState } }
  | { type: "setAllSectionPost"; payload: { allSectionPost: AllPost[] } }
  | { type: "setAllRowPost"; payload: { allRowPost: AllPost[] } }
  | { type: "setUserPost"; payload: { section: string; row: number; seat: number } }
  | { type: "setColor"; payload: { color: string } };

const initial: State = {
  allSeats: [],
  rowSeats: [],
  section: "0",
  row: 0,
  seat: 0,
  isSelectRow: false,
  isSelectSection: false,
  viewPosts: [],
  viewComments: [],
  isPostClick: false,
  selectPhoto: null,
  localPhotoUrl: "",
  uploadPhotoUrl: "",
  comment: {},
  isLoading: false,
  isCommentEditMode: "",
  isPostEditMode: { id: "" },
  allSectionPost: [],
  allRowPost: [],
  color: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "getAllSeats":
      return { ...state, allSeats: action.payload.allSeats };
    case "selectSection":
      return { ...state, section: action.payload.section, rowSeats: action.payload.rowSeats, isSelectRow: action.payload.isSelectRow, isSelectSection: true };
    case "selectRow":
      return { ...state, row: action.payload.row, isSelectRow: action.payload.isSelectRow };
    case "selectSeat":
      return { ...state, seat: action.payload.seat };
    case "setViewPosts":
      return { ...state, viewPosts: action.payload.viewPosts };
    case "setViewComments": {
      const posts = JSON.parse(JSON.stringify(state.viewPosts));
      console.log(state.viewPosts);

      const updatedPosts = posts.map((post: PostState, index: number) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            comment: action.payload.viewComments,
          };
        }

        return state.viewPosts[index];
      });

      return { ...state, viewPosts: updatedPosts };
    }
    case "isSelectSection":
      return { ...state, isSelectSection: true };
    case "isSelectRow":
      return { ...state, isSelectRow: false };
    case "togglePostClick":
      return { ...state, isPostClick: action.payload.isPostClick };
    case "setSelectPhoto":
      return { ...state, selectPhoto: action.payload.selectPhoto, localPhotoUrl: action.payload.localPhotoUrl };
    case "setUploadPhotoUrl":
      return { ...state, uploadPhotoUrl: action.payload.uploadPhotoUrl };
    case "setComment": {
      return { ...state, comment: { ...state.comment, [action.payload.id]: action.payload.commentText } };
    }
    case "setLoading": {
      return { ...state, isLoading: !state.isLoading };
    }
    case "toggleCommentMode": {
      return { ...state, isCommentEditMode: action.payload.isCommentEditMode };
    }
    case "setPostMode": {
      return { ...state, isPostEditMode: action.payload.isPostEditMode };
    }
    case "setAllSectionPost": {
      return { ...state, allSectionPost: action.payload.allSectionPost };
    }
    case "setAllRowPost": {
      return { ...state, allRowPost: action.payload.allRowPost };
    }
    case "setUserPost": {
      return { ...state, section: action.payload.section, row: action.payload.row, seat: action.payload.seat, isSelectSection: true, isSelectRow: true };
    }
    case "setColor": {
      return { ...state, color: action.payload.color };
    }
    default:
      return state;
  }
};
function View() {
  const [state, dispatch] = useReducer(reducer, initial);
  const authContext = useContext(AuthContext);

  const componentContext = useContext(ComponentContext);

  const location = useLocation();
  const { section, row, seat } = location.state || {};

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      const unsubscribes: (() => void)[] = [];
      let posts: PostState[] = [];

      // 監聽貼文變更

      const unsubscribePost = api.getViewPosts(state.section, state.row + 1, state.seat + 1, async (updatedPosts: PostState[]) => {
        posts = JSON.parse(JSON.stringify(updatedPosts));

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
              console.log(comments);

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
                    console.log(`Updated comment: ${index}`, comment); // 確認每個 comment 的更新
                  }
                });
                post.comment = comments;
                dispatch({ type: "setViewPosts", payload: { viewPosts: [...posts] } });
              });
            });

            unsubscribes.push(await unsubscribe);
          })
        );

        console.log(posts);

        dispatch({ type: "setViewPosts", payload: { viewPosts: posts } });
      });

      unsubscribesPost.push(await unsubscribePost);

      // 清除訂閱
      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [state.section, state.row, state.seat]);

  useEffect(() => {
    const getSeat = async () => {
      const rows = await api.getRows(section);
      const sectionAry: number[] = Array.isArray(rows) ? rows : [];
      dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, section: section, isSelectRow: false } });
      dispatch({ type: "selectRow", payload: { row: row - 1, isSelectRow: true } });
      dispatch({ type: "selectSeat", payload: { seat: seat - 1 } });
    };
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      componentContext?.setIsViewLoad(true);
    }, 4000);
    if (location.state) {
      getSeat();
    }
    // 清除定时器，避免内存泄漏
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getAllSeats = async () => {
      try {
        const allSection = (await api.getSections()) as Seats[];
        console.log(allSection);
        dispatch({ type: "getAllSeats", payload: { allSeats: allSection } });

        const allView = await api.getAllSectionViewPost();
        console.log(allView);
        dispatch({ type: "setAllSectionPost", payload: { allSectionPost: allView as AllPost[] } });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getAllSeats();
  }, [state.viewPosts]);

  const deletePost = async (id: string) => {
    await api.deleteViewPost(id);
    dispatch({ type: "setViewPosts", payload: { viewPosts: state.viewPosts.filter((post) => post.id !== id) } });
  };

  const deleteComment = async (post: string, id: string) => {
    console.log(post, id);

    await api.deleteComment(post, id);
    dispatch({ type: "setViewPosts", payload: { viewPosts: state.viewPosts.map((post) => ({ ...post, comment: post.comment?.filter((comment) => comment.id !== id) })) } });
  };

  const handlerSection = async (section: string) => {
    const rows = await api.getRows(section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];

    if (section === state.section) {
      dispatch({ type: "selectSection", payload: { rowSeats: [], section: "", isSelectRow: false } });
    } else {
      dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, section: section, isSelectRow: false } });
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
      componentContext?.setIsDialogOpen(true);
      return;
    }

    dispatch({ type: "togglePostClick", payload: { isPostClick: true } });
    document.body.style.overflowY = "hidden";
  };

  return (
    <Container>
      <Mask postClick={(state.isPostClick || componentContext?.isDialogOpen) ?? false} />
      <LoginDialog />

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
        <Seat state={state} handlerComment={handlerComment} dispatch={dispatch} deletePost={deletePost} deleteComment={deleteComment} />
      </Main>
    </Container>
  );
}

export default View;
