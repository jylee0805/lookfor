import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";

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
`;

const StyleLink = styled(Link)`
  font-size: 20px;
  padding: 20px 24px;
  color: #000000;
`;
function Header() {
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
          <StyleLink to="/view">演唱會資訊</StyleLink>
        </li>
        <li>
          <StyleLink to="/view">登入</StyleLink>
        </li>
      </Nav>
    </Container>
  );
}

export default Header;
