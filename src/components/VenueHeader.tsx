import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Banner = styled.div`
  text-align: center;
  padding: 180px 0 220px;
`;
const VenueTitle = styled.h2`
  font-size: 6rem;
  line-height: 1.5;
  letter-spacing: 1rem;
  text-align: center;
  font-weight: 700;
  font-family: lihsianti;
  color: #fff;
  @media (max-width: 992px) {
    font-size: 5rem;
    letter-spacing: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 4.5rem;
    letter-spacing: 0.1rem;
  }
  @media (max-width: 575px) {
    font-size: 3rem;
  }
`;
const VenueSubTitle = styled.h3`
  font-family: lihsianti;
  font-size: 5.5rem;
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
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 6px #5a5a5a50;
  border-radius: 50px;
  max-width: fit-content;
  margin: 0 auto 60px;
  padding: 0px 20px;

  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    margin-bottom: 10px;
  }
`;

const StyleLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: #fff;
  padding: 8px 150px;
  &:hover {
    background: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
    background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 992px) {
    padding: 8px 90px;
  }
  @media (max-width: 768px) {
    padding: 8px 60px;
    font-size: 1.1rem;
  }
  @media (max-width: 575px) {
    padding: 8px 20px;
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
const TransitionItem = styled.li`
  text-align: center;
`;
const TransitionLink = styled(StyleLink)`
  padding: 8px 20px;
  display: block;
  margin: 0 auto;
  &:hover {
    color: #000;
  }
`;
function VenueHeader() {
  useEffect(() => {
    const checkIfPageIsLoaded = () => {
      if (document.readyState === "complete") {
        // 頁面完全加載後刷新字型
        if (window._jf && typeof window._jf.flush === "function") {
          window._jf.flush();
          console.log("字型已刷新");
        }
      }
    };

    // 如果頁面已經載入完成，立即執行
    if (document.readyState === "complete") {
      checkIfPageIsLoaded();
    } else {
      // 監聽頁面完全加載的事件
      window.addEventListener("load", checkIfPageIsLoaded);
    }

    // 清除副作用
    return () => {
      window.removeEventListener("load", checkIfPageIsLoaded);
    };
  }, []);

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
          <TransitionList>
            <TransitionItem>
              <TransitionLink to="/transportation-public">大眾運輸</TransitionLink>
            </TransitionItem>
            <TransitionItem>
              <TransitionLink to="/transportation-driving">自行開車</TransitionLink>
            </TransitionItem>
          </TransitionList>
        </NavItem>
      </Nav>
    </>
  );
}

export default VenueHeader;
