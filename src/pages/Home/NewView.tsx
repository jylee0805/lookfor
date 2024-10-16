import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { OriginView } from "../../types";

const Container = styled.div`
  z-index: 2;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 60px;
  @media (max-width: 575px) {
    padding: 0;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5%;
  justify-content: space-between;
`;
const Title = styled.h3`
  font-size: 5rem;
  font-family: lihsianti;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
const TitleCh = styled.span`
  font-size: 3rem;
  margin-left: 30px;
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-left: 20px;
  }
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
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 120px;
    margin-top: 20px;
    align-self: flex-end;
  }
`;
const List = styled.ul`
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
  @media (max-width: 768px) {
    height: 240px;
  }
`;
const ListItem = styled.li`
  background: #fff;
  width: 360px;
  flex-shrink: 0;
  position: relative;
  margin-bottom: 10px;
  align-self: flex-start;
  padding: 5px;
  border-radius: 8px;
  cursor: pointer;
  &:nth-child(even) {
    align-self: flex-end;
  }
  @media (max-width: 768px) {
    width: 240px;
  }
`;
const ImgBox = styled.div`
  height: 250px;
  @media (max-width: 768px) {
    height: 160px;
  }
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
`;
const ViewTitle = styled.h4`
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

interface Props {
  scrollContainerRef: React.RefObject<HTMLUListElement>;
}

function NewView({ scrollContainerRef }: Props) {
  const navigate = useNavigate();
  const [NewestView, setNewestView] = useState<OriginView[]>([]);

  useEffect(() => {
    const getNewView = async () => {
      const unsubscribesPost: (() => void)[] = [];
      const unsubscribePost = api.getNewestViewPosts(async (updatedPosts: OriginView[]) => {
        setNewestView(updatedPosts);
      });
      unsubscribesPost.push(await unsubscribePost);
      return () => {
        unsubscribesPost.forEach((unsubscribe) => unsubscribe());
      };
    };
    getNewView();
  }, []);

  const handleViewPostClick = (section: string, row: number, seat: number) => {
    navigate("/view", {
      state: { section, row, seat },
    });
  };
  return (
    <Container>
      <Header>
        <Title>
          New View<TitleCh>最新視角</TitleCh>
        </Title>
      </Header>
      <List ref={scrollContainerRef}>
        {NewestView.map((item) => (
          <ListItem key={item.id} onClick={() => handleViewPostClick(item.section as string, item.row as number, item.seat as number)}>
            <ImgBox>
              <Img src={item.image} />
            </ImgBox>
            <ViewTitle>{`${item.section}區 ${item.row}排 ${item.seat}號`}</ViewTitle>
          </ListItem>
        ))}
      </List>
      <ViewBtn to="/view">更多視角</ViewBtn>
    </Container>
  );
}

export default NewView;
