import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import styled from "styled-components";
import Dialog from "../../../components/Dialog";
import MoreFeatures from "../../../components/MoreFeatures";
import { useDialog } from "../../../hooks/useDialog";
import { ViewAction, ViewPost, ViewState } from "../../../types";
import api from "../../../utils/api";

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

const Send = styled.button`
  color: #fff;
  background: none;
  padding: 0 15px;
  border: none;
`;

type CommentEdit = {
  comment: string;
};
interface Props {
  post: ViewPost;
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
}

function CommentsSection({ post, state, dispatch }: Props) {
  const { register: registerEditComment, setValue, handleSubmit: handlerEditComment } = useForm<CommentEdit>();
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const [commentEdit, setCommentEdit] = useState<string>("");
  const [deleteCommentId, setDeleteComment] = useState({ viewId: "", commentId: "" });

  const createSubmitHandler = (postId: string, commentId: string): SubmitHandler<CommentEdit> => {
    const onSubmitEditComment: SubmitHandler<CommentEdit> = async (data) => {
      await api.updateComment(postId, commentId, data.comment);
      setCommentEdit("");
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
    setCommentEdit(id);
    setValue("comment", content);
  };

  const handlerClickCommentDelete = (post: string, id: string) => {
    setDeleteComment({ viewId: post, commentId: id });
    setIsOpen(true);
  };
  const deleteComment = async () => {
    await api.deleteComment(deleteCommentId.viewId, deleteCommentId.commentId);
    dispatch({ type: "setViewPosts", payload: { viewPosts: state.viewPosts?.map((post) => ({ ...post, comment: post.comment?.filter((comment) => comment.id !== deleteCommentId.commentId) })) } });
    closeDialog();
  };

  const handleCancel = () => {
    setDeleteComment({ viewId: "", commentId: "" });
    closeDialog();
  };
  return (
    <CommentSection>
      {deleteCommentId.commentId && (
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
              {commentEdit === comment.id ? (
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

            <MoreFeatures
              itemID={comment.id}
              onEdit={() => handleComment(comment.id, comment.content as string)}
              onDelete={() => handlerClickCommentDelete(post.id, comment.id)}
              itemUID={comment.userUID}
            />
          </CommentContainer>
        ))}
    </CommentSection>
  );
}

export default CommentsSection;
