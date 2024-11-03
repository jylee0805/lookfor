import { useContext } from "react";
import styled from "styled-components";
import { ProfileAction, ProfileState } from ".";
import { AuthContext } from "../../utils/AuthContextProvider";
import api from "../../utils/api";

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
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 25px;
`;
const Label = styled.label<{ $isEdit: boolean }>`
  display: ${(props) => (props.$isEdit ? "block" : "none")};
  background: #6a6565;
  display: block;
  padding: 10px;
  border-radius: 8px;
`;
const Input = styled.input`
  display: none;
`;
const EditBtn = styled.button`
  padding: 10px 20px;
`;

type Props = {
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
};

function ProfileInfo({ state, dispatch }: Props) {
  const authContext = useContext(AuthContext);
  const handleProfile = async () => {
    if (!state.isEditProfile) {
      dispatch({ type: "toggleIsEditProfile" });
    } else {
      let url;
      const profile = state.profile;
      profile.userName = state.editUserName;
      if (state.selectPhoto) {
        url = await api.uploadImage("avatar", state.selectPhoto);
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

  return (
    <ProfileContainer>
      <HeadShot src={state.localPhotoUrl === "" ? state.profile.avatar : state.localPhotoUrl} />
      {state.isEditProfile ? (
        <EditName type="text" value={state.editUserName} onChange={(e) => dispatch({ type: "setEditUserName", payload: { editUserName: e.target.value } })} />
      ) : (
        <UserName>{state.profile.userName}</UserName>
      )}
      <BtnContainer>
        <Label $isEdit={state.isEditProfile}>
          選擇照片
          <Input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={handleImage} />
        </Label>
        <EditBtn onClick={() => handleProfile()}>{state.isEditProfile ? "儲存" : "編輯"}</EditBtn>
      </BtnContainer>
    </ProfileContainer>
  );
}

export default ProfileInfo;
