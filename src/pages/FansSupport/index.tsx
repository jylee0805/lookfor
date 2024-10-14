import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useReducer, useState, useContext, useRef } from "react";
import FanPost from "./FanPost";
import { AuthContext } from "../../utils/AuthContextProvider";
import { FaSort } from "react-icons/fa";
import { MdOutlineAdd, MdOutlineBookmarkBorder, MdOutlineBookmark, MdOutlineMoreVert } from "react-icons/md";
import { Concerts } from "../../types";
import { ConcertContext } from "../../utils/ConcertContextProvider";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Dialog from "../../components/Dialog";
import { useDialog } from "../../utils/useDialog";
import { MerchPost, Personal } from "../../types";

const StyleSort = styled(FaSort)`
  font-size: 1.5rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;
const StyleAdd = styled(MdOutlineAdd)`
  font-size: 1.5rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;
const StyleKeep = styled(MdOutlineBookmarkBorder)`
  font-size: 1.5em;
  margin-right: 4px;
`;
const StyleKeepFill = styled(MdOutlineBookmark)`
  font-size: 1.8rem;
  margin-right: 4px;
`;
const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.8rem;
  margin-right: 4px;
`;
const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 100%;
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
const FeatureBox = styled.div`
  display: flex;
  justify-content: end;
  margin-left: auto;
  @media (max-width: 575px) {
    justify-content: center;
    margin: 0 auto;
  }
`;
const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: #fff;
  border: none;
  @media (max-width: 575px) {
    padding: 10px 15px;
  }
`;

const PostList = styled.ul``;
const PostItem = styled.li`
  position: relative;
  display: flex;
  padding: 30px 0;
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
  font-weight: 700;
  margin-bottom: 8px;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;
const MoreContainer = styled.div`
  position: relative;
  margin-left: 10px;
  position: absolute;
  right: 0;
  top: 25px;
`;
const MoreBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  display: flex;
  align-items: center;
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
const PostContent = styled.div``;
const ImportInfo = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  column-gap: 20px;
  row-gap: 5px;
  width: 80%;
  margin-bottom: 10px;
  color: #ffffff;

  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    font-size: 1rem;
    width: 100%;
    grid-template-columns: 60px auto;
  }
`;
const ImportInfoContent = styled.p`
  font-size: 1.1rem;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;

const InfoContent = styled.div`
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  position: relative;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888888;
  }
`;
const Image = styled.img`
  max-width: 500px;
  max-height: 300px;
  object-fit: cover;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 2px solid #fff;
  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 200px;
  }
`;
const KeepBtn = styled(MoreBtn)``;
const KeepContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;
const KeepNumber = styled.p``;
const Hint = styled.p`
  font-size: 28px;
  text-align: center;
  margin-top: 60px;
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
}
export type Action =
  | { type: "setPostData"; payload: { postData: MerchPost[] } }
  | { type: "setLocalPhotoUrl"; payload: { localPhotoUrl: string[]; selectPhotos: File[] } }
  | { type: "setUpLoadPhotoUrl"; payload: { upLoadPhotoUrl: string[] } }
  | { type: "setSort"; payload: { sort: string; postData: MerchPost[] } }
  | { type: "toggleIsPostClick"; payload: { isPostClick: boolean } }
  | { type: "toggleIsEditMode"; payload: { isEditMode: MerchPost; isPostClick: boolean } }
  | { type: "setDeleteId"; payload: { deleteId: string } };

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
    item: "",
    image: [],
    createdTime: { seconds: 0, nanoseconds: 0 },
  },
  isPostClick: false,
  uploadUrl: [],
  deleteId: "",
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
    default:
      return state;
  }
};

