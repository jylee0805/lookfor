import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  max-height: 800px;
  margin-bottom: 60px;
  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
  @media (max-width: 575px) {
    margin-bottom: 30px;
  }
`;
const Banner = styled.div`
  text-align: center;
  padding: 10vh 0 20vh;
`;
const VenueTitle = styled.h2`
  font-size: 6rem;
  line-height: 1.5;
  letter-spacing: 1rem;
  text-align: center;
  font-family: lihsianti;
  color: #fff;
  @media (max-width: 992px) {
    font-size: 5.5rem;
    letter-spacing: 0.1rem;
  }
  @media (max-width: 575px) {
    font-size: 3.5rem;
  }
`;
const VenueSubTitle = styled.h3`
  font-family: lihsianti;
  font-size: 5rem;
  line-height: 1.5;
  letter-spacing: 5px;
  text-align: center;
  color: #fff;
  @media (max-width: 992px) {
    font-size: 3.6rem;
  }
  @media (max-width: 575px) {
    font-size: 2.4rem;
    letter-spacing: 0.2rem;
  }
`;
const Nav = styled.ul`
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 6px #5a5a5a50;
  border: 2px solid #fff;
  border-radius: 50px;
  max-width: fit-content;
  margin: 0 auto 60px;
  padding: 0px 20px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;

const StyleLink = styled(NavLink)`
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: #fff;
  padding: 8px 90px;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to right, #ffe53b, #ff5001 50%, #fff 50%);
  background-size: 200% 100%;
  background-position: 100%;
  transition: all 0.8s ease-in-out;
  &:hover {
    background-position: 0%;
  }
  &.active {
    background-image: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
  }
  @media (max-width: 992px) {
    padding: 8px 50px;
  }
  @media (max-width: 768px) {
    padding: 8px 30px;
    font-size: 1.1rem;
  }
  @media (max-width: 575px) {
    padding: 8px 5px;
    font-size: 1rem;
  }
`;
const TransitionList = styled.ul`
  width: 50%;
  display: none;
  position: absolute;
  background: #000;
  border-radius: 0 0 15px 15px;
  bottom: -105px;
  right: 50%;
  transform: translateX(50%);
  background-image: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);

  @media (max-width: 768px) {
    bottom: -85px;
  }
  @media (max-width: 575px) {
    bottom: -80px;
  }
`;
const NavItem = styled.li`
  border-bottom: 2px solid "#000";
  position: relative;
  &:hover ${TransitionList} {
    display: block;
  }
`;

function VenueHeader() {
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

  return (
    <Container>
      <Banner>
        <VenueTitle> 臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/view" className={({ isActive }) => (isActive ? "active" : "")}>
            視角分享
          </StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-public" className={({ isActive }) => (isActive ? "active" : "")}>
            大眾運輸
          </StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-driving" className={({ isActive }) => (isActive ? "active" : "")}>
            自行開車
          </StyleLink>
        </NavItem>
      </Nav>
    </Container>
  );
}

export default VenueHeader;
