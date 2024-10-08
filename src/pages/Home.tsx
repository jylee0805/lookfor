import styled from "styled-components";
import Background from "./Background";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ComponentContext } from "../utils/ComponentContextProvider";
import Loading from "../components/Loading";

const Container = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  padding: 0 80px;
  flex-direction: column;
  text-align: center;
  z-index: 2;

  @media (max-width: 992px) {
    padding: 0 40px;
  }
`;
const ViewBtn = styled(Link)`
  z-index: 2;
  color: #fff;
  font-size: 1.2rem;
  background: #ff7645;
  display: block;
  width: 160px;
  padding: 8px 15px;
  border-radius: 35px;
  margin: 0 auto;
`;
const Title = styled.h2`
  font-size: 4.5rem;

  color: #f5f5f5;
  margin-bottom: 30px;
  font-family: lihsianti;
  z-index: 2;
  @media (max-width: 992px) {
    font-size: 3.8rem;
  }
  @media (max-width: 768px) {
    font-size: 2.7rem;
  }
  @media (max-width: 575px) {
    font-size: 1.75rem;
  }
`;
const SubTitle = styled.p`
  font-size: 3.5rem;

  padding-bottom: 80px;
  color: #f5f5f5;
  z-index: 2;
  font-family: lihsianti;
  @media (max-width: 992px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  @media (max-width: 575px) {
    font-size: 1.4rem;
  }
`;
declare global {
  interface Window {
    _jf?: {
      flush: () => void;
    };
  }
}
function Home() {
  const componentContext = useContext(ComponentContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
      componentContext?.setIsHomeLoad(true);
    }, 4000);
    const checkIfPageIsLoaded = () => {
      if (window._jf && typeof window._jf.flush === "function") {
        window._jf.flush();
        console.log("字型已刷新");
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
      clearTimeout(timer);
    };
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     document.body.style.overflowY = "auto";
  //     componentContext?.setIsHomeLoad(true);
  //   }, 4000);

  //   // 清除定时器，避免内存泄漏
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <Container>
      {!componentContext?.isHomeLoad && <Loading />}
      <Background />

      <Title>尋找理想座位，擁有最佳體驗。</Title>
      <SubTitle>One Show, Countless Views, Infinite Memories.</SubTitle>
      <ViewBtn to="/view">前往查看視角</ViewBtn>
    </Container>
  );
}

export default Home;
