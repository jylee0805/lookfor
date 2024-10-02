import styled, { keyframes } from "styled-components";

const blobs = keyframes`
  0%{border-radius:26% 74% 61% 39% / 54% 67% 33% 46%}
	10%{border-radius:74% 26% 47% 53% / 68% 46% 54% 32%}
	20%{border-radius:48% 52% 30% 70% / 27% 37% 63% 73%}
	30%{border-radius:73% 27% 57% 43% / 28% 67% 33% 72%}
	40%{border-radius:63% 37% 56% 44% / 25% 28% 72% 75%}
	50%{border-radius:39% 61% 70% 30% / 61% 29% 71% 39%}
	60%{border-radius:27% 73% 29% 71% / 73% 51% 49% 27%}
	70%{border-radius:39% 61% 65% 35% / 74% 65% 35% 26%}
	80%{border-radius:55% 45% 37% 63% / 38% 30% 70% 62%}
	90%{border-radius:25% 75% 70% 30% / 39% 50% 50% 61%}
	100%{border-radius:66% 34% 33% 67% / 65% 73% 27% 35%}
`;
const Container = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
`;
const Title = styled.p`
  background: #ff0000;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 90px;
  font-weight: 700;
  flex-flow: row wrap;
  align-content: center;
  justify-content: center;
`;
const Text = styled.span`
  width: 100%;
  position: relative;
  &::before {
    background: linear-gradient(45deg, #fc5c7d, #6a82fb, #fc5c7d);
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    content: "";
    mix-blend-mode: screen;
  }
`;
const Blob1 = styled.div`
  background: #ff1493;
  width: 60px;
  height: 60px;
  top: 90px;
  left: 210px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;

const Blob2 = styled.div`
  background: #ff4500;
  width: 80px;
  height: 80px;
  top: 155px;
  left: 230px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
const Blob3 = styled.div`
  background: #00ff00;
  width: 60px;
  height: 60px;
  top: 145px;
  left: 20px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
const Blob4 = styled.div`
  background: #ff0000;
  width: 100px;
  height: 100px;
  top: 115px;
  left: 100px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
const Blob5 = styled.div`
  background: #ffff00;
  width: 50px;
  height: 50px;
  top: 55px;
  left: 70px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
const Blob6 = styled.div`
  background: #00ffff;
  width: 60px;
  height: 60px;
  top: 220px;
  left: 55px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
const Blob7 = styled.div`
  background: #ff8c00;
  width: 50px;
  height: 50px;
  top: 210px;
  left: 180px;
  position: absolute;
  mix-blend-mode: color;
  animation: ${blobs} 15s ease-in-out infinite alternate;
`;
function Loading() {
  return (
    <Container>
      <Title>
        <Text>
          THE
          <br />
          BLOBS
        </Text>
      </Title>

      <Blob1></Blob1>
      <Blob2></Blob2>
      <Blob3></Blob3>
      <Blob4></Blob4>
      <Blob5></Blob5>
      <Blob6></Blob6>
      <Blob7></Blob7>
    </Container>
  );
}

export default Loading;
