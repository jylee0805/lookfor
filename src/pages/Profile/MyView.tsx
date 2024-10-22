import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProfileState } from ".";

const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  grid-column: span 2;
  margin-top: 50px;
`;

const PostContainer = styled.ul`
  display: flex;
  overflow-x: auto;
  column-gap: 20px;
  padding: 20px 0;
  margin-bottom: 25px;
  &::-webkit-scrollbar {
    height: 8px;
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
const PostItem = styled.li`
  padding: 15px 20px;
  background: #f8f8f8;
  border-radius: 10px;
  color: #000;
  display: block;
  min-width: 280px;
  max-width: 280px;
`;
const PostTextContainer = styled.div`
  flex-grow: 1;
  min-height: 120px;
`;

const PostTitle = styled.p`
  font-weight: 700;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const PostText = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
const PostImgBox = styled.div`
  width: 100%;
  height: 150px;
  text-align: center;
  margin-top: 20px;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 150px;
    height: 120px;
  }
`;

const PostImg = styled.img`
  object-fit: cover;
  border-radius: 8px;
`;
const Hint = styled.p`
  padding: 10px 15px;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  line-height: 2;
`;

interface Props {
  state: ProfileState;
}

function MyView({ state }: Props) {
  const navigate = useNavigate();
  const handleViewPostClick = (section: string, row: number, seat: number) => {
    navigate("/view", {
      state: { section, row, seat },
    });
  };
  return (
    <>
      <Title>我的視角文章</Title>
      {state.viewPosts.length !== 0 ? (
        <PostContainer>
          {state.viewPosts.map((item) => (
            <PostItem key={item.id} onClick={() => handleViewPostClick(item.section as string, item.row as number, item.seat as number)}>
              <PostTextContainer>
                <PostTitle>{`${item.section}區${item.row}排${item.seat}號`}</PostTitle>
                <PostText>{item.note}</PostText>
                <PostText>{item.content}</PostText>
              </PostTextContainer>
              <PostImgBox>
                <PostImg src={item.image} />
              </PostImgBox>
            </PostItem>
          ))}
        </PostContainer>
      ) : (
        <Hint>尚未發佈視角文章</Hint>
      )}
    </>
  );
}

export default MyView;
