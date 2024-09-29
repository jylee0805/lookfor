import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { useEffect, useReducer, useState, useContext } from "react";
import photo from "../../images/avatar.jpg";
import FanPost from "./FanPost";
import { AuthContext } from "../../utils/AuthContextProvider";
import { Concerts } from "../ConcertList";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Profile } from "../../utils/AuthContextProvider";

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

const Content = styled.div<{ changePage: string }>`
  display: ${(props) => (props.changePage === "fanSupport" ? "block" : "none")};
  width: 75%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const FeatureBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  margin-left: auto;
`;
const SortBtn = styled.button`
  display: flex;
  align-items: center;
`;
const CreateBtn = styled.button`
  display: flex;
  align-items: center;
`;
const PostList = styled.ul``;
const PostItem = styled.li`
  position: relative;
  padding: 40px 0;
  & + &::before {
    content: "";
    height: 1px;
    width: 100%;
    background: #8d8d8d;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const MoreContainer = styled.div`
  position: relative;
  margin-left: auto;
`;
const MoreBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
`;
const FeatureBtnContainer = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 3px 10px #67676730;
  right: 0;
  width: 100px;
  border-radius: 10px;
`;
const FeatureBtn = styled.button`
  background: none;
  transition: none;
  border: none;
  &:hover {
    border: none;
    transition: none;
  }
`;
const HeadShot = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
  @media (max-width: 575px) {
    width: 35px;
    height: 35px;
  }
`;
const UserName = styled.p`
  font-size: 1.2rem;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;
const ImportInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  row-gap: 5px;
  width: 40%;
  margin-bottom: 10px;
  color: #9c9c9c;
  font-weight: 700;
  @media (max-width: 992px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 60%;
  }
  @media (max-width: 575px) {
    font-size: 1rem;
    width: 90%;
  }
`;
const ImportInfoContent = styled.p`
  font-size: 1rem;
`;

const InfoContent = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
  width: 240px;
