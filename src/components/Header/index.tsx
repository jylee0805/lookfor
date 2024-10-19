import { useContext, useEffect, useReducer, useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../utils/AuthContextProvider";
import { auth, onAuthStateChanged } from "../../utils/firebase";
import Menu from "./Menu";
import NotifyButton from "./NotifyButton";

const StyleMenu = styled(MdMenu)`
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
const NotifyBox = styled.div<{ $show: boolean }>`
  display: none;
  @media (max-width: 575px) {
    display: ${(props) => (props.$show ? "none" : "flex")};
    align-items: center;
    position: relative;
  }
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

export interface State {
  isPersonalClick: boolean;
  isMenuOpen: boolean;
  isNotifyOpen: boolean;
}

export type Action = { type: "toggleIsPersonalClick" } | { type: "toggleIsMenuOpen"; payload: { isMenuOpen: boolean } } | { type: "toggleIsNotifyOpen" };

const initial: State = {
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
      } else {
        setIsLogin(false);
      }
    });
  }, [authContext?.loginState]);

  return (
    <Container>
      <LogoBox to="/">LookFor</LogoBox>
      <NavBox>
        <NotifyBox $show={authContext?.loginState === undefined}>
          <NotifyButton state={state} dispatch={dispatch} />
        </NotifyBox>

        <NavBtn onClick={() => dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: true } })}>
          <StyleMenu />
        </NavBtn>
        <Menu state={state} dispatch={dispatch} isLogin={isLogin} />
      </NavBox>
    </Container>
  );
}

export default Header;
