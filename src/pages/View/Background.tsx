import styled from "styled-components";
const Container = styled.div`
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(300px);
    z-index: -1;
  }
`;
const BackgroundItem = styled.div`
  position: fixed;
  opacity: 0.5;
  z-index: -2;
`;
const BackgroundItem1 = styled(BackgroundItem)`
  width: 60%;
  height: 60vh;
  top: 0;
  background: #ffee55;
  clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
`;
const BackgroundItem2 = styled(BackgroundItem)`
  width: 40%;
  height: 60vh;
  top: 10%;
  right: 150px;
  background: #fa5de3;
  clip-path: polygon(50% 0%, 100% 60%, 100% 100%, 10% 90%);
`;
const BackgroundItem3 = styled(BackgroundItem)`
  width: 60%;
  height: 40vh;
  top: 70%;
  left: 10%;
  background: #8bb7f8;
  clip-path: polygon(30% 0, 100% 70%, 100% 100%, 20% 90%);
`;

function Background() {
  return (
    <Container>
      <BackgroundItem1></BackgroundItem1>
      <BackgroundItem2></BackgroundItem2>
      <BackgroundItem3></BackgroundItem3>
      {/* 
      <BackgroundItem4></BackgroundItem4> */}
    </Container>
  );
}

export default Background;
