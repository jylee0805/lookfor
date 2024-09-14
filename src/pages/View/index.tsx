import styled from "styled-components";
import Sections from "./Sections";
import Rows from "./Rows";
import Seat from "./Seat";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useReducer } from "react";
import Post from "./Post";

const Container = styled.div``;
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

interface Post {
  image: string;
  note: string;
  content: string;
  id: string;
}
interface Comment {
  content: string;
  userUID: string;
}
interface State {
  allSeats: number[];
  section: string;
  row: number;
  seat: number;
  isSelectRow: boolean;
  isPostClick: boolean;
  viewPosts: Post[];
  viewComments: Comment[];
  selectPhoto: object;
  localPhotoUrl: string;
  uploadPhotoUrl: string;
}

export type Action =
  | { type: "getAllSeats"; payload: { allSeats: number[] } }
  | { type: "selectSection"; payload: { section: string } }
  | { type: "selectRow"; payload: { row: number } }
  | { type: "selectSeat"; payload: { seat: number } }
  | { type: "setViewPosts"; payload: { viewPosts: object[] } }
  | { type: "setViewComments"; payload: { viewComments: object[] } }
  | { type: "isSelectRow"; payload: { isSelectRow: boolean } }
  | { type: "togglePostClick" }
  | { type: "setSelectPhoto"; payload: { selectPhoto: object } }
  | { type: "setLocalPhotoUrl"; payload: { localPhotoUrl: string } }
  | { type: "setUploadPhotoUrl"; payload: { uploadPhotoUrl: string } };

const initial: State = {
  allSeats: [],
  section: "0",
  row: 0,
  seat: 0,
  isSelectRow: false,
  viewPosts: [],
  viewComments: [],
  isPostClick: false,
  selectPhoto: {},
  localPhotoUrl: "",
  uploadPhotoUrl: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "getAllSeats":
      return { ...state, allSeats: action.payload.allSeats };
    case "selectSection":
      return { ...state, section: action.payload.section };
    case "selectRow":
      return { ...state, row: action.payload.row };
    case "selectSeat":
      return { ...state, seat: action.payload.seat };
    case "setViewPosts":
      return { ...state, viewPosts: action.payload.viewPosts };
    case "setViewComments":
      return { ...state, viewComments: action.payload.viewComments };
    case "isSelectRow":
      return { ...state, isSelectRow: true };
    case "togglePostClick":
      return { ...state, isPostClick: !state.isPostClick };
    case "setSelectPhoto":
      return { ...state, selectPhoto: action.payload.selectPhoto };
    case "setLocalPhotoUrl":
      return { ...state, localPhotoUrl: action.payload.localPhotoUrl };
    case "setUploadPhotoUrl":
      return { ...state, uploadPhotoUrl: action.payload.uploadPhotoUrl };
  }
};
function View() {
  const [state, dispatch] = useReducer(reducer, initial);

  /*useEffect(() => {
    api.getViewComments();
    dispatch({ type: "setViewComments", payload: { viewComments: queryViewComments } });
  }, []);*/

  useEffect(() => {
    const loadViewPosts = async () => {
      // 获取帖子列表
      const queryViewPosts = await api.getViewPosts(state.section, state.row + 1, state.seat + 1);

      // 保存所有取消订阅的函数
      const unsubscribes: (() => void)[] = [];

      queryViewPosts.forEach((post: Post) => {
        // 为每个帖子创建一个监听器
        const unsubscribe = api.getViewComments(post.id, (updatedComments) => {
          console.log("Comments for post", post.id, ":", updatedComments);
          dispatch({ type: "setViewComments", payload: { viewComments: updatedComments } });
        });

        unsubscribes.push(unsubscribe);
      });

      // 在组件卸载时，取消所有的监听器
      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [state.section, state.row, state.seat]);
  const handlerSection = async (section: string) => {
    console.log(section);

    const rows = await api.getRows(section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];
    dispatch({ type: "getAllSeats", payload: { allSeats: sectionAry } });
    dispatch({ type: "selectSection", payload: { section: section } });
  };

  const handlerSeat = async (seat: number) => {
    console.log(seat);

    const queryViewPosts = await api.getViewPosts(state.section, state.row + 1, seat + 1);

    /*const queryViewComments = (
      await Promise.all(
        queryViewPosts.map(async (post) => {
          const comments = await api.getViewComments(post.id);
          console.log(comments);
          return comments;
        })
      )
    ).reduce((acc, val) => acc.concat(val), []);*/

    dispatch({ type: "setViewPosts", payload: { viewPosts: queryViewPosts } });
    //dispatch({ type: "setViewComments", payload: { viewComments: queryViewComments } });
  };

  const handlerComment = async (id: string, content: string) => {
    await api.setComment(id, content);
  };
  const sendImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      console.log(URL.createObjectURL(target.files[0]));
      console.log(typeof target.files[0], target.files[0]);
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: target.files[0] } });
      dispatch({ type: "setLocalPhotoUrl", payload: { localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };
  return (
    <Container>
      <Banner>
        <VenueTitle>臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/">視角分享</StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/">交通資訊</StyleLink>
        </NavItem>
      </Nav>
      <Main>
        <PostVieBtn onClick={() => dispatch({ type: "togglePostClick" })}>發佈視角</PostVieBtn>
        <Post state={state} dispatch={dispatch} sendImage={sendImage} />
        <Sections handlerSection={handlerSection} />
        <Rows state={state} dispatch={dispatch} />
        <Seat state={state} handlerSeat={handlerSeat} handlerComment={handlerComment} />
      </Main>
    </Container>
  );
}

export default View;