`;

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
  id?: string;
}

export interface State {
  postData: MerchPost[];
  localPhotoUrl: string[];
  upLoadPhotoUrl: string[];
  selectPhotos: File[] | null;
  sort: string;
  isEditMode: MerchPost;
  isPostClick: boolean;
  uploadUrl: string[];
}
export type Action =
  | { type: "setPostData"; payload: { postData: MerchPost[] } }
  | { type: "setLocalPhotoUrl"; payload: { localPhotoUrl: string[]; selectPhotos: File[] } }
  | { type: "setUpLoadPhotoUrl"; payload: { upLoadPhotoUrl: string[] } }
  | { type: "setSort"; payload: { sort: string; postData: MerchPost[] } }
  | { type: "toggleIsPostClick"; payload: { isPostClick: boolean } }
  | { type: "toggleIsEditMode"; payload: { isEditMode: MerchPost; isPostClick: boolean } };

const initial: State = {
  postData: [],
  localPhotoUrl: [],
  upLoadPhotoUrl: [],
  selectPhotos: null,
  sort: "createdTime",
  isEditMode: {
    concertId: "",
    content: "",
    passDay: "",
    passPlace: "",
    passState: "",
    passTime: "",
    qualify: "",
    userUID: "",
    image: [],
    createdTime: { seconds: 0, nanoseconds: 0 },
  },
  isPostClick: false,
  uploadUrl: [],
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
    default:
      return state;
  }
};

interface Props {
  changePage: string;
  concert: Concerts;
}

function FansSupport({ changePage, concert }: Props) {
  // const queryParams = new URLSearchParams(window.location.search);
  // const concertId = queryParams.get("concert") || "";
  const [state, dispatch] = useReducer(reducer, initial);

  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      let posts: MerchPost[] = [];

      const unsubscribePost = api.getMerchPost(concert.id, (updatedPosts: MerchPost[]) => {
        posts = JSON.parse(JSON.stringify(updatedPosts));

        const fetchUserNames = async () => {
          const userNamesPromises = posts.map(async (post) => {
            if (post.userUID) {
              const userName = await api.getUser(post.userUID);

              return userName.userName;
            }
            return null;
          });
          const userNames = await Promise.all(userNamesPromises);
          return userNames;
        };

        fetchUserNames().then((userNames) => {
          posts.forEach((post, index) => {
            post.userName = userNames[index];
          });
          dispatch({ type: "setPostData", payload: { postData: posts } });
        });
      });

      unsubscribesPost.push(await unsubscribePost);

      // 清除訂閱
      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, []);

  const deleteMerchPost = async (id: string) => {
    if (id) {
      await api.deleteMerchPost(id);
    }
    dispatch({ type: "setPostData", payload: { postData: state.postData.filter((post) => post.id != id) } });
  };
  const handleSort = () => {
    if (state.sort === "createdTime") {
      const sort = [...state.postData].sort((a, b) => {
        const dayDifference = a.passDay.localeCompare(b.passDay);
        console.log(dayDifference);

        if (dayDifference !== 0) {
          return dayDifference;
        }
        return a.passTime.localeCompare(b.passTime);
      });
      dispatch({ type: "setSort", payload: { sort: "passTime", postData: sort } });
    } else {
      const sort = [...state.postData].sort((a, b) => {
        console.log(a.createdTime.seconds);

        return b.createdTime.seconds - a.createdTime.seconds;
      });
      console.log(sort);

      dispatch({ type: "setSort", payload: { sort: "createdTime", postData: sort } });
    }
  };

  const handlePostClick = () => {
    console.log(authContext?.loginState);

    if (authContext?.loginState === null || authContext?.loginState === undefined) {
      alert("請先登入");
      navigate("/login");
      return;
    }
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: true } });
  };

  const handleKeep = async (id: string) => {
    console.log(id);

    if (authContext?.user.keepIds?.includes(id)) {
      authContext.setUser((prev) => {
        api.updateUser(authContext?.user.id, { UID: prev.UID, avatar: prev.avatar, userName: prev.userName, keepIds: prev.keepIds?.filter((item) => item !== id) });
        return { ...prev, keepIds: prev.keepIds?.filter((item) => item !== id) };
      });
      console.log(authContext.user);
    } else if (authContext?.user.keepIds === undefined || authContext?.user.keepIds?.includes(id) === false) {
      authContext?.setUser((prev: Profile) => {
        const updatedKeepIds = prev.keepIds ? [...prev.keepIds, id] : [id];
        api.setKeepPost(authContext?.loginState as string, id);
        return { ...prev, keepIds: updatedKeepIds };
      });
    }
  };
  return (
    <>
      <Mask postClick={state.isPostClick} />
      <Content changePage={changePage}>
        <FeatureBox>
          <SortBtn onClick={() => handleSort()}>
            <FilterListIcon />
            {state.sort === "createdTime" ? "依發放時間排序" : "依貼文發布時間排序"}
          </SortBtn>
          <CreateBtn onClick={() => handlePostClick()}>
            <AddIcon />
            發佈資訊
          </CreateBtn>
        </FeatureBox>
        <FanPost concert={concert} dispatch={dispatch} state={state} />
        <PostList>
          {state.postData &&
            state.postData.map((item, index) => (
              <PostItem key={index}>
                <PostHeader>
                  <HeadShot src={photo} />
                  <UserName>{item.userName}</UserName>
                  <MoreBtn onClick={() => handleKeep(item.id)}>
                    {Array.isArray(authContext?.user.keepIds) && authContext.user.keepIds.includes(item.id as string) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </MoreBtn>
                  <MoreContainer>
                    <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === item.id ? "" : (item.id as string)))}>
                      <MoreVertIcon />
                    </MoreBtn>
                    <FeatureBtnContainer open={isMoreClick === item.id}>
                      <FeatureBtn onClick={() => dispatch({ type: "toggleIsEditMode", payload: { isEditMode: item, isPostClick: true } })}>編輯</FeatureBtn>
                      <FeatureBtn onClick={() => deleteMerchPost(item.id ? item.id : "")}>刪除</FeatureBtn>
                    </FeatureBtnContainer>
                  </MoreContainer>
                </PostHeader>
                <ImportInfo>
                  <ImportInfoContent>時間</ImportInfoContent>
                  <ImportInfoContent>{`${item.passDay} ${item.passTime}`}</ImportInfoContent>
                  <ImportInfoContent>地點</ImportInfoContent>
                  <ImportInfoContent>{item.passPlace}</ImportInfoContent>
                  <ImportInfoContent>狀態</ImportInfoContent>
                  <ImportInfoContent>{item.passState === "0" ? "未發放" : item.passState === "1" ? "發放中" : "發放完畢"}</ImportInfoContent>
                  <ImportInfoContent>領取資格</ImportInfoContent>
                  <ImportInfoContent>{item.qualify}</ImportInfoContent>
                </ImportInfo>
                <InfoContent>{item.content}</InfoContent>
                <ImageContainer>
                  {item.image.map((item) => (
                    <Image src={item} />
                  ))}
                  {/* <Image src={photo} /> */}
                </ImageContainer>
              </PostItem>
            ))}
        </PostList>
      </Content>
    </>
  );
}

export default FansSupport;