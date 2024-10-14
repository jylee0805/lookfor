import styled, { keyframes } from "styled-components";
import { useEffect, useContext, useState, useRef } from "react";
import { ComponentContext } from "../../utils/ComponentContextProvider";
import Loading from "../../components/Loading";
import Background from "../Background";
import { MdDoubleArrow } from "react-icons/md";
import NewView from "./NewView";

const moveArrow = keyframes`
 	0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0) rotate(90deg);
  }	40% {
    -webkit-transform: translateY(-30px) rotate(90deg);
  }
   60% {
    -webkit-transform: translateY(-15px) rotate(90deg);
    }
`;

const StyleArrow = styled(MdDoubleArrow)`
  font-size: 60px;
  margin-right: 4px;
  z-index: 20;
  animation: ${moveArrow} 2s infinite;
  transform: rotate(90deg);
  position: absolute;
  bottom: 50px;
  @media (max-width: 768px) {
    font-size: 40px;
  }
  @media (max-width: 575px) {
    font-size: 30px;
  }
`;
const Container = styled.div`
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
const FirstPage = styled.div`
  z-index: 2;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 4.5rem;
  color: #f5f5f5;
  margin-bottom: 30px;
  font-family: lihsianti;
  z-index: 2;
  margin: 0 auto;

  @media (max-width: 992px) {
    font-size: 3.8rem;
  }
  @media (max-width: 768px) {
    align-self: flex-start;
    text-align: left;
    width: 80%;
  }
  @media (max-width: 575px) {
    text-align: center;
    width: 100%;
  }
`;
const SecondTitle = styled.span<{ windowWidth: number }>`
  font-size: 4.5rem;
  color: #f5f5f5;
  margin-bottom: 30px;
  font-family: lihsianti;
  z-index: 2;
  text-align: right;
  @media (max-width: 992px) {
    font-size: 3.8rem;
  }
  @media (max-width: 768px) {
    display: block;
    text-align: right;
  }
  @media (max-width: 575px) {
    text-align: center;
  }
`;
const SubTitle = styled.p`
  font-size: 3.5rem;
  padding-bottom: 80px;
  color: #f5f5f5;
  z-index: 2;
  font-family: lihsianti;
  margin: 0 auto;

  @media (max-width: 992px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2.2rem;
    text-align: left;
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
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollContainer) {
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

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

    if (document.readyState === "complete") {
      checkIfPageIsLoaded();
    } else {
      window.addEventListener("load", checkIfPageIsLoaded);
    }

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("load", checkIfPageIsLoaded);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      {!componentContext?.isHomeLoad && <Loading />}
      <Background />

      <FirstPage>
        <Title>
          尋找理想座位，<SecondTitle windowWidth={windowWidth}>擁有最佳體驗。</SecondTitle>
        </Title>
        <SubTitle>One Show,Countless Views, Infinite Memories.</SubTitle>
        <StyleArrow />
      </FirstPage>
      <NewView scrollContainerRef={scrollContainerRef} />
    </Container>
  );
}

export default Home;
