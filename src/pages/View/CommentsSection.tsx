import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { MdOutlineMoreVert } from "react-icons/md";
import styled from "styled-components";
import { Action, State } from ".";
import Dialog from "../../components/Dialog";
import { ViewPost } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";
import { useDialog } from "../../utils/useDialog";

const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.5rem;
`;

const Avatar = styled.img`
  border-radius: 20px;
  width: 35px;
  height: 35px;
  @media (max-width: 575px) {
    width: 30px;
    height: 30px;
  }
`;
const PosterContent = styled.div`
  flex-grow: 1;
`;
const UserName = styled.p``;
const FeatureBox = styled.div<{ show: boolean }>`
  margin-left: auto;
  position: relative;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 5;
`;

const FeatureBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
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
const FeatureInnerBtn = styled(FeatureBtn)`
  display: block;
  margin: 0 auto;
  padding: 10px 18px;
  color: #000;
`;

const CommentSection = styled.div`
  overflow-y: auto;
  margin-bottom: 15px;
  flex-grow: 1;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #363636;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff3e7;
  }
  @media (max-width: 768px) {
    max-height: 150px;
  }
`;
const CommentContainer = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 15px;
`;
const EditContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
const EditCommentText = styled.input`
  padding: 5px 15px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
`;
const CommentText = styled.p``;
const MoreBtn = styled(FeatureBtn)`
  margin-right: 10px;
`;

const Send = styled.button`
  color: #fff;
  background: none;
  padding: 0 15px;
  border: none;
`;

interface CommentEdit {
  comment: string;
}
interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  post: ViewPost;
}

function CommentsSection({ state, dispatch, post }: Props) {
  const { register: registerEditComment, setValue, handleSubmit: handlerEditComment } = useForm<CommentEdit>();
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const authContext = useContext(AuthContext);

  const createSubmitHandler = (postId: string, commentId: string): SubmitHandler<CommentEdit> => {
    const onSubmitEditComment: SubmitHandler<CommentEdit> = async (data) => {
      await api.updateComment(postId, commentId, data.comment);
      dispatch({ type: "setCommentMode", payload: { commentEdit: "" } });

      const update = state.viewPosts?.map((item) => {
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
    dispatch({ type: "setCommentMode", payload: { commentEdit: id } });
    setValue("comment", content);
  };

  const handlerClickCommentDelete = (post: string, id: string) => {
    dispatch({ type: "setDeleteComment", payload: { viewId: post, deleteCommentId: id } });
    setIsOpen(true);
  };
  const deleteComment = async () => {
    await api.deleteComment(state.viewId, state.deleteCommentId);
    dispatch({ type: "setViewPosts", payload: { viewPosts: state.viewPosts?.map((post) => ({ ...post, comment: post.comment?.filter((comment) => comment.id !== state.deleteCommentId) })) } });
    closeDialog();
  };

  const handleCancel = () => {
    if (state.deleteViewId !== "") {
      dispatch({ type: "setDeleteViewId", payload: { deleteViewId: "" } });
    } else if (state.deleteCommentId !== "") {
      dispatch({ type: "setDeleteComment", payload: { viewId: "", deleteCommentId: "" } });
    }
    closeDialog();
  };
  return (
    <CommentSection>
      {state.deleteCommentId && (
        <Dialog isOpen={isOpen} title="刪除留言" onConfirm={deleteComment} onCancel={handleCancel} confirmText="刪除">
          確定刪除留言?
        </Dialog>
      )}
      {post.comment &&
        post.comment.map((comment, index) => (
          <CommentContainer key={index}>
            <Avatar src={comment.avatar} />
            <PosterContent>
              <UserName>{comment.userName}</UserName>
              {state.commentEdit === comment.id ? (
                <EditContainer>
                  <EditCommentText type="text" {...registerEditComment("comment")} />
                  <Send onClick={handlerEditComment(createSubmitHandler(post.id, comment.id))}>
                    <IoSend />
                  </Send>
                </EditContainer>
              ) : (
                <CommentText>{comment.content}</CommentText>
              )}
            </PosterContent>
            <FeatureBox show={authContext?.loginState === comment.userUID}>
              <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === comment.id ? "" : (comment.id as string)))}>
                <StyleMore />
              </MoreBtn>
              <FeatureList open={isMoreClick === comment.id}>
                <FeatureItem>
                  <FeatureInnerBtn onClick={() => handleComment(comment.id, comment.content as string)}>編輯</FeatureInnerBtn>
                </FeatureItem>
                <FeatureItem>
                  <FeatureInnerBtn onClick={() => handlerClickCommentDelete(post.id, comment.id)}>刪除</FeatureInnerBtn>
                </FeatureItem>
              </FeatureList>
            </FeatureBox>
          </CommentContainer>
        ))}
    </CommentSection>
  );
}

export default CommentsSection;
