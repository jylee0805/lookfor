import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Action, State } from ".";
import { Personal } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";

const PersonalBtn = styled.button<{ $avatar: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.$avatar});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 575px) {
    display: none;
  }
`;
const PersonalList = styled.ul<{ $isPersonalClick: boolean }>`
  display: ${(props) => (props.$isPersonalClick ? "block" : "none")};
  position: absolute;
  width: 120px;
  right: 0;
  bottom: -140px;
  box-shadow: 2px 2px 2px #b4b5b650;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  @media (max-width: 575px) {
    display: block;
    position: static;
    background: none;
    box-shadow: none;
  }
`;
const PersonalItem = styled.li`
  padding: 10px;
  color: #000;
  @media (max-width: 575px) {
    padding: 0;
  }
`;
const ProfileLink = styled(Link)`
  color: #000;
  @media (max-width: 575px) {
    color: #fff;
    display: block;
    padding: 10px 28px;
  }
`;
const LogOutBtn = styled.button`
  background: none;
  padding: 0;
  font-weight: 700;
  @media (max-width: 575px) {
    display: block;
    padding: 10px 42px;
    color: #fff;
  }
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function PersonalButton({ state, dispatch }: Props) {
  const authContext = useContext(AuthContext);
  const handlerLogout = async () => {
    await api.userLogOut();

    authContext?.setLoginState("");
    authContext?.setUser({} as Personal);
    dispatch({ type: "toggleIsPersonalClick" });
  };
  return (
    <>
      <PersonalBtn $avatar={authContext?.user.avatar ? authContext?.user.avatar : ""} onClick={() => dispatch({ type: "toggleIsPersonalClick" })}></PersonalBtn>
      <PersonalList $isPersonalClick={state.isPersonalClick}>
        <PersonalItem>
          <ProfileLink to="/profile" onClick={() => dispatch({ type: "toggleIsPersonalClick" })}>
            個人頁面
          </ProfileLink>
        </PersonalItem>
        <PersonalItem>
          <ProfileLink to="/keep" onClick={() => dispatch({ type: "toggleIsPersonalClick" })}>
            我的收藏
          </ProfileLink>
        </PersonalItem>
        <PersonalItem>
          <LogOutBtn onClick={handlerLogout}>登出</LogOutBtn>
        </PersonalItem>
      </PersonalList>
    </>
  );
}

export default PersonalButton;