function FansSupport() {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const concertContext = useContext(ConcertContext);
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";

  const [state, dispatch] = useReducer(reducer, initial);
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const [users, setUsers] = useState<Personal[]>([]);
  const targetRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribesPost: (() => void)[] = [];
      let posts: MerchPost[] = [];

      const userList = await api.getUsers();
      setUsers(userList);

      const unsubscribePost = api.getMerchPost(concertId, (updatedPosts: MerchPost[]) => {
        posts = JSON.parse(JSON.stringify(updatedPosts));
        console.log(updatedPosts);

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

      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };

    if (!concertContext?.concertId) {
      concertContext?.setConcertId(concertId);
    }
    loadViewPosts();
  }, []);

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

    if (location.hash) {
      handleScroll();
    }

    const timeoutId = setTimeout(() => {
      if (location.hash) {
        handleScroll();
      }
    }, 1000);
    document.body.style.overflow = "auto";
    return () => clearTimeout(timeoutId);
  }, [location, state.postData]);

  const handlerDeleteClick = async (id: string) => {
    dispatch({ type: "setDeleteId", payload: { deleteId: id } });
    setIsMoreClick("");
    setIsOpen(true);
  };
  const deleteMerchPost = async () => {
    if (state.deleteId) {
      await api.deleteMerchPost(state.deleteId);
    }
    dispatch({ type: "setPostData", payload: { postData: state.postData.filter((post) => post.id != state.deleteId) } });
    dispatch({ type: "setDeleteId", payload: { deleteId: "" } });
    closeDialog();
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
      setIsOpen(true);
      document.body.style.overflowY = "hidden";
      return;
    }
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: true } });
  };

  const handleKeep = async (id: string) => {
    if (authContext?.loginState === undefined) {
      setIsOpen(true);
      document.body.style.overflowY = "hidden";
      return;
    }
    if (authContext?.user.keepIds?.includes(id)) {
      authContext.setUser((prev) => {
        api.updateUser(authContext?.user.id, { UID: prev.UID, avatar: prev.avatar, userName: prev.userName, keepIds: prev.keepIds?.filter((item) => item !== id) });
        return { ...prev, keepIds: prev.keepIds?.filter((item) => item !== id) };
      });
      const updateUser = users.map((user) => {
        if (user.UID === authContext?.user.UID) {
          return { ...user, keepIds: user.keepIds?.filter((item) => item !== id) };
        }
        return user;
      });
      setUsers(updateUser);
    } else if (authContext?.user.keepIds === undefined || authContext?.user.keepIds?.includes(id) === false) {
      authContext?.setUser((prev: Personal) => {
        const updatedKeepIds = prev.keepIds ? [...prev.keepIds, id] : [id];
        api.setKeepPost(authContext?.loginState as string, id);
        return { ...prev, keepIds: updatedKeepIds };
      });

      const updateUser = users.map((user) => {
        if (user.UID === authContext?.user.UID) {
          return { ...user, keepIds: [...(user.keepIds ?? []), id] };
        }
        return user;
      });
      setUsers(updateUser);
    }
  };
  const handleConfirm = () => {
    navigate("/login");
    closeDialog();
  };
  const handleCancel = () => {
    dispatch({ type: "setDeleteId", payload: { deleteId: "" } });
    closeDialog();
  };

  return (
    <Container>
      {authContext?.loginState === undefined && (
        <Dialog isOpen={isOpen} title="您尚未登入" onConfirm={handleConfirm} onCancel={closeDialog} confirmText="前往登入">
          是否前往登入執行更多功能?
        </Dialog>
      )}

      {state.deleteId !== "" && (
        <Dialog isOpen={isOpen} title="刪除應援物發放貼文" onConfirm={deleteMerchPost} onCancel={handleCancel} confirmText="刪除">
          確認刪除該篇應援物發放貼文?
        </Dialog>
      )}

      <ConcertName>{concertContext?.concertData.concertName}</ConcertName>
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
        <FanPost concert={concertContext?.concertData as Concerts} dispatch={dispatch} state={state} />
        <PostList>
          {state.postData &&
            state.postData.map((item, index) => (
              <PostItem key={item.id} id={item.id} ref={(el) => (targetRef.current[index] = el)}>
                <HeadShot src={item.avatar} />

                <PostContent>
                  <UserName>{item.userName}</UserName>
                  <ImportInfo>
                    <ImportInfoContent>應援物品</ImportInfoContent>
                    <ImportInfoContent>{`${item.item}`}</ImportInfoContent>
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
                  <PhotoProvider maskOpacity={0.8} bannerVisible={false}>
                    <ImageContainer>
                      {item.image.map((item) => (
                        <PhotoView key={item} src={item}>
                          <Image src={item} />
                        </PhotoView>
                      ))}
                    </ImageContainer>
                  </PhotoProvider>
                  <KeepContainer>
                    <KeepBtn onClick={() => handleKeep(item.id as string)}>
                      {Array.isArray(authContext?.user.keepIds) && authContext.user.keepIds.includes(item.id as string) ? <StyleKeepFill /> : <StyleKeep />}
                    </KeepBtn>
                    <KeepNumber>{users.filter((user) => user.keepIds?.includes(item.id as string)).length}</KeepNumber>
                  </KeepContainer>
                </PostContent>
                {authContext?.loginState === item.userUID && (
                  <MoreContainer>
                    <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === item.id ? "" : (item.id as string)))}>
                      <StyleMore />
                    </MoreBtn>
                    <FeatureBtnContainer open={isMoreClick === item.id}>
                      <FeatureBtn
                        onClick={() => {
                          dispatch({ type: "toggleIsEditMode", payload: { isEditMode: item, isPostClick: true } });
                          setIsMoreClick("");
                        }}
                      >
                        編輯
                      </FeatureBtn>
                      <FeatureBtn onClick={() => handlerDeleteClick(item.id ? item.id : "")}>刪除</FeatureBtn>
                    </FeatureBtnContainer>
                  </MoreContainer>
                )}
              </PostItem>
            ))}
          {state.postData.length === 0 && <Hint>目前沒有應援物發放資訊</Hint>}
        </PostList>
      </Content>
    </Container>
  );
}

export default FansSupport;
