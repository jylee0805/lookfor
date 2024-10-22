import { useState } from "react";
import "react-photo-view/dist/react-photo-view.css";
import styled from "styled-components";
import { Action, State } from ".";
import Dialog from "../../components/Dialog";
import MoreFeatures from "../../components/MoreFeatures";
import { useDialog } from "../../hooks/useDialog";
import api from "../../utils/api";
import PostContent from "./PostContent";

const List = styled.ul``;
const PostItem = styled.li`
  position: relative;
  display: flex;
  padding: 30px 0;
  & + &::before {
    content: "";
    height: 1px;
    width: 100%;
    background: #8d8d8d;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const HeadShot = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 10px;
  object-fit: cover;
  @media (max-width: 575px) {
    width: 35px;
    height: 35px;
  }
`;
const Hint = styled.p`
  font-size: 28px;
  text-align: center;
  margin-top: 60px;
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  targetRef: React.RefObject<(HTMLLIElement | null)[]>;
}

function PostList({ state, dispatch, targetRef }: Props) {
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const [deleteId, setDeleteId] = useState<string>("");
  const handlerDeleteClick = async (id: string) => {
    setDeleteId(id);
    setIsOpen(true);
  };
  const handleCancel = () => {
    setDeleteId("");
    closeDialog();
  };

  const deleteMerchPost = async () => {
    if (deleteId) {
      await api.deleteMerchPost(deleteId);
    }
    dispatch({ type: "setPostData", payload: { postData: state.postData.filter((post) => post.id != deleteId) } });
    setDeleteId("");
    closeDialog();
  };
  return (
    <List>
      {deleteId !== "" && (
        <Dialog isOpen={isOpen} title="刪除應援物發放貼文" onConfirm={deleteMerchPost} onCancel={handleCancel} confirmText="刪除">
          確認刪除該篇應援物發放貼文?
        </Dialog>
      )}
      {state.postData &&
        state.postData.map((item, index) => (
          <PostItem
            key={item.id}
            id={item.id}
            ref={(el) => {
              if (targetRef.current) {
                targetRef.current[index] = el;
              }
            }}
          >
            <HeadShot src={item.avatar} />
            <PostContent dispatch={dispatch} state={state} item={item} />

            <MoreFeatures
              itemID={item.id}
              onEdit={() => {
                dispatch({ type: "toggleIsEditMode", payload: { isEditMode: item, isPostClick: true } });
              }}
              onDelete={() => handlerDeleteClick(item.id)}
              itemUID={item.userUID}
            />
          </PostItem>
        ))}
      {state.postData.length === 0 && <Hint>目前沒有應援物發放資訊</Hint>}
    </List>
  );
}

export default PostList;
