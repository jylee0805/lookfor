import { useContext, useEffect, useReducer } from "react";
import styled from "styled-components";
import api from "../utils/api";
import { AuthContext } from "../utils/AuthContextProvider";
import { PostState } from "../pages/View";
import { MerchPost } from "./Concert/FanSupport";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 60px 120px;
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
  border-radius: 50%;
`;
const UserName = styled.p`
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
`;
const EditBtn = styled.button``;
const PostContainer = styled.ul`
  display: flex;
  overflow: scroll;
  column-gap: 20px;
  overflow-y: hidden;
`;
const PostImg = styled.img`
  object-fit: cover;
  border-radius: 20px;
`;
const PostImgBox = styled.div`
  width: 180px;
  height: 150px;
`;
const Title = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  grid-column: span 2;
`;
const PostTextContainer = styled.div`
  flex-grow: 1;
`;
const PostItem = styled.li`
  height: 280px;
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 20px;
`;
const PostTitle = styled.p``;
const PostText = styled.p``;
const Label = styled.label<{ isEdit: boolean }>`
  display: ${(props) => (props.isEdit ? "block" : "none")};
`;
const Input = styled.input`
  display: none;
`;
const EditName = styled.input``;

interface Profile {
  avatar: string;
  userName: string;
  UID: string;
  id: string;
}

interface ProfileState {
  profile: Profile;
  viewPosts: PostState[];
  merchPosts: MerchPost[];
  concertNames: string[];
  isEditProfile: boolean;
  editUserName: string;
  selectPhoto: File | null;
  localPhotoUrl: string;
}
type ProfileAction =
  | { type: "setData"; payload: { profile: Profile; viewPosts: PostState[]; supportPosts: MerchPost[]; concertNames: string[]; editUserName: string } }
  | { type: "toggleIsEditProfile" }
  | { type: "setPhoto"; payload: { selectPhoto: File | null; localPhotoUrl: string } }
  | { type: "setProfile"; payload: { profile: Profile } }
  | { type: "setEditUserName"; payload: { editUserName: string } };

const initial: ProfileState = {
  profile: {} as Profile,
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
  const [state, dispatch] = useReducer(reducer, initial);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (authContext) {
        const concertName = [];
        const user = await api.getUser(authContext.loginState as string);
        const viewPosts = await api.getUserViewPosts(authContext?.loginState as string);
        const merchPosts = await api.getUserMerchPosts(authContext?.loginState as string);
        for (const item of merchPosts) {
          const concert = await api.getConcert(item.concertId);
          concertName.push(concert?.concertName);
        }
        console.log(user, viewPosts, merchPosts, concertName);

        dispatch({ type: "setData", payload: { profile: user as Profile, viewPosts: viewPosts, supportPosts: merchPosts, concertNames: concertName, editUserName: user.userName } });
      }
    };
    getData();
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
        avatar: state.selectPhoto ? url : state.profile.avatar,
        userName: state.editUserName,
        UID: state.profile.UID,
      };
      await api.updateUser(state.profile.id as string, update);

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
  const handleViewPostClick = () => {};

  const handleMerchPostClick = (id: string) => {
    navigate(`/fanssupport?concert=${id}`);
  };
  return (
    <Container>
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
      <PostContainer>
        {state.viewPosts.map((item) => (
          <PostItem key={item.id} onClick={() => handleViewPostClick()}>
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
      <Title>我的應援發放公告</Title>
      <PostContainer>
        {state.merchPosts.map((item, index) => (
          <PostItem key={item.id} onClick={() => handleMerchPostClick(item.concertId)}>
            <PostTextContainer>
              <PostTitle>{state.concertNames[index]}</PostTitle>
              <PostText>{`${item.passDay} ${item.passTime}`}</PostText>
              <PostText>{item.passPlace}</PostText>
            </PostTextContainer>
            <PostImg src={item.image[0]} />
          </PostItem>
        ))}
      </PostContainer>
    </Container>
  );
}

export default Profile;
