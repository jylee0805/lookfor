import styled, { keyframes } from "styled-components";
const path1 = "M 50,400 C 150,250, 150,560, 300,400 C 450,250, 450,550, 550,400"; // 第一条路径向下移动
const path2 = "M 550,300 C 500,200, 400,450, 300,350 C 200,200, 150,450, 50,300"; // 第二条路径向下移动

const moveAlongPath = keyframes`
  0% {
    offset-distance: 0%;
  }
  50% {
    offset-distance: 100%;
  }
  100% {
    offset-distance: 0%;
  }
`;
const Container = styled.div`
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 2;
  }
`;
const BackgroundItem = styled.div`
  position: fixed;
  //opacity: 0.5;
  z-index: 1;
`;

const BackgroundItem3 = styled(BackgroundItem)`
  /* offset-path: path("${path1}");
  animation: ${moveAlongPath} 15s linear infinite;
  offset-distance: 0%; // 初始位置 */
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000000;
  background-image: linear-gradient(170deg, #191919, 40%, rgba(0, 0, 0, 0) 50%), linear-gradient(180deg, #191919, rgba(255, 0, 0, 0) 60%),
    linear-gradient(150deg, rgba(238, 253, 77, 0.8) 20%, rgba(0, 255, 0, 0) 40%), linear-gradient(150deg, rgba(255, 86, 30, 0.8) 40%, #191919 70%);
  /* background-image: linear-gradient(315deg, #000000 38%, #df550c 61%, #eaf15f 67%, #252323 89%); */
`;
const BackgroundItem1 = styled(BackgroundItem)`
  offset-path: path("${path1}");
  animation: ${moveAlongPath} 15s linear infinite;
  offset-distance: 0%; // 初始位置
  width: 40%;
  height: 60vh;
  top: 60px;
  background: #86cdff;
  clip-path: polygon(0 10%, 30% 0, 60% 40%, 70% 60%, 20% 90%);
`;
const BackgroundItem2 = styled(BackgroundItem)`
  offset-path: path("${path2}");
  animation: ${moveAlongPath} 15s linear infinite;
  offset-distance: 0%;
  width: 30%;
  height: 60vh;
  top: 60px;
  right: 150px;
  background: #e089ff;
  clip-path: polygon(50% 0%, 100% 60%, 100% 100%, 10% 90%);
`;

const BackgroundItem4 = styled(BackgroundItem)`
  offset-path: path("${path1}");
  animation: ${moveAlongPath} 15s linear infinite;
  offset-distance: 0%; // 初始位置
  width: 40%;
  height: 60vh;
  top: 60px;
  background: #ff5213;
  clip-path: polygon(0 10%, 30% 0, 60% 40%, 50% 50%, 20% 100%);
`;
const BackgroundItem5 = styled(BackgroundItem)`
  offset-path: path("${path2}");
  animation: ${moveAlongPath} 15s linear infinite;
  offset-distance: 0%;
  width: 30%;
  height: 60vh;
  top: 60px;
  right: 150px;
  background: #ffe600;
  clip-path: polygon(60% 0%, 100% 50%, 80% 100%, 60% 90%);
`;
function Background() {
  return (
    <Container>
      {/* <BackgroundItem1></BackgroundItem1>
      <BackgroundItem2></BackgroundItem2> */}
      <BackgroundItem4></BackgroundItem4>
      <BackgroundItem5></BackgroundItem5>
      {/* <BackgroundItem3></BackgroundItem3> */}
    </Container>
  );
}

export default Background;
