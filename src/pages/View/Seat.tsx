import styled from "styled-components";
import avatar from "../../images/avatar.jpg";
import view from "../../images/view.jpg";
import { useState } from "react";

const SeatSection = styled.div`
  grid-column: span 2;
  margin-top: 80px;
  padding: 0 100px;
  margin-bottom: 80px;
`;
const Seats = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: center;
`;
const Title = styled.h4`
  font-size: 32px;
  font-weight: 600;
`;
const SeatBtn = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Img = styled.img`
  border-radius: 10px;
  width: 50%;
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
const Comment = styled.p``;

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
interface Post {
  image: string;
  note: string;
  content: string;
}
interface Comment {
  content: string;
  userUID: string;
}
interface Props {
  state: {
    allSeats: number[];
    section: string;
    row: number;
    seat: number;
    isSelectRow: boolean;
    viewPosts: Post[];
    viewComments: Comment[];
  };
  handlerSeat: (seat: number) => void;
  handlerComment: (id: string, content: string) => void;
}

function Seat({ state, handlerSeat, handlerComment }: Props) {
  const [comment, setComment] = useState("");
  console.log(comment);

  return (
    <SeatSection>
      <Seats>
        {state.isSelectRow &&
          Array.from({ length: state.allSeats[state.row] }).map((_, index) => (
            <SeatBtn
              key={index}
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
        state.viewPosts.map((post, index) => (
          <Card key={index}>
            <Img src={post.image} />
            <ContentBox>
              <UserBox>
                <Avatar src={avatar} />
                <UserName>User Name</UserName>
              </UserBox>
              <Note>{post.note}</Note>
              <Content>{post.content}</Content>
              <CommentSection>
                {state.viewComments &&
                  state.viewComments.map((comment, index) => (
                    <CommentBox key={index}>
                      <UserBox>
                        <CommentAvatar src={avatar} />
                        <CommentUserName>User Name</CommentUserName>
                      </UserBox>
                      <Comment>{comment.content}</Comment>
                    </CommentBox>
                  ))}
              </CommentSection>
              <TypeIn>
                <Type type="text" placeholder="留言..." value={comment} onChange={(e) => setComment(e.target.value)} />
                <Send onClick={() => handlerComment(post.id, comment)}>送出</Send>
              </TypeIn>
            </ContentBox>
          </Card>
        ))
      ) : (
        <p>暫時沒有視角</p>
      )}
    </SeatSection>
  );
}

export default Seat;