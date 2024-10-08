import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostState, Action, State } from "./index";
import api from "../../utils/api";
import { IoSend } from "react-icons/io5";
import { MdOutlineMoreVert } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import defaultSeat from "../../images/defaultSeat.png";
import dataSeat from "../../images/dataSeat.png";
import { MdOutlineClose } from "react-icons/md";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { motion } from "framer-motion";

const StyleClose = styled(MdOutlineClose)`
  font-size: 1.96rem;
  margin-right: 4px;
`;

const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.96rem;
`;
const SeatSection = styled.div<{ rowSelect: boolean }>`
  grid-column: span 2;
  margin-top: 80px;
  padding: 0 60px;
  margin-bottom: 80px;

  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  background: #000;
  top: -80px;
  left: ${(props) => (props.rowSelect ? "0" : "-100%")};
  height: 100vh;
  z-index: 10;
  width: 60vw;
  transition: left ease 1s;

  @media (max-width: 1280px) {
    width: 65vw;
  }
  @media (max-width: 992px) {
    grid-column: span 1;
    padding: 0 60px;
    position: fixed;
    margin-bottom: 0;
    top: auto;
    bottom: ${(props) => (props.rowSelect ? "0" : "-100%")};
    left: 0;
    height: 85vh;
    z-index: 10;
    width: 100vw;
    transition: bottom ease 1s;
    border-radius: 20px 20px 0 0;
  }
  @media (max-width: 575px) {
    padding: 0 20px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3f3f3f;
  }

  &::before {
    z-index: -1;

    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: ${(props) => (props.rowSelect ? "0" : "-100%")};
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    width: 20%;
    background: #232222;
    overflow: hidden;
    box-shadow:
      5vw 60vh 0 5vw #535252,
      15vw 30vh 0 10vw #171414,
      19vw -10vh 0 3vw #686868,
      35vw 80vh 0 2vw #716b69;
    filter: blur(12rem);
    transition:
      left ease 1s,
      opacity ease 0.5s; /* 添加過渡 */
    opacity: ${(props) => (props.rowSelect ? 1 : 0)}; /* 控制顯示與隱藏 */
    transition-delay: ${(props) => (props.rowSelect ? "0.2s" : "0s")}; /* 延遲顯示陰影 */

    @media (max-width: 992px) {
      top: 20%;
      left: 0;
      box-shadow:
        5vw 60vh 0 5vw #535252,
        35vw 20vh 0 10vw #171414,
        80vw 20vh 0 3vw #686868,
        35vw 60vh 0 2vw #716b69;
    }
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  margin: 25px 0;
  @media (max-width: 575px) {
    font-size: 1.6rem;
  }
`;
const Card = styled.div`
  border-radius: 10px;
  display: flex;
  column-gap: 35px;
  padding: 15px 20px;
  box-shadow: 3px 3px 3px #000000;
  height: 420px;
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
const UserBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const PostHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 20px;
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 5px;
`;

const FeatureBox = styled.div<{ show: boolean }>`
  margin-left: auto;
  position: relative;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const FeatureList = styled.ul<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  background: #fff;
  width: 70px;
  right: 0;
  border-radius: 8px;
`;
const FeatureItem = styled.li`
  padding: 0;
`;
const FeatureBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
`;
const MoreBtn = styled(FeatureBtn)`
  margin-right: 10px;
`;
const FeatureInnerBtn = styled(FeatureBtn)`
  display: block;
  margin: 0 auto;
  padding: 10px 18px;
  color: #000;
`;
const Seats = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;

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

  @media (max-width: 992px) {
    &::-webkit-scrollbar {
      height: 8px;
    }
  }
`;
const SeatBtn = styled.button<{ haveData: boolean }>`
  padding: 0;
  width: 55px;
  height: 55px;
  margin-bottom: 5px;
  margin-top: 10px;
  background-image: ${(props) => (props.haveData ? `url(${dataSeat})` : `url(${defaultSeat})`)};
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
  background-size: 70px;
  position: relative;
  @media (max-width: 992px) {
    width: 50px;
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    width: 40px;
    margin-right: 8px;
  }
  @media (max-width: 575px) {
    width: 40px;
    height: 50px;
  }
`;
const SeatPoint = styled(motion.div)`
  position: absolute;
  top: -60%;
  left: 32%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid red;

  @media (max-width: 768px) {
    left: 25%;
  }
  @media (max-width: 575px) {
    top: -65%;
  }
`;

const SeatBtnText = styled.span`
  position: absolute;
  display: block;
  width: 55px;
  top: 10px;
  right: 0;
  font-weight: 700;
  @media (max-width: 992px) {
    width: 50px;
  }
  @media (max-width: 768px) {
    width: 40px;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const UserName = styled.p``;
const Note = styled.p`
  margin-bottom: 20px;
`;
const Content = styled.p``;
const Avatar = styled.img`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  @media (max-width: 575px) {
    width: 30px;
    height: 30px;
  }
`;
const CommentSection = styled.div`
  height: 80%;
  overflow-y: auto;
  margin-bottom: 15px;
  &::-webkit-scrollbar {
    width: 8px;
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
    max-height: 150px;
  }
`;
const CommentBox = styled.div`
  margin-bottom: 15px;
`;
const CommentAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  object-fit: cover;
  @media (max-width: 575px) {
    width: 25px;
    height: 25px;
  }
`;
const CommentUserName = styled.p``;
const CommentText = styled.p``;
const EditContainer = styled.div`
  display: flex;
  align-items: center;
`;
const EditCommentText = styled.input`
  margin-top: 5px;
  padding: 5px 15px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
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
`;
const Send = styled.button`
  color: #fff;
  background: none;
  padding: 0 15px;
  border: none;
`;
const NoView = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 40px 0;
`;

const CloseBtn = styled.button`
  margin-left: auto;
  display: block;
  margin-top: 25px;
  background: none;
  border: none;
  color: #fff;
  @media (max-width: 575px) {
    margin-top: 15px;
  }
`;
interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  handlerComment: (id: string) => void;
  deletePost: (id: string) => void;
  deleteComment: (post: string, id: string) => void;
}

interface CommentEdit {
  comment: string;
}

function Seat({ state, handlerComment, deletePost, deleteComment, dispatch }: Props) {
  const { register: registerEditComment, setValue, handleSubmit: handlerEditComment } = useForm<CommentEdit>();
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const authContext = useContext(AuthContext);

  const createSubmitHandler = (postId: string, commentId: string): SubmitHandler<CommentEdit> => {
    const onSubmitEditComment: SubmitHandler<CommentEdit> = async (data) => {
      await api.updateComment(postId, commentId, data.comment);
      console.log("提交成功");
      dispatch({ type: "toggleCommentMode", payload: { isCommentEditMode: "" } });

      const update = state.viewPosts.map((item) => {
        if (item.id == postId) {
          const updatedComments = item.comment?.map((comment) => {
            if (comment.id == commentId) {
              return { ...comment, content: data.comment };
            }
            return comment;
          });
          return { ...item, comment: updatedComments };
        }
        return item;
      });

      dispatch({ type: "setViewPosts", payload: { viewPosts: update } });
    };
    return onSubmitEditComment;
  };

  const handleComment = (id: string, content: string) => {
    setIsMoreClick("");
    dispatch({ type: "toggleCommentMode", payload: { isCommentEditMode: id } });
    setValue("comment", content);
  };
  const handlerEditPost = (post: PostState) => {
    setIsMoreClick("");
    dispatch({ type: "setPostMode", payload: { isPostEditMode: post } });
    dispatch({ type: "togglePostClick", payload: { isPostClick: true } });
    document.body.style.overflow = "hidden";
  };

  const handlerSeat = (value: number) => {
    console.log(value);

    dispatch({ type: "selectSeat", payload: { seat: value } });
  };

  console.log(state.viewPosts);

  return (
    <SeatSection rowSelect={state.isSelectRow}>
      <CloseBtn onClick={() => dispatch({ type: "isSelectRow" })}>
        <StyleClose />
      </CloseBtn>
      <Seats>
        {Array.from({ length: state.rowSeats[state.row] }).map((_, index) => (
          <SeatBtn
            key={index}
            haveData={state.allRowPost?.some((item) => item.row === state.row + 1 && item.seat === index + 1) ?? false}
            onClick={() => {
              handlerSeat(index);
            }}
          >
            <SeatBtnText>{index + 1}</SeatBtnText>
            {state.seat === index && (
              <SeatPoint
                animate={{
                  y: [20, 25, 20], // 垂直跳動的高度
                }}
                transition={{
                  duration: 1, // 每次跳動的持續時間
                  ease: "easeInOut", // 動畫的效果
                  repeat: Infinity, // 無限重複
                  repeatType: "loop", // 重複類型
                }}
              ></SeatPoint>
            )}
          </SeatBtn>
        ))}
      </Seats>

      <Title> 視角分享</Title>
      {state.viewPosts && state.viewPosts.length !== 0 ? (
        state.viewPosts.map((post: PostState, index) => (
          <Card key={index}>
            <PhotoProvider maskOpacity={0.8} bannerVisible={false}>
              <ImgBox>
                <PhotoView src={post.image}>
                  <Img src={post.image} />
                </PhotoView>
              </ImgBox>
            </PhotoProvider>
            <ContentBox>
              <PostHeader>
                <UserBox>
                  <Avatar src={post.avatar} />
                  <UserName>{post.userName}</UserName>
                </UserBox>

                <FeatureBox show={authContext?.loginState === post.userUID}>
                  <FeatureBtn onClick={() => setIsMoreClick((prev) => (prev === post.id ? "" : (post.id as string)))}>
                    <StyleMore />
                  </FeatureBtn>
                  <FeatureList open={isMoreClick === post.id}>
                    <FeatureItem>
                      <FeatureInnerBtn onClick={() => handlerEditPost(post)}>編輯</FeatureInnerBtn>
                    </FeatureItem>
                    <FeatureItem>
                      <FeatureInnerBtn onClick={() => deletePost(post.id)}>刪除</FeatureInnerBtn>
                    </FeatureItem>
                  </FeatureList>
                </FeatureBox>
              </PostHeader>
              <Content>{post.concert}</Content>
              <Content>{post.content}</Content>
              <Note>備註 {post.note}</Note>
              <CommentSection>
                {post.comment &&
                  post.comment.map((comment, index) => (
                    <CommentBox key={index}>
                      <CommentHeader>
                        <UserBox>
                          <CommentAvatar src={comment.avatar} />
                          <CommentUserName>{comment.userName}</CommentUserName>
                        </UserBox>
                        <FeatureBox show={authContext?.loginState === comment.userUID}>
                          <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === comment.id ? "" : (comment.id as string)))}>
                            <StyleMore />
                          </MoreBtn>
                          <FeatureList open={isMoreClick === comment.id}>
                            <FeatureItem>
                              <FeatureInnerBtn onClick={() => handleComment(comment.id, comment.content as string)}>編輯</FeatureInnerBtn>
                            </FeatureItem>
                            <FeatureItem>
                              <FeatureInnerBtn onClick={() => deleteComment(post.id, comment.id)}>刪除</FeatureInnerBtn>
                            </FeatureItem>
                          </FeatureList>
                        </FeatureBox>
                      </CommentHeader>

                      {state.isCommentEditMode === comment.id ? (
                        <EditContainer>
                          <EditCommentText type="text" {...registerEditComment("comment")} />
                          <Send onClick={handlerEditComment(createSubmitHandler(post.id, comment.id))}>
                            <IoSend />
                          </Send>
                        </EditContainer>
                      ) : (
                        <CommentText>{comment.content}</CommentText>
                      )}
                    </CommentBox>
                  ))}
              </CommentSection>
              {authContext?.loginState !== undefined ? (
                <TypeIn>
                  <Type type="text" placeholder="留言..." value={state.comment[post.id]} onChange={(e) => dispatch({ type: "setComment", payload: { id: post.id, commentText: e.target.value } })} />
                  <Send onClick={() => handlerComment(post.id)}>
                    <IoSend />
                  </Send>
                </TypeIn>
              ) : (
                ""
              )}
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
