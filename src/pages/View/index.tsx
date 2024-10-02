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
import { MdOutlineAdd } from "react-icons/md";

const StyleAdd = styled(MdOutlineAdd)`
  font-size: 24px;
  margin-left: 12px;
  margin-right: 4px;
`;
const Container = styled.div`
  width: 100%;
  max-width: 100vw; /* 確保容器寬度不超出螢幕 */
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
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const Main = styled.main`
  max-width: 80%;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 60% 1fr;
  @media (max-width: 1280px) {
    max-width: 100%;
    width: 100%;
    grid-template-columns: 65% 1fr;
  }
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const PostViewBtn = styled.button`
  grid-column: span 2;
  display: flex;
  align-items: center;
  margin: 0 auto 40px auto;

  font-size: 1.5rem;
  font-weight: 600;
  padding: 0;
  background: transparent;
  color: white;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 40px auto 30px auto;
  }
  &:hover {
    border: 2px solid transparent;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #222, #222), linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
  }

  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;

const PostVieBtnText = styled.span`
  display: block;
  padding: 8px 20px 8px 0;
  /* &:hover {
    background: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
    background-clip: text;
    background-clip: text;
    color: transparent;
  } */
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

interface State {
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
}

export type Action =
  | { type: "getAllSeats"; payload: { allSeats: Seats[] } }
  | { type: "selectSection"; payload: { section: string; rowSeats: number[]; isSelectRow: boolean } }
  | { type: "selectRow"; payload: { row: number; isSelectRow: boolean } }
  | { type: "selectSeat"; payload: { seat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: PostState[] } }
  | { type: "setViewComments"; payload: { viewComments: Comment[]; id: string } }
  | { type: "togglePostClick" }
  | { type: "setSelectPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setUploadPhotoUrl"; payload: { uploadPhotoUrl: string } }
  | { type: "setComment"; payload: { commentText: string; id: string } }
  | { type: "isSelectSection" }
  | { type: "setLoading" }
  | { type: "toggleCommentMode"; payload: { isCommentEditMode: string } }
  | { type: "setPostMode"; payload: { isPostEditMode: PostState } };

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
    case "togglePostClick":
      return { ...state, isPostClick: !state.isPostClick };
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
    default:
      return state;
  }
};
function View() {
  const [state, dispatch] = useReducer(reducer, initial);
  const authContext = useContext(AuthContext);

  const componentContext = useContext(ComponentContext);

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
    const getAllSeats = async () => {
      const allSection = (await api.getSections()) as Seats[];

      dispatch({ type: "getAllSeats", payload: { allSeats: allSection } });
    };
    getAllSeats();

    return () => {
      getAllSeats();
    };
  }, []);

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

    dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, section: section, isSelectRow: false } });
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
      document.body.style.overflow = "hidden";
      return;
    }

    dispatch({ type: "togglePostClick" });
    document.body.style.overflow = "hidden";
  };

  return (
    <Container>
      <Mask postClick={state.isPostClick} />
      <LoginDialog />
      <VenueHeader />
      <Main>
        <PostViewBtn onClick={() => handlePostClick()}>
          <StyleAdd />
          <PostVieBtnText>發佈視角</PostVieBtnText>
        </PostViewBtn>
        <Post state={state} dispatch={dispatch} sendImage={sendImage} />
        <Sections handlerSection={handlerSection} />
        <Rows state={state} dispatch={dispatch} />
        <Seat state={state} handlerComment={handlerComment} dispatch={dispatch} deletePost={deletePost} deleteComment={deleteComment} />
      </Main>
    </Container>
  );
}

export default View;
