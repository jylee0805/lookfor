import { useContext, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import api from "../utils/api";
import { AuthContext } from "../utils/AuthContextProvider";
import { OriginView, MerchPost, Personal } from "../types";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Container = styled.div`
  padding: 60px 60px;
  @media (max-width: 992px) {
    padding: 60px 40px;
  }
  @media (max-width: 575px) {
    padding: 60px 25px;
  }
`;
const ProfileContainer = styled.div`
  max-width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;
const HeadShot = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 50%;
`;
const EditName = styled.input`
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #fff;
  outline: none;
  background: none;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
`;
const UserName = styled.p`
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
`;
const Label = styled.label<{ isEdit: boolean }>`
  display: ${(props) => (props.isEdit ? "block" : "none")};
`;
const Input = styled.input`
  display: none;
`;
const EditBtn = styled.button``;
const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  grid-column: span 2;
  margin-top: 50px;
`;
const PostContainer = styled.ul`
  display: flex;
  overflow-x: auto;
  column-gap: 20px;
  padding: 20px 0;
  margin-bottom: 25px;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3f3f3f;
  }
`;
const PostItem = styled.li`
  padding: 15px 20px;
  background: #f8f8f8;
  border-radius: 10px;
  color: #000;
  display: block;
  min-width: 280px;
  max-width: 280px;
`;
const PostTextContainer = styled.div`
  flex-grow: 1;
  min-height: 120px;
`;
const SupportPostTextContainer = styled(PostTextContainer)`
  width: 250px;
  min-height: 120px;
  @media (max-width: 575px) {
    width: 180px;
  }
`;

const PostTitle = styled.p`
  font-weight: 700;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const PostText = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
const PostImgBox = styled.div`
  width: 100%;
  height: 150px;
  text-align: center;
  margin-top: 20px;
  @media (max-width: 992px) {
    width: 150px;
    height: 120px;
  }
`;
const SupportPostImgBox = styled(PostImgBox)`
  @media (max-width: 992px) {
    width: 180px;
    height: 150px;
    margin: 15px auto 0;
  }
`;
const PostImg = styled.img`
  object-fit: cover;
  border-radius: 8px;
`;
const Hint = styled.p`
  padding: 10px 15px;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  line-height: 2;
`;

const StyleLink = styled(Link)`
  color: #000;
  display: block;
  min-width: 240px;
`;

interface ProfileState {
  profile: Personal;
  viewPosts: OriginView[];
  merchPosts: MerchPost[];
  concertNames: string[];
  isEditProfile: boolean;
  editUserName: string;
  selectPhoto: File | null;
  localPhotoUrl: string;
}
type ProfileAction =
  | { type: "setData"; payload: { profile: Personal; viewPosts: OriginView[]; supportPosts: MerchPost[]; concertNames: string[]; editUserName: string } }
  | { type: "toggleIsEditProfile" }
  | { type: "setPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setProfile"; payload: { profile: Personal } }
  | { type: "setEditUserName"; payload: { editUserName: string } };

const initial: ProfileState = {
  profile: {} as Personal,
  viewPosts: [],
  merchPosts: [],
  concertNames: [],
  isEditProfile: false,
  editUserName: "",
  selectPhoto: null,
  localPhotoUrl: "",
};
const reducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case "setData": {
      return {
        ...state,
        profile: action.payload.profile,
        viewPosts: action.payload.viewPosts,
        merchPosts: action.payload.supportPosts,
        concertNames: action.payload.concertNames,
        editUserName: action.payload.editUserName,
      };
    }
    case "setProfile": {
      return { ...state, profile: action.payload.profile };
    }
    case "toggleIsEditProfile": {
      return { ...state, isEditProfile: !state.isEditProfile };
    }
    case "setPhoto": {
      return { ...state, selectPhoto: action.payload.selectPhoto, localPhotoUrl: action.payload.localPhotoUrl };
    }
    case "setEditUserName": {
      return { ...state, editUserName: action.payload.editUserName };
    }
    default:
      return state;
  }
};

