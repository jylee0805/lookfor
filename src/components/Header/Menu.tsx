import { useContext } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Action, State } from ".";
import { AuthContext } from "../../utils/AuthContextProvider";
import NotifyButton from "./NotifyButton";
import PersonalButton from "./PersonalButton";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;

const Nav = styled.ul<{ $isMenuOpen: boolean }>`
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
    width: 50%;
    right: ${(props) => (props.$isMenuOpen ? "0" : " -100%")};
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
    padding: 10px 15px;
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
type Props = {
  state: State;
  dispatch: React.Dispatch<Action>;
  isLogin: boolean;
};

function Menu({ state, dispatch, isLogin }: Props) {
  const authContext = useContext(AuthContext);
  return (
    <Nav $isMenuOpen={state.isMenuOpen}>
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
          <NotifyButton state={state} dispatch={dispatch} />
        </NavNotifyItem>
      )}

      <NavItem>{isLogin ? <PersonalButton dispatch={dispatch} state={state} /> : <StyleLink to="/login">登入</StyleLink>}</NavItem>
    </Nav>
  );
}

export default Menu;
