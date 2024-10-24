import { Link } from "react-router-dom";
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
const SupportPostTextContainer = styled(PostTextContainer)`
  width: 250px;
  min-height: 120px;
  @media (max-width: 575px) {
    width: 180px;
  }
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
const SupportPostImgBox = styled(PostImgBox)`
  @media (max-width: 992px) {
    width: 180px;
    height: 150px;
    margin: 15px auto 0;
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

const StyleLink = styled(Link)`
  color: #000;
  display: block;
  min-width: 240px;
`;

type Props = {
  state: ProfileState;
};

function MySupport({ state }: Props) {
  return (
    <>
      <Title>我的應援發放公告</Title>
      {state.merchPosts.length !== 0 ? (
        <PostContainer>
          {state.merchPosts.map((item, index) => (
            <PostItem key={item.id}>
              <StyleLink to={`/fanssupport?concert=${item.concertId}#${item.id}`}>
                <SupportPostTextContainer>
                  <PostTitle>{state.concertNames[index]}</PostTitle>
                  <PostText>{item.passDay}</PostText>
                  <PostText>{item.passTime}</PostText>
                  <PostText>{item.passState === "0" ? "尚未發放" : item.passState === "1 " ? "發放中" : "發放完畢"}</PostText>
                </SupportPostTextContainer>
                <SupportPostImgBox>
                  <PostImg src={item.image[0]} />
                </SupportPostImgBox>
              </StyleLink>
            </PostItem>
          ))}
        </PostContainer>
      ) : (
        <Hint>尚未發布應援物資訊</Hint>
      )}
    </>
  );
}

export default MySupport;