function Profile() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // 假设在一开始或某个资源加载完成后我们设置 loaded 状态
    setTimeout(() => {
      setLoaded(true);
      document.body.style.overflowY = "auto";
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (authContext) {
        const concertName: string[] = [];
        const user = await api.getUser(authContext.loginState as string);
        const viewPosts = await api.getUserViewPosts(authContext?.loginState as string);
        const merchPosts = await api.getUserMerchPosts(authContext?.loginState as string);
        for (const item of merchPosts) {
          const concert = await api.getConcert(item.concertId);

          concertName.push(concert?.concertName);
          console.log(concert);
        }

        dispatch({ type: "setData", payload: { profile: user as Personal, viewPosts: viewPosts, supportPosts: merchPosts, concertNames: concertName, editUserName: user.userName } });
      }
    };
    getData();
    console.log(state.merchPosts);

    if (authContext?.loginState === undefined || authContext?.loginState === null) {
      navigate("/");
    }
  }, [authContext?.loginState]);

  const handleProfile = async () => {
    if (!state.isEditProfile) {
      dispatch({ type: "toggleIsEditProfile" });
    } else {
      let url;
      const profile = state.profile;
      profile.userName = state.editUserName;
      if (state.selectPhoto) {
        url = await api.uploadImage(state.selectPhoto);
        profile.avatar = url;
      }
      const update = {
        avatar: state.selectPhoto ? (url as string) : (state.profile.avatar as string),
        userName: state.editUserName,
        UID: state.profile.UID,
      };
      await api.updateUser(state.profile.id as string, update);
      authContext?.setUser((prev) => ({ ...prev, ...update }));
      dispatch({ type: "setProfile", payload: { profile } });
      dispatch({ type: "toggleIsEditProfile" });
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      dispatch({ type: "setPhoto", payload: { selectPhoto: target.files[0], localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };

  const handleViewPostClick = (section: string, row: number, seat: number) => {
    navigate("/view", {
      state: { section, row, seat },
    });
  };

  return (
    <Container>
      {!loaded && <Loading />}
      <ProfileContainer>
        <HeadShot src={state.localPhotoUrl === "" ? state.profile.avatar : state.localPhotoUrl} />
        {state.isEditProfile ? (
          <EditName type="text" value={state.editUserName} onChange={(e) => dispatch({ type: "setEditUserName", payload: { editUserName: e.target.value } })} />
        ) : (
          <UserName>{state.profile.userName}</UserName>
        )}
        <Label isEdit={state.isEditProfile}>
          選擇照片
          <Input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={handleImage} />
        </Label>
        <EditBtn onClick={() => handleProfile()}>{state.isEditProfile ? "儲存" : "編輯"}</EditBtn>
      </ProfileContainer>
      <Title>我的視角文章</Title>
      {state.viewPosts.length !== 0 ? (
        <PostContainer>
          {state.viewPosts.map((item) => (
            <PostItem key={item.id} onClick={() => handleViewPostClick(item.section as string, item.row as number, item.seat as number)}>
              <PostTextContainer>
                <PostTitle>{`${item.section}區${item.row}排${item.seat}號`}</PostTitle>
                <PostText>{item.note}</PostText>
                <PostText>{item.content}</PostText>
              </PostTextContainer>
              <PostImgBox>
                <PostImg src={item.image} />
              </PostImgBox>
            </PostItem>
          ))}
        </PostContainer>
      ) : (
        <Hint>尚未發佈視角文章</Hint>
      )}

      <Title>我的應援發放公告</Title>
      {state.merchPosts.length !== 0 ? (
        <PostContainer>
          {state.merchPosts.map((item, index) => (
            <PostItem key={item.id}>
              <StyleLink to={`/fanssupport?concert=${item.concertId}#${item.id}`}>
                <SupportPostTextContainer>
                  <PostTitle>{state.concertNames[index]}</PostTitle>
                  <PostText>{item.passDay}</PostText>
                  <PostText>{item.passTime}</PostText>
                  <PostText>{item.passState === "0" ? "尚未發放" : item.passState === "1 " ? "發放中" : "發放完畢"}</PostText>
                </SupportPostTextContainer>
                <SupportPostImgBox>
                  <PostImg src={item.image[0]} />
                </SupportPostImgBox>
              </StyleLink>
            </PostItem>
          ))}
        </PostContainer>
      ) : (
        <Hint>尚未發布應援物資訊</Hint>
      )}
    </Container>
  );
}

export default Profile;
