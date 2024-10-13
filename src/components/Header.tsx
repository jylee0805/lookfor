import { Link } from "react-router-dom";
import styled from "styled-components";
import api from "../utils/api";
import { useEffect, useState, useContext, useReducer } from "react";
import { auth, onAuthStateChanged } from "../utils/firebase";
import { AuthContext } from "../utils/AuthContextProvider";
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { Personal, Notify } from "../types";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;
const StyleMenu = styled(MdMenu)`
  font-size: 24px;
  margin-right: 4px;
`;
const StyleNotify = styled(IoMdNotifications)`
  font-size: 24px;
  margin-right: 4px;
`;
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
  font-size: 3rem;
  font-weight: 700;
  font-family: lihsianti;
  color: #fff;
  height: 70px;
  text-align: left;
  margin-top: -10px;
  &:hover {
    color: #fff;
  }
  @media (max-width: 575px) {
    margin-top: -5px;
  }
`;
const NavBox = styled.div`
  z-index: 5;
  @media (max-width: 575px) {
    display: flex;
    align-items: center;
  }
`;
const NotifyBox = styled.div<{ show: boolean }>`
  display: none;
  @media (max-width: 575px) {
    display: ${(props) => (props.show ? "none" : "flex")};
    align-items: center;
    position: relative;
  }
`;
const NotifyBtn = styled.button<{ num: boolean }>`
  background: none;
  border: none;
  color: #fff;
  padding: 5px 10px;
  margin: 10px 20px 10px 0;
  display: flex;
  align-items: center;
  position: relative;
  &::after {
    content: "";
    z-index: 10;
    position: absolute;
    top: 7px;
    right: 15px;
    width: 10px;
    height: 10px;
    background: ${(props) => (props.num ? "#f85a5a" : "transparent")};
    border-radius: 50%;
  }

  @media (max-width: 575px) {
    margin: 0 10px 0 0;
  }
`;
const NotifyList = styled.ul<{ isNotifyOpen: boolean }>`
  display: ${(props) => (props.isNotifyOpen ? "block" : "none")};
  width: 300px;
  padding: 0;
  background: #fff;
  color: #000;
  position: absolute;
  right: 50%;
  font-size: 1rem;
  border-radius: 8px;

  & :first-child {
    border-radius: 15px 15px 0 0;
  }
  & :last-child {
    border-radius: 0 0 15px 15px;
  }
  & :only-child {
    border-radius: 15px;
  }

  @media (max-width: 575px) {
    bottom: -50px;
    right: 0;
    margin: 0 10px 0 0;
    width: 180px;
  }
`;
const NotifyItem = styled.li`
  padding: 20px 25px;
  color: #000;
  &:hover {
    background: #fffab9;
  }
  @media (max-width: 575px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const NotifyTitle = styled.p`
  font-weight: 700;
`;
const NotifyContent = styled.p``;
const NotifyTime = styled.p`
  font-size: 0.8rem;
`;

const NavBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  @media (max-width: 575px) {
    display: block;
    padding: 5px;
    z-index: 3;
    position: relative;
  }
`;
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
const NavCloseBtn = styled(NavBtn)`
  display: none;
  @media (max-width: 575px) {
    display: inline;
    margin-left: auto;
    margin-top: 15px;
  }
`;
const NavNotifyItem = styled(NavItem)`
  @media (max-width: 575px) {
    display: none;
  }
`;
const StyleLink = styled(Link)`
  font-size: 1.2rem;
  padding: 20px 24px;
  color: #ffffff;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  @media (max-width: 575px) {
    display: block;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    padding: 10px 30px;
  }
  &:hover {
    background: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
    background-clip: text;
    color: transparent;
  }
