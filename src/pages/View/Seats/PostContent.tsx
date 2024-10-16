import { useState } from "react";
import styled from "styled-components";
import { Action, State } from "..";
import Dialog from "../../../components/Dialog";
import MoreFeatures from "../../../components/MoreFeatures";
import { useDialog } from "../../../hooks/useDialog";
import { ViewPost } from "../../../types";
import api from "../../../utils/api";

const PostContainer = styled.div`
  display: flex;
  column-gap: 10px;
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
const Note = styled.p``;
const Content = styled.p``;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  post: ViewPost;
}

function PostContent({ state, dispatch, post }: Props) {
  const [deleteViewId, setDeleteViewId] = useState<string>("");
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const handlerEditPost = (post: ViewPost) => {
    dispatch({ type: "setPostMode", payload: { postEdit: post, isPostClick: true, isShowMask: true } });
    document.body.style.overflow = "hidden";
  };

  const handlerClickDelete = (id: string) => {
    setDeleteViewId(id);
    setIsOpen(true);
  };
  const deletePost = async () => {
    await api.deleteViewPost(deleteViewId);

    dispatch({ type: "setViewPosts", payload: { viewPosts: state.viewPosts?.filter((post) => post.id !== deleteViewId) } });
    setDeleteViewId("");
    closeDialog();
  };
  const handleCancel = () => {
    setDeleteViewId("");
    closeDialog();
  };
  return (
    <PostContainer>
      {deleteViewId && (
        <Dialog isOpen={isOpen} title="刪除視角貼文" onConfirm={deletePost} onCancel={handleCancel} confirmText="刪除1">
          確定刪除該篇視角貼文?
        </Dialog>
      )}
      <Avatar src={post.avatar} />
      <PosterContent>
        <UserName>{post.userName}</UserName>
        <Content>{post.concert}</Content>
        {post.content && <Content dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}></Content>}
        {post.note !== "" && <Note>備註 {post.note}</Note>}
      </PosterContent>

      <MoreFeatures itemID={post.id} onEdit={() => handlerEditPost(post)} onDelete={() => handlerClickDelete(post.id)} itemUID={post.userUID} />
    </PostContainer>
  );
}

export default PostContent;
