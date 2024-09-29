import styled from "styled-components";
import Background from "./Background";
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
  font-size: 4rem;
  font-weight: 700;
  color: #f5f5f5;
  margin-bottom: 30px;
  font-family: "chyu";
  z-index: 2;
  @media (max-width: 992px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.1rem;
  }
`;
const SubTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 80px;
  color: #f5f5f5;
  z-index: 2;
  font-family: "chyu";
  @media (max-width: 992px) {
    font-size: 1.8rem;
  }
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;
function Home() {
  return (
    <Container>
      <Background />
      <Title>尋找理想座位，擁有最佳體驗。</Title>
      <SubTitle>One Show, Countless Views, Infinite Memories.</SubTitle>
    </Container>
  );
}

export default Home;
