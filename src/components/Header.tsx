import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";
import api from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { auth, onAuthStateChanged } from "../utils/firebase";
import { AuthContext } from "../utils/AuthContextProvider";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 48px;
`;
const LogoBox = styled.div`
  width: 140px;
`;
const Logo = styled.img``;
const Nav = styled.ul`
  display: flex;
  align-items: center;
`;
const StyleLink = styled(Link)`
  font-size: 20px;
  padding: 20px 24px;
  color: #000000;
`;
const LogOutBtn = styled.button`
  font-size: 20px;
  padding: 20px 24px;
  color: #000000;
  background: none;
`;
function Header() {
  const authContext = useContext(AuthContext);

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
  };

  return (
    <Container>
      <LogoBox>
        <Logo src={logo} />
      </LogoBox>
      <Nav>
        <li>
          <StyleLink to="/view">場地</StyleLink>
        </li>
        <li>
          <StyleLink to="/concertlist">演唱會資訊</StyleLink>
        </li>
        <li>{isLogin ? <LogOutBtn onClick={handlerLogout}>登出</LogOutBtn> : <StyleLink to="/login">登入</StyleLink>}</li>
      </Nav>
    </Container>
  );
}

export default Header;
