import styled, { keyframes } from "styled-components";
import { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ComponentContext } from "../utils/ComponentContextProvider";
import Loading from "../components/Loading";
import Background from "./Background";
import api from "../utils/api";
import { OriginView } from "./View";
import { MdDoubleArrow } from "react-icons/md";

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
const NewView = styled.div`
  height: 100vh;
  z-index: 2;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -30px;
`;
const NewViewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5%;
  justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 5rem;
  font-family: lihsianti;
  text-align: left;
`;
const SectionTitleCh = styled.span`
  font-size: 3rem;
  margin-left: 30px;
`;
const ViewBtn = styled(Link)`
  z-index: 2;
  color: #000;
  font-weight: 700;
  font-size: 1.2rem;
  background: #fff;
  display: block;
  width: 160px;
  padding: 8px 15px;
  border-radius: 35px;
  align-self: center;
  margin-top: 40px;
`;

const NewViewList = styled.ul`
  display: flex;
  overflow-x: scroll;
  column-gap: 20px;
  overflow-y: hidden;
  height: 360px;

  &::-webkit-scrollbar {
    height: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3f3f3f;
  }
`;
const NewViewItem = styled.li`
  background: #fff;
  width: 360px;
  flex-shrink: 0;
  position: relative;
  margin-bottom: 10px;
  align-self: flex-start;
  padding: 5px;
  &:nth-child(even) {
    align-self: flex-end;
  }
`;
const NewViewImgBox = styled.div`
  height: 250px;
`;
const NewViewImg = styled.img`
  object-fit: cover;
  width: 100%;
`;
const NewViewTitle = styled.h4`
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2;
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #00000095;
  width: 160px;
  padding: 5px 20px 5px 5px;
  text-align: right;
`;

declare global {
  interface Window {
    _jf?: {
      flush: () => void;
    };
  }
}
function Home() {
  const navigate = useNavigate();
  const componentContext = useContext(ComponentContext);
  const [NewestView, setNewestView] = useState<OriginView[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // 防止默認的垂直滾動
      if (scrollContainer) {
        scrollContainer.scrollLeft += e.deltaY; // 使用垂直滾動來控制水平滾動
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
    const getNewView = async () => {
      const unsubscribesPost: (() => void)[] = [];

      const unsubscribePost = api.getNewestViewPosts(async (updatedPosts: OriginView[]) => {
        setNewestView(updatedPosts);
      });
      unsubscribesPost.push(await unsubscribePost);

      // 清除訂閱
      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };

    getNewView();

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

  const handleViewPostClick = (section: string, row: number, seat: number) => {
    navigate("/view", {
      state: { section, row, seat },
    });
  };
  return (
    <Container>
      {!componentContext?.isHomeLoad && <Loading />}
      <Background />

      <FirstPage>
        <Title>尋找理想座位，擁有最佳體驗。</Title>
        <SubTitle>One Show, Countless Views, Infinite Memories.</SubTitle>
        <StyleArrow />
      </FirstPage>

      <NewView>
        <NewViewHeader>
          <SectionTitle>
            New View<SectionTitleCh>最新視角</SectionTitleCh>
          </SectionTitle>{" "}
          <ViewBtn to="/view">更多視角...</ViewBtn>
        </NewViewHeader>

        <NewViewList ref={scrollContainerRef}>
          {NewestView.map((item) => (
            <NewViewItem key={item.id} onClick={() => handleViewPostClick(item.section as string, item.row as number, item.seat as number)}>
              <NewViewImgBox>
                <NewViewImg src={item.image} />
              </NewViewImgBox>

              <NewViewTitle>{`${item.section}區 ${item.row}排 ${item.seat}號`}</NewViewTitle>
            </NewViewItem>
          ))}
        </NewViewList>
      </NewView>
    </Container>
  );
}

export default Home;
