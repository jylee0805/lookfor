import styled from "styled-components";
import { Link } from "react-router-dom";

const Banner = styled.div`
  text-align: center;
  padding: 160px 0 200px;
`;
const VenueTitle = styled.h2`
  font-size: 5rem;
  line-height: 1.5;
  letter-spacing: 1rem;
  text-align: center;
  font-weight: 700;
  font-family: "chyu";
  color: #fff;
  @media (max-width: 992px) {
    font-size: 4rem;
    letter-spacing: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 3.7rem;
    letter-spacing: 0.1rem;
  }
  @media (max-width: 575px) {
    font-size: 2.4rem;
  }
`;
const VenueSubTitle = styled.h3`
  font-family: "chyu";
  font-size: 5rem;
  line-height: 1.5;
  letter-spacing: 5px;
  text-align: center;
  font-weight: 700;

  color: #fff;
  @media (max-width: 992px) {
    font-size: 4rem;
  }
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  @media (max-width: 575px) {
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }
`;
const Nav = styled.ul`
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  margin-bottom: 42px;
`;
const NavItem = styled.li`
  border-bottom: 2px solid "#000";
`;
const StyleLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: #000;
  padding: 10px 30px;
  @media (max-width: 575px) {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #ff3cac;
    background-image: linear-gradient(225deg, #f3008a 0%, #a97cd1 50%, #2a90da 100%);
    -webkit-background-clip: text; /* 確保漸變應用於文字 */
    -webkit-text-fill-color: transparent; /* 將文字填充顏色設為透明 */
  }
`;

function VenueHeader() {
  return (
    <>
      <Banner>
        <VenueTitle> 臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/view">視角分享</StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-public">交通資訊</StyleLink>
        </NavItem>
      </Nav>
    </>
  );
}

export default VenueHeader;
