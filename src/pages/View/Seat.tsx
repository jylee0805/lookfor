import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { PostState, Comment, Action } from "./index";
import api from "../../utils/api";
import Pagination from "@mui/material/Pagination";
import { IoSend } from "react-icons/io5";
import { MdOutlineMoreVert } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import defaultSeat from "../../images/defaultSeat.png";

const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 24px;
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;
const SeatSection = styled.div<{ rowSelect: boolean }>`
  grid-column: span 2;
  margin-top: 80px;
  padding: 0 60px;
  margin-bottom: 80px;
  display: ${(props) => (props.rowSelect ? "block" : "none")};
  color: #fff;
  @media (max-width: 992px) {
    grid-column: span 1;
    padding: 0 60px;
  }
  @media (max-width: 575px) {
    padding: 0 20px;
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  margin: 25px 0;
  @media (max-width: 575px) {
    font-size: 1.2rem;
  }
`;
const Card = styled.div`
  border-radius: 10px;
  display: flex;
  column-gap: 35px;
  padding: 15px 20px;
  box-shadow: 3px 3px 3px #000000;
  height: 480px;
  background: #00000090;
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
  white-space: nowrap;
  overflow-x: scroll;
  text-align: center;
`;
const SeatBtn = styled.button`
  padding: 0;
  width: 45px;
  height: 45px;
  margin-right: 8px;
  background-image: url("${defaultSeat}");
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
  background-size: 72px;
  margin-bottom: 5px;
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
const Note = styled.p``;
const Content = styled.p`
  margin-bottom: 20px;
`;
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
  overflow-y: scroll;
  margin-bottom: 15px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ff9e5a;
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
const EditCommentText = styled.input``;

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
    viewPosts: PostState[];
    viewComments: Comment[];
    comment: { [key: string]: string };
    isCommentEditMode: string;
  };
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    dispatch({ type: "toggleCommentMode", payload: { isCommentEditMode: id } });
    setValue("comment", content);
  };
  const handlerEditPost = (post: PostState) => {
    dispatch({ type: "setPostMode", payload: { isPostEditMode: post } });
    dispatch({ type: "togglePostClick" });
  };
  const handlerChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);

    dispatch({ type: "selectSeat", payload: { seat: value - 1 } });
  };

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
      <Pagination
        count={state.rowSeats[state.row]}
        siblingCount={1}
        boundaryCount={windowWidth >= 992 ? 5 : windowWidth >= 768 ? 4 : windowWidth >= 575 ? 2 : 2}
        size={windowWidth >= 575 ? "large" : "small"}
        onChange={handlerChange}
        sx={{
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
          "& .MuiPaginationItem-root": {
            color: "#fff", // 修改文字顏色
            // 修改背景顏色
            "&:hover": {
              backgroundColor: "#ccc", // 滑鼠懸停時變色
            },
          },
          "& .css-1v2f1lm-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
            background: "#fff",
            color: "#000", // 被選中時的文字顏色
          },
        }}
      />
      <Title> 視角分享</Title>
      {state.viewPosts && state.viewPosts.length !== 0 ? (
        state.viewPosts.map((post: PostState, index) => (
          <Card key={index}>
            <ImgBox>
              <Img src={post.image} />
            </ImgBox>

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
                      {" "}
                      <FeatureInnerBtn onClick={() => deletePost(post.id)}>刪除</FeatureInnerBtn>
                    </FeatureItem>
                  </FeatureList>
                </FeatureBox>
              </PostHeader>
              <Note>場次 {post.concert}</Note>
              <Note>備註 {post.note}</Note>
              <Content>{post.content}</Content>
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
                              {" "}
                              <FeatureInnerBtn onClick={() => deleteComment(post.id, comment.id)}>刪除</FeatureInnerBtn>
                            </FeatureItem>
                          </FeatureList>
                        </FeatureBox>
                      </CommentHeader>

                      {state.isCommentEditMode === comment.id ? (
                        <div>
                          <EditCommentText type="text" {...registerEditComment("comment")} />
                          <Send onClick={handlerEditComment(createSubmitHandler(post.id, comment.id))}>送出</Send>
                        </div>
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
