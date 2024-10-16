import { useContext, useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";
import { OriginView, MerchPost, Personal } from "../../types";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import MyViewPost from "./MyViewPost";
import MySupportPost from "./MySupportPost";
import ProfileInfo from "./ProfileInfo";

const Container = styled.div`
  padding: 60px 60px;
  @media (max-width: 992px) {
    padding: 60px 40px;
  }
  @media (max-width: 575px) {
    padding: 60px 25px;
  }
`;

export interface ProfileState {
  profile: Personal;
  viewPosts: OriginView[];
  merchPosts: MerchPost[];
  concertNames: string[];
  isEditProfile: boolean;
  editUserName: string;
  selectPhoto: File | null;
  localPhotoUrl: string;
}
export type ProfileAction =
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
        }
        dispatch({ type: "setData", payload: { profile: user as Personal, viewPosts: viewPosts, supportPosts: merchPosts, concertNames: concertName, editUserName: user.userName } });
      }
    };
    getData();

    if (authContext?.loginState === undefined || authContext?.loginState === null) {
      navigate("/");
    }
  }, [authContext?.loginState]);

  return (
    <Container>
      {!loaded && <Loading />}
      <ProfileInfo state={state} dispatch={dispatch} />
      <MyViewPost state={state} />
      <MySupportPost state={state} />
    </Container>
  );
}

export default Profile;
