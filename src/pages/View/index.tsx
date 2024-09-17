import styled from "styled-components";
import Sections from "./Sections";
import Rows from "./Rows";
import Seat from "./Seat";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useReducer } from "react";
import Post from "./Post";

const Container = styled.div``;
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
`;
const Banner = styled.div`
  text-align: center;
  padding: 200px 0;
`;
const VenueTitle = styled.h2`
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 1rem;
`;
const VenueSubTitle = styled.h3`
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 5px;
`;
const Nav = styled.ul`
  background: #f8f8f8;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  margin-bottom: 42px;
`;
const NavItem = styled.li``;
const StyleLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 4px;
  color: #000;
  padding: 10px;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 55% 1fr;
`;
const PostVieBtn = styled.button`
  grid-column: span 2;
  display: block;
  margin: 0 auto 32px;
  font-size: 24px;
  font-weight: 600;
  padding: 12px 24px;
`;
export interface Comment {
  content?: string;
  userUID?: string;
  createdTime?: string;
  id: string;
}
export interface Post {
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
  viewPosts: Post[];
  viewComments: Comment[];
  selectPhoto: File | null;
  localPhotoUrl: string;
  uploadPhotoUrl: string;
  comment: { [key: string]: string };
  isLoading: boolean;
}

export type Action =
  | { type: "getAllSeats"; payload: { allSeats: Seats[] } }
  | { type: "selectSection"; payload: { section: string; rowSeats: number[]; isSelectRow: boolean } }
  | { type: "selectRow"; payload: { row: number; isSelectRow: boolean } }
  | { type: "selectSeat"; payload: { seat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: Post[] } }
  | { type: "setViewComments"; payload: { viewComments: Comment[]; id: string } }
  | { type: "togglePostClick" }
  | { type: "setSelectPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setUploadPhotoUrl"; payload: { uploadPhotoUrl: string } }
  | { type: "setComment"; payload: { commentText: string; id: string } }
  | { type: "isSelectSection" }
  | { type: "setLoading" };

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
      posts.forEach((post: Post) => {
        if (post.id === action.payload.id) {
          post.comment = action.payload.viewComments;
        }
        return post;
      });
      console.log(posts);

      return { ...state, viewPosts: posts };
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
    default:
      return state;
  }
};
function View() {
  const [state, dispatch] = useReducer(reducer, initial);
  console.log(state.comment);

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      const unsubscribes: (() => void)[] = [];
      const posts: object[] = [];

      // 監聽貼文變更

      const unsubscribePost = api.getViewPosts(state.section, state.row + 1, state.seat + 1, (updatedPosts: Post[]) => {
        // 獲取並更新貼文
        console.log(updatedPosts);
        posts.push(...updatedPosts);

        // 更新貼文狀態
        dispatch({ type: "setViewPosts", payload: { viewPosts: posts as Post[] } });

        // 針對每篇貼文監聽留言
        updatedPosts.forEach(async (post) => {
          const unsubscribe = api.getViewComments(post.id, (updatedComments: object[]) => {
            console.log(updatedComments);

            // 更新對應貼文的留言
            dispatch({ type: "setViewComments", payload: { viewComments: updatedComments as Post[], id: post.id } });
          });
          console.log(post);

          unsubscribes.push(await unsubscribe);
        });
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

  const handlerSection = async (section: string) => {
    const rows = await api.getRows(section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];

    dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, section: section, isSelectRow: false } });
  };

  const handlerSeat = async (seat: number) => {
    dispatch({ type: "selectSeat", payload: { seat: seat } });
  };

  const handlerComment = async (id: string) => {
    await api.setComment(id, state.comment[id]);
  };
  const sendImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: target.files[0], localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };

  return (
    <Container>
      <Mask postClick={state.isPostClick} />
      <Banner>
        <VenueTitle>臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/view">視角分享</StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-driving">交通資訊</StyleLink>
        </NavItem>
      </Nav>
      <Main>
        <PostVieBtn
          onClick={() => {
            dispatch({ type: "togglePostClick" });

            document.body.style.overflow = "hidden";
          }}
        >
          發佈視角
        </PostVieBtn>
        <Post state={state} dispatch={dispatch} sendImage={sendImage} />
        <Sections handlerSection={handlerSection} />
        <Rows state={state} dispatch={dispatch} />
        <Seat state={state} handlerSeat={handlerSeat} handlerComment={handlerComment} dispatch={dispatch} />
      </Main>
    </Container>
  );
}

export default View;
