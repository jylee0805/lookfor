import styled from "styled-components";
import avatar from "../../images/avatar.jpg";

import { Post, Comment, Action } from "./index";

const SeatSection = styled.div<{ rowSelect: boolean }>`
  grid-column: span 2;
  margin-top: 80px;
  padding: 0 100px;
  margin-bottom: 80px;
  display: ${(props) => (props.rowSelect ? "block" : "none")};
`;
const Seats = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: center;
  overflow-x: scroll;
  padding-left: 480px;
`;
const Title = styled.h4`
  font-size: 32px;
  font-weight: 600;
`;
const SeatBtn = styled.button<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => (props.selected ? "#328c48" : "transparent")};
`;
const Card = styled.div`
  border-radius: 10px;
  display: flex;
  column-gap: 35px;
  padding: 15px 20px;
  box-shadow: 3px 3px 3px #d2d2d2;
  height: 520px;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  column-gap: 10px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const FeatureBtn = styled.button``;
const ImgBox = styled.div`
  width: 50%;
  text-align: center;
`;
const Img = styled.img`
  border-radius: 10px;
`;
const ContentBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const UserName = styled.p``;
const Note = styled.p``;
const Content = styled.p`
  margin-bottom: 20px;
`;
const Avatar = styled.img`
  border-radius: 20px;
  width: 40px;
  height: 40px;
`;
const CommentSection = styled.div`
  height: 80%;
  overflow-y: scroll;
`;
const CommentBox = styled.div``;
const CommentAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
`;
const CommentUserName = styled.p``;
const CommentText = styled.p``;

const TypeIn = styled.div`
  margin-top: auto;
  display: flex;
  padding: 0 5px;
`;

const Type = styled.input`
  margin-top: auto;
  padding: 10px 5px;
  flex-grow: 1;
`;
const Send = styled.button``;
const NoView = styled.p`
  font-size: 24px;
  text-align: center;
  margin: 40px 0;
`;
interface Props {
  state: {
    rowSeats: number[];
    section: string;
    row: number;
    seat: number;
    isSelectRow: boolean;
    viewPosts: Post[];
    viewComments: Comment[];
    comment: { [key: string]: string };
  };
  dispatch: React.Dispatch<Action>;
  handlerSeat: (seat: number) => void;
  handlerComment: (id: string) => void;
  deletePost: (id: string) => void;
  deleteComment: (post: string, id: string) => void;
}

function Seat({ state, handlerSeat, handlerComment, deletePost, deleteComment, dispatch }: Props) {
  return (
    <SeatSection rowSelect={state.isSelectRow}>
      <Seats>
        {Array.from({ length: state.rowSeats[state.row] }).map((_, index) => (
          <SeatBtn
            key={index}
            selected={state.seat === index}
            onClick={() => {
              handlerSeat(index);
            }}
          >
            {index + 1}
          </SeatBtn>
        ))}
      </Seats>
      <Title> 視角分享</Title>
      {state.viewPosts && state.viewPosts.length !== 0 ? (
        state.viewPosts.map((post: Post, index) => (
          <Card key={index}>
            <ImgBox>
              <Img src={post.image} />
            </ImgBox>

            <ContentBox>
              <PostHeader>
                <UserBox>
                  <Avatar src={avatar} />
                  <UserName>{post.userName}</UserName>
                </UserBox>
                <FeatureBtn>編輯</FeatureBtn>
                <FeatureBtn onClick={() => deletePost(post.id)}>刪除</FeatureBtn>
              </PostHeader>
              <Note>{post.concert}</Note>
              <Note>{post.note}</Note>
              <Content>{post.content}</Content>
              <CommentSection>
                {post.comment &&
                  post.comment.map((comment, index) => (
                    <CommentBox key={index}>
                      <CommentHeader>
                        <UserBox>
                          <CommentAvatar src={avatar} />
                          <CommentUserName>{comment.userName}</CommentUserName>
                        </UserBox>
                        <FeatureBtn>編輯</FeatureBtn>
                        <FeatureBtn onClick={() => deleteComment(post.id, comment.id)}>刪除</FeatureBtn>
                      </CommentHeader>

                      <CommentText>{comment.content}</CommentText>
                    </CommentBox>
                  ))}
              </CommentSection>
              <TypeIn>
                <Type type="text" placeholder="留言..." value={state.comment[post.id]} onChange={(e) => dispatch({ type: "setComment", payload: { id: post.id, commentText: e.target.value } })} />
                <Send onClick={() => handlerComment(post.id)}>送出</Send>
              </TypeIn>
            </ContentBox>
          </Card>
        ))
      ) : (
        <NoView>暫時沒有視角</NoView>
      )}
    </SeatSection>
  );
}

export default Seat;
