import { useContext, useState } from "react";
import { IoSend } from "react-icons/io5";
import { PhotoProvider, PhotoView } from "react-photo-view";
import styled from "styled-components";
import { ViewPost } from "../../../types";
import api from "../../../utils/api";
import { AuthContext } from "../../../utils/AuthContextProvider";
import CommentsSection from "./CommentsSection";
import PostContent from "./PostContent";

const Card = styled.div`
  border-radius: 10px;
  display: flex;
  column-gap: 35px;
  padding: 15px 15px;
  box-shadow: 3px 3px 3px #000000;
  height: 360px;
  background: #ffffff50;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 20px;
    padding: 25px;
    height: auto;
  }
  @media (max-width: 575px) {
    padding: 15px;
  }
`;
const ImgBox = styled.div`
  width: 50%;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    text-align: center;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const Img = styled.img`
  border-radius: 10px;
  object-fit: contain;
`;
const ContentBox = styled.div`
  width: 60%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const ContentContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #3f3f3f;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff3e7;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #c6c6c6;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const Send = styled.button`
  color: #fff;
  background: none;
  padding: 0 15px;
  border: none;
`;

const TypeIn = styled.div`
  margin-top: auto;
  display: flex;
  padding: 0 5px;
  align-items: center;
`;
const Type = styled.input`
  margin-top: auto;
  padding: 10px 15px;
  flex-grow: 1;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
  @media (max-width: 768px) {
    padding: 8px 15px;
  }
  @media (max-width: 575px) {
    padding: 6px 15px;
  }
`;
interface Props {
  index: number;
  post: ViewPost;
}

function ViewPostCard({ index, post }: Props) {
  const authContext = useContext(AuthContext);
  const [commentText, setCommentText] = useState({ id: "", comment: "" });

  const handlerComment = async (id: string) => {
    const response = (await api.getLoginState()) as string;
    const userName = await api.getUser(response);
    await api.setComment(id, commentText.comment, response, userName.userName);
    setCommentText({ id: id, comment: "" });
  };

  return (
    <Card key={index}>
      <PhotoProvider maskOpacity={0.8} bannerVisible={false}>
        <ImgBox>
          <PhotoView src={post.image}>
            <Img src={post.image} />
          </PhotoView>
        </ImgBox>
      </PhotoProvider>
      <ContentBox>
        <ContentContainer>
          <PostContent post={post} />
          <Line />
          <CommentsSection post={post} />
        </ContentContainer>
        {authContext?.loginState !== undefined ? (
          <TypeIn>
            <Type type="text" placeholder="留言..." value={commentText.comment} onChange={(e) => setCommentText({ id: post.id, comment: e.target.value })} />
            <Send onClick={() => handlerComment(post.id)}>
              <IoSend />
            </Send>
          </TypeIn>
        ) : (
          ""
        )}
      </ContentBox>
    </Card>
  );
}

export default ViewPostCard;
