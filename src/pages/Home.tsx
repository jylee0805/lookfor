import styled from "styled-components";
import Background from "./Background";
import { useEffect } from "react";
const Container = styled.div`
  height: calc(100vh - 60px);
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
const Title = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
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
    font-size: 1.6rem;
  }
`;
const SubTitle = styled.p`
  font-size: 3.5rem;
  font-weight: 700;
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
    font-size: 1.3rem;
  }
`;
function Home() {
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
    <Container>
      <Background />
      <Title>尋找理想座位，擁有最佳體驗。</Title>
      <SubTitle>One Show, Countless Views, Infinite Memories.</SubTitle>
    </Container>
  );
}

export default Home;
