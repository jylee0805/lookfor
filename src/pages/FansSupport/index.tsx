import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useReducer, useContext, useRef } from "react";
import FanPost from "./FanPost";
import { Concerts } from "../../types";
import { ConcertContext } from "../../utils/ConcertContextProvider";
import "react-photo-view/dist/react-photo-view.css";
import { MerchPost, Personal } from "../../types";
import PostList from "./PostList";
import PostFeature from "./PostFeature";

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 95%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const ConcertName = styled.h3`
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
`;
const BtnBox = styled.div`
  border-radius: 50px;
  box-shadow: 0 4px 4px #00000025;
  padding: 6px 30px;
  width: 360px;
  text-align: center;
  margin: 0 auto 30px;
  border: 2px solid #fff;

  @media (max-width: 575px) {
    width: 320px;
    padding: 6px 10px;
  }
`;
const PageBtn = styled(Link)`
  background: none;
  border: none;
  display: inline-block;
  padding: 5px 0px;
  width: 50%;
  font-weight: 700;
  color: #fff;
  &:hover {
    color: rgb(255, 98, 19);
  }
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

const Content = styled.div`
  width: 75%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export interface State {
  postData: MerchPost[];
  localPhotoUrl: string[];
  upLoadPhotoUrl: string[];
  selectPhotos: File[] | null;
  sort: string;
  isEditMode: MerchPost;
  isPostClick: boolean;
  uploadUrl: string[];
  deleteId: string;
  users: Personal[];
}
export type Action =
  | { type: "setPostData"; payload: { postData: MerchPost[] } }
  | { type: "setLocalPhotoUrl"; payload: { localPhotoUrl: string[]; selectPhotos: File[] } }
  | { type: "setUpLoadPhotoUrl"; payload: { upLoadPhotoUrl: string[] } }
  | { type: "setSort"; payload: { sort: string; postData: MerchPost[] } }
  | { type: "toggleIsPostClick"; payload: { isPostClick: boolean } }
  | { type: "toggleIsEditMode"; payload: { isEditMode: MerchPost; isPostClick: boolean } }
  | { type: "setDeleteId"; payload: { deleteId: string } }
  | { type: "setUsers"; payload: { users: Personal[] } };

const initial: State = {
  postData: [],
  localPhotoUrl: [],
  upLoadPhotoUrl: [],
  selectPhotos: null,
  sort: "createdTime",
  isEditMode: {} as MerchPost,
  isPostClick: false,
  uploadUrl: [],
  deleteId: "",
  users: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setPostData":
      return { ...state, postData: action.payload.postData };
    case "setLocalPhotoUrl":
      return { ...state, localPhotoUrl: action.payload.localPhotoUrl, selectPhotos: action.payload.selectPhotos };
    case "setUpLoadPhotoUrl":
      return { ...state, upLoadPhotoUrl: action.payload.upLoadPhotoUrl };
    case "setSort":
      return { ...state, sort: action.payload.sort, postData: action.payload.postData };
    case "toggleIsPostClick":
      return { ...state, isPostClick: action.payload.isPostClick };
    case "toggleIsEditMode":
      return { ...state, isEditMode: action.payload.isEditMode, isPostClick: action.payload.isPostClick };
    case "setDeleteId":
      return { ...state, deleteId: action.payload.deleteId };
    case "setUsers":
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};

function FansSupport() {
  const location = useLocation();
  const concertContext = useContext(ConcertContext);
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const [state, dispatch] = useReducer(reducer, initial);
  const targetRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      let posts: MerchPost[] = [];

      const userList = await api.getUsers();
      dispatch({ type: "setUsers", payload: { users: userList } });

      const unsubscribePost = api.getMerchPost(concertId, (updatedPosts: MerchPost[]) => {
        posts = JSON.parse(JSON.stringify(updatedPosts));
        const fetchUserNames = async () => {
          const usersPromises = posts.map(async (post) => {
            if (post.userUID) {
              const user = await api.getUser(post.userUID);
              return { userName: user.userName, avatar: user.avatar };
            }
            return null;
          });
          const users = await Promise.all(usersPromises);
          return users;
        };

        fetchUserNames().then((userNames) => {
          posts.forEach((post, index) => {
            post.userName = userNames[index]?.userName;
            post.avatar = userNames[index]?.avatar;
          });
          dispatch({ type: "setPostData", payload: { postData: posts } });
        });
      });

      unsubscribesPost.push(await unsubscribePost);

      return () => unsubscribesPost.forEach((unsubscribe) => unsubscribe());
    };

    if (!concertContext?.concertId) concertContext?.setConcertId(concertId);
    loadViewPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targetId = location.hash.slice(1);
      const targetIndex = state.postData.findIndex((post) => post.id === targetId);

      if (targetIndex >= 0 && targetRef.current[targetIndex]) {
        targetRef.current[targetIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    };
    // if (location.hash) handleScroll();
    const timeoutId = setTimeout(() => {
      if (location.hash) handleScroll();
    }, 1000);
    document.body.style.overflow = "auto";
    return () => clearTimeout(timeoutId);
  }, [location, state.postData]);

  return (
    <Container>
      <ConcertName>{concertContext?.concertData.concertName}</ConcertName>
      <BtnBox>
        <PageBtn to={`/concert?concert=${concertId}`}>演唱會資訊</PageBtn>
        <PageBtn to={`/fanssupport?concert=${concertId}`}>應援物發放資訊</PageBtn>
      </BtnBox>
      <Mask postClick={state.isPostClick} />
      <Content>
        <PostFeature dispatch={dispatch} state={state} />
        <FanPost concert={concertContext?.concertData as Concerts} dispatch={dispatch} state={state} />
        <PostList state={state} dispatch={dispatch} targetRef={targetRef} />
      </Content>
    </Container>
  );
}

export default FansSupport;
