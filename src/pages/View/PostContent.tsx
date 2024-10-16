import styled from "styled-components";
import { Action, State } from ".";
import { ViewPost } from "../../types";
import api from "../../utils/api";
import { MdOutlineMoreVert } from "react-icons/md";
import { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import Dialog from "../../components/Dialog";
import { useDialog } from "../../utils/useDialog";

const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.5rem;
`;

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

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  post: ViewPost;
}

function PostContent({ state, dispatch, post }: Props) {
  const authContext = useContext(AuthContext);
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const handlerEditPost = (post: ViewPost) => {
    setIsMoreClick("");
    dispatch({ type: "setPostMode", payload: { postEdit: post, isPostClick: true, isShowMask: true } });
    document.body.style.overflow = "hidden";
  };

  const handlerClickDelete = (id: string) => {
    dispatch({ type: "setDeleteViewId", payload: { deleteViewId: id } });
    setIsOpen(true);
  };
  const deletePost = async () => {
    await api.deleteViewPost(state.deleteViewId);

    dispatch({ type: "deletePost", payload: { viewPosts: state.viewPosts?.filter((post) => post.id !== state.deleteViewId), deleteViewId: "" } });

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
    <PostContainer>
      {state.deleteViewId && (
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
      <FeatureBox show={authContext?.loginState === post.userUID}>
        <FeatureBtn onClick={() => setIsMoreClick((prev) => (prev === post.id ? "" : (post.id as string)))}>
          <StyleMore />
        </FeatureBtn>
        <FeatureList open={isMoreClick === post.id}>
          <FeatureItem>
            <FeatureInnerBtn onClick={() => handlerEditPost(post)}>編輯</FeatureInnerBtn>
          </FeatureItem>
          <FeatureItem>
            <FeatureInnerBtn onClick={() => handlerClickDelete(post.id)}>刪除</FeatureInnerBtn>
          </FeatureItem>
        </FeatureList>
      </FeatureBox>
    </PostContainer>
  );
}

export default PostContent;
