import { Link } from "react-router-dom";
import styled from "styled-components";
import lookfor from "../images/LOOKFOR.png";
import api from "../utils/api";
import { useEffect, useState, useContext, useReducer } from "react";
import { auth, onAuthStateChanged } from "../utils/firebase";
import { AuthContext } from "../utils/AuthContextProvider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 48px;
  position: relative;
  @media (max-width: 575px) {
    padding: 0 15px 0 30px;
  }
`;
const LogoBox = styled(Link)`
  display: block;
  width: 150px;
  z-index: 5;
`;
const Logo = styled.img``;

const NavBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  @media (max-width: 575px) {
    display: block;
    padding: 10px;
    z-index: 3;
    position: relative;
  }
`;

const NavCloseBtn = styled(NavBtn)`
  display: none;
  @media (max-width: 575px) {
    display: inline;
    margin-left: auto;
  }
`;
const NavBox = styled.div``;
const Nav = styled.ul<{ isMenuOpen: boolean }>`
  display: flex;
  align-items: center;
  z-index: 5;
  position: relative;
  @media (max-width: 575px) {
    flex-direction: column;
    position: fixed;
    height: 100vh;
    background: #1e1e1e;
    top: 0;
    right: ${(props) => (props.isMenuOpen ? "0" : " -100%")};
    transition: right 500ms ease-out;
  }
`;
const NavItem = styled.li`
  position: relative;
  @media (max-width: 575px) {
    padding: 0;
  }
`;

const NavCloseItem = styled(NavItem)`
  display: none;
  @media (max-width: 575px) {
    display: block;
    align-self: flex-start;
    margin-left: 15px;
  }
`;

const StyleLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 20px 24px;
  color: #ffffff;
  @media (max-width: 575px) {
    display: block;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    padding: 10px 30px;
  }
`;
const LogOutBtn = styled.button`
  background: none;
  padding: 0;
  @media (max-width: 575px) {
    display: block;
    padding: 10px 42px;
    color: #fff;
  }
`;
const PersonalBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @media (max-width: 575px) {
    display: none;
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
const PersonalList = styled.ul<{ isPersonalClick: boolean }>`
  display: ${(props) => (props.isPersonalClick ? "block" : "none")};
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

interface State {
  isPersonalClick: boolean;
  isMenuOpen: boolean;
}
type Action = { type: "toggleIsPersonalClick" } | { type: "toggleIsMenuOpen" };

const initial: State = {
  isPersonalClick: false,
  isMenuOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggleIsPersonalClick":
      return { ...state, isPersonalClick: !state.isPersonalClick };
    case "toggleIsMenuOpen":
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

function Header() {
  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    dispatch({ type: "toggleIsMenuOpen" });
  }, []);

  if (authContext) {
    console.log(authContext.loginState);
  }

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const handlerLogout = async () => {
    const loginState = await api.userLogOut();
    authContext?.setLoginState(loginState as string);
    dispatch({ type: "toggleIsPersonalClick" });
  };
  const handlePersonalClick = () => {
    dispatch({ type: "toggleIsPersonalClick" });
  };
  return (
    <Container>
      <LogoBox to="/">
        <Logo src={lookfor} />
      </LogoBox>
      <NavBox>
        <NavBtn onClick={() => dispatch({ type: "toggleIsMenuOpen" })}>
          <MenuIcon />
        </NavBtn>
        <Nav isMenuOpen={state.isMenuOpen}>
          <NavCloseItem>
            <NavCloseBtn onClick={() => dispatch({ type: "toggleIsMenuOpen" })}>
              <CloseIcon />
            </NavCloseBtn>
          </NavCloseItem>
          <NavItem>
            <StyleLink to="/view">場地</StyleLink>
          </NavItem>
          <NavItem>
            <StyleLink to="/concertlist">演唱會資訊</StyleLink>
          </NavItem>
          <NavItem>
            {isLogin ? (
              <>
                <PersonalBtn onClick={() => handlePersonalClick()}></PersonalBtn>
                <PersonalList isPersonalClick={state.isPersonalClick}>
                  <PersonalItem>
                    <ProfileLink to="/profile">個人頁面</ProfileLink>
                  </PersonalItem>
                  <PersonalItem>
                    <ProfileLink to="/profile">我的收藏</ProfileLink>
                  </PersonalItem>
                  <PersonalItem>
                    <LogOutBtn onClick={handlerLogout}>登出</LogOutBtn>
                  </PersonalItem>
                </PersonalList>
              </>
            ) : (
              <StyleLink to="/login">登入</StyleLink>
            )}
          </NavItem>
        </Nav>
      </NavBox>
    </Container>
  );
}

export default Header;