`;
const PersonalBtn = styled.button<{ avatar: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.avatar});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 575px) {
    display: none;
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

interface State {
  notifyData: Notify[];
  isPersonalClick: boolean;
  isMenuOpen: boolean;
  isNotifyOpen: boolean;
}

type Action =
  | { type: "toggleIsPersonalClick" }
  | { type: "toggleIsMenuOpen"; payload: { isMenuOpen: boolean } }
  | { type: "setNotifyData"; payload: { notifyData: Notify[] } }
  | { type: "toggleIsNotifyOpen" };

const initial: State = {
  notifyData: [],
  isPersonalClick: false,
  isMenuOpen: false,
  isNotifyOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "toggleIsPersonalClick":
      return { ...state, isPersonalClick: !state.isPersonalClick, isNotifyOpen: false, isMenuOpen: false };
    case "toggleIsMenuOpen":
      return { ...state, isMenuOpen: action.payload.isMenuOpen, isNotifyOpen: false };
    case "toggleIsNotifyOpen":
      return { ...state, isNotifyOpen: !state.isNotifyOpen, isPersonalClick: false };
    case "setNotifyData":
      return { ...state, notifyData: action.payload.notifyData };

    default:
      return state;
  }
};

declare global {
  interface Window {
    _jf?: {
      flush: () => void;
    };
  }
}

function Header() {
  const authContext = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initial);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkIfPageIsLoaded = () => {
      if (document.readyState === "complete") {
        if (window._jf && typeof window._jf.flush === "function") {
          window._jf.flush();
          console.log("字型已刷新");
        }
      }
    };

    if (document.readyState === "complete") {
      checkIfPageIsLoaded();
    } else {
      window.addEventListener("load", checkIfPageIsLoaded);
    }
    return () => {
      window.removeEventListener("load", checkIfPageIsLoaded);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
        console.log(user);
      } else {
        setIsLogin(false);
      }
    });
    dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: false } });
    const loadViewPosts = async () => {
      const unsubscribeNotify: (() => void)[] = [];

      const unsubscribe = api.getNotify(authContext?.loginState as string, (updatedNotifies: Notify[]) => {
        dispatch({ type: "setNotifyData", payload: { notifyData: updatedNotifies } });
      });

      unsubscribeNotify.push(await unsubscribe);

      return () => {
        unsubscribeNotify.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [authContext?.loginState]);

  const handlerLogout = async () => {
    const loginState = await api.userLogOut();
    authContext?.setLoginState(loginState as string);
    authContext?.setUser({} as Personal);
    dispatch({ type: "toggleIsPersonalClick" });
  };

  const handleNotify = (id: string) => {
    dispatch({ type: "toggleIsNotifyOpen" });
    api.deleteNotify(authContext?.user.id as string, id);
  };

  return (
    <Container>
      <LogoBox to="/">LookFor</LogoBox>
      <NavBox>
        <NotifyBox show={authContext?.loginState === undefined}>
          <NotifyBtn onClick={() => dispatch({ type: "toggleIsNotifyOpen" })} num={state.notifyData.length > 0}>
            <StyleNotify />
          </NotifyBtn>
          <NotifyList isNotifyOpen={state.isNotifyOpen}>
            {state.notifyData.length > 0 ? (
              state.notifyData.map((item) => (
                <Link to={`/fanssupport?concert=${item.concertId}#${item.postId}`} onClick={() => handleNotify(item.id as string)}>
                  <NotifyItem key={item.id}>
                    <NotifyTitle>{item.title}</NotifyTitle>
                    <NotifyContent>{item.message}</NotifyContent>
                    <NotifyTime>{new Date(item.createdTime.seconds * 1000).toLocaleString()}</NotifyTime>
                  </NotifyItem>
                </Link>
              ))
            ) : (
              <NotifyItem>目前沒有新通知</NotifyItem>
            )}
          </NotifyList>
        </NotifyBox>
        <NavBtn onClick={() => dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: true } })}>
          <StyleMenu />
        </NavBtn>
        <Nav isMenuOpen={state.isMenuOpen}>
          <NavCloseItem>
            <NavCloseBtn onClick={() => dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: false } })}>
              <StyleClose />
            </NavCloseBtn>
          </NavCloseItem>
          <NavItem>
            <StyleLink to="/view" onClick={() => dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: false } })}>
              北流視角
            </StyleLink>
          </NavItem>
          <NavItem>
            <StyleLink to="/concertlist" onClick={() => dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: false } })}>
              演唱會資訊
            </StyleLink>
          </NavItem>
          {authContext?.loginState && (
            <NavNotifyItem>
              <NotifyBtn onClick={() => dispatch({ type: "toggleIsNotifyOpen" })} num={state.notifyData.length > 0}>
                <StyleNotify />
              </NotifyBtn>
              <NotifyList isNotifyOpen={state.isNotifyOpen}>
                {state.notifyData.length > 0 ? (
                  state.notifyData.map((item) => (
                    <Link to={`/fanssupport?concert=${item.concertId}#${item.postId}`} onClick={() => handleNotify(item.id as string)}>
                      <NotifyItem key={item.id}>
                        <NotifyTitle>{item.title}</NotifyTitle>
                        <NotifyContent>{item.message}</NotifyContent>
                        <NotifyTime>{new Date(item.createdTime.seconds * 1000).toLocaleString()}</NotifyTime>
                      </NotifyItem>
                    </Link>
                  ))
                ) : (
                  <NotifyItem>目前沒有新通知</NotifyItem>
                )}
              </NotifyList>
            </NavNotifyItem>
          )}

          <NavItem>
            {isLogin ? (
              <>
                <PersonalBtn avatar={authContext?.user.avatar ? authContext?.user.avatar : ""} onClick={() => dispatch({ type: "toggleIsPersonalClick" })}></PersonalBtn>
                <PersonalList isPersonalClick={state.isPersonalClick}>
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
