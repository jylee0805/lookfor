import styled, { keyframes } from "styled-components";

const spotlight = keyframes`
  0% {
    clip-path: circle(100px at 0% 0%);
    -webkit-clip-path: circle(100px at 0% 50%);
  }
  50% {
    clip-path: circle(100px at 0% 50%);
    -webkit-clip-path: circle(100px at 100% 50%);
  }
  100% {
    clip-path: circle(100px at 0% 50%);
    -webkit-clip-path: circle(100px at 0% 50%);
  }
`;
const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;
  z-index: 50;
  text-align: center;
  background: #000;
  &::before {
    z-index: -1;

    content: "";
    position: fixed;
    top: 0%;
    right: -20vw;
    display: block;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    width: 60vw;
    background: #232222;

    box-shadow:
      -50vw 20vh 0 0 #1b1a1a,
      90vw 0vh 0 75vw #ffe600,
      -45vw -30vh 0 25vw #181818,
      -90vw 20vh 0 20vw #ff5213,
      -10vw -10vh 0 25vw #ff3714,
      20vw 80vh 0 100vw #000000;
    filter: blur(12rem);
  }
`;
const Title = styled.p`
  color: #373535;
  font-size: 6rem;
  height: 72px;
  font-family: "Kalam", cursive;
  font-weight: 700;
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    font-size: 5.5rem;
  }
  @media (max-width: 575px) {
    font-size: 4rem;
  }
  @media (max-width: 420px) {
    font-size: 3.2rem;
  }
  &::after {
    content: "Look For";
    font-family: "Kalam", cursive;
    font-weight: 700;
    color: transparent;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -50%);
    background: -webkit-linear-gradient(left, #e13f1a, #4e6dbb, #01e7e7, yellow, #b43782, #2e86de);
    background-clip: text;
    -webkit-background-clip: text;
    clip-path: circle(100px at 0% 50%);
    -webkit-clip-path: circle(100px at 0% 50%);
    animation: ${spotlight} 6s infinite;
  }
`;

function Loading() {
  document.body.style.overflowY = "hidden";
  return (
    <Container>
      <Title></Title>
    </Container>
  );
}

export default Loading;
