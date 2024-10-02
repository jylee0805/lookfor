import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useReducer, useState, useContext, useRef } from "react";
import FanPost from "./FanPost";
import { AuthContext } from "../../utils/AuthContextProvider";
import { FaSort } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import { MdOutlineMoreVert } from "react-icons/md";
import { Profile } from "../../utils/AuthContextProvider";
import { Concerts } from "../ConcertList";
import { ComponentContext } from "../../utils/ComponentContextProvider";
import LoginDialog from "../../components/LoginDialog";

const StyleSort = styled(FaSort)`
  font-size: 24px;
  margin-right: 4px;
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;
const StyleAdd = styled(MdOutlineAdd)`
  font-size: 24px;
  margin-right: 4px;
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;
const StyleKeep = styled(MdOutlineBookmarkBorder)`
  font-size: 24px;
  margin-right: 4px;
`;
const StyleKeepFill = styled(MdOutlineBookmark)`
  font-size: 24px;
  margin-right: 4px;
`;
const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 24px;
  margin-right: 4px;
`;
const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 90%;
  }
`;
const ConcertName = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 992px) {
    font-size: 1.96rem;
  }
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
const BtnBox = styled.div`
  border-radius: 50px;
  box-shadow: 0 4px 4px #00000025;
  padding: 6px 30px;
  width: 360px;
  text-align: center;
  margin: 0 auto 30px;

  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
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
    background: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
    background-clip: text;
    background-clip: text;
    color: transparent;
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
    width: 90%;
  }
`;
const FeatureBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  margin-left: auto;
`;
const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: #fff;
  border: none;
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
  margin-left: 10px;
`;
const MoreBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  display: flex;
  align-items: center;
`;
const KeepBtn = styled(MoreBtn)`
  margin-left: auto;
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
  object-fit: cover;
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
  grid-template-columns: 100px auto;
  column-gap: 20px;
  row-gap: 5px;
  width: 80%;
  margin-bottom: 10px;
  color: #ffffff;
  font-weight: 700;
  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    font-size: 1rem;
    width: 100%;
  }
`;
const ImportInfoContent = styled.p`
  font-size: 1.1rem;
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
  concertName?: string;
  id?: string;
  avatar?: string;
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

function FansSupport() {
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const [state, dispatch] = useReducer(reducer, initial);
  const [concert, setConcert] = useState<Concerts | null>(null);
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const authContext = useContext(AuthContext);
  const componentContext = useContext(ComponentContext);

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      let posts: MerchPost[] = [];
      const concertRes = await api.getConcert(concertId);
      console.log(concertRes);

      setConcert(concertRes as Concerts);
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

      // 清除訂閱
      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, []);

  const location = useLocation();
  const targetRef = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    console.log(location.hash && targetRef.current);

    const handleScroll = () => {
      const targetId = location.hash.slice(1);
      const targetIndex = state.postData.findIndex((post) => post.id === targetId);
      console.log(targetIndex);

      if (targetIndex >= 0 && targetRef.current[targetIndex]) {
        targetRef.current[targetIndex]?.scrollIntoView({ behavior: "smooth" });
      }
    };

    // 在初始哈希值檢查後進行滾動
    if (location.hash) {
      handleScroll();
    }

    const timeoutId = setTimeout(() => {
      if (location.hash) {
        handleScroll();
      }
    }, 1000);

    // 清理計時器
    return () => clearTimeout(timeoutId);
  }, [location, state.postData]);

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
      componentContext?.setIsDialogOpen(true);
      document.body.style.overflow = "hidden";
      return;
    }
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: true } });
  };

  const handleKeep = async (id: string) => {
    if (authContext?.loginState === undefined) {
      componentContext?.setIsDialogOpen(true);
      document.body.style.overflow = "hidden";
      return;
    }
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
    <Container>
      <LoginDialog />
      <ConcertName>{concert?.concertName}</ConcertName>
      <BtnBox>
        <PageBtn to={`/concert?concert=${concertId}`}>演唱會資訊</PageBtn>
        <PageBtn to={`/fanssupport?concert=${concertId}`}>應援物發放資訊</PageBtn>
      </BtnBox>
      <Mask postClick={state.isPostClick} />
      <Content>
        <FeatureBox>
          <ActionBtn onClick={() => handleSort()}>
            <StyleSort />
            {state.sort === "createdTime" ? "依發放時間排序" : "依貼文發布時間排序"}
          </ActionBtn>
          <ActionBtn onClick={() => handlePostClick()}>
            <StyleAdd />
            發佈資訊
          </ActionBtn>
        </FeatureBox>
        <FanPost concert={concert as Concerts} dispatch={dispatch} state={state} />
        <PostList>
          {state.postData &&
            state.postData.map((item, index) => (
              <PostItem key={item.id} id={item.id} ref={(el) => (targetRef.current[index] = el)}>
                <PostHeader>
                  <HeadShot src={item.avatar} />
                  <UserName>{item.userName}</UserName>
                  <KeepBtn onClick={() => handleKeep(item.id as string)}>
                    {Array.isArray(authContext?.user.keepIds) && authContext.user.keepIds.includes(item.id as string) ? <StyleKeepFill /> : <StyleKeep />}
                  </KeepBtn>
                  {authContext?.loginState === item.userUID && (
                    <MoreContainer>
                      <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === item.id ? "" : (item.id as string)))}>
                        <StyleMore />
                      </MoreBtn>
                      <FeatureBtnContainer open={isMoreClick === item.id}>
                        <FeatureBtn onClick={() => dispatch({ type: "toggleIsEditMode", payload: { isEditMode: item, isPostClick: true } })}>編輯</FeatureBtn>
                        <FeatureBtn onClick={() => deleteMerchPost(item.id ? item.id : "")}>刪除</FeatureBtn>
                      </FeatureBtnContainer>
                    </MoreContainer>
                  )}
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
                <InfoContent dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />") }}></InfoContent>
                <ImageContainer>
                  {item.image.map((item) => (
                    <Image src={item} />
                  ))}
                </ImageContainer>
              </PostItem>
            ))}
        </PostList>
      </Content>
    </Container>
  );
}

export default FansSupport;
