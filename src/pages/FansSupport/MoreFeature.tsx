import styled from "styled-components";
import api from "../../utils/api";
import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import "react-photo-view/dist/react-photo-view.css";
import { useDialog } from "../../utils/useDialog";
import { Action, State } from ".";
import Dialog from "../../components/Dialog";
import { MerchPost } from "../../types";

const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.8rem;
  margin-right: 4px;
`;
const Container = styled.div`
  position: relative;
  margin-left: 10px;
  position: absolute;
  right: 0;
  top: 25px;
`;

const FeatureBtnContainer = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 3px 10px #67676730;
  right: 0;
  width: 100px;
  border-radius: 10px;
`;
const FeatureBtn = styled.button`
  background: none;
  transition: none;
  border: none;
  &:hover {
    border: none;
    transition: none;
  }
`;

const MoreBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  display: flex;
  align-items: center;
`;
interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  item: MerchPost;
}

function MoreFeature({ state, dispatch, item }: Props) {
  const [isMoreClick, setIsMoreClick] = useState<string>("");
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const handlerDeleteClick = async (id: string) => {
    dispatch({ type: "setDeleteId", payload: { deleteId: id } });
    setIsMoreClick("");
    setIsOpen(true);
  };
  const handleCancel = () => {
    dispatch({ type: "setDeleteId", payload: { deleteId: "" } });
    closeDialog();
  };

  const deleteMerchPost = async () => {
    if (state.deleteId) {
      await api.deleteMerchPost(state.deleteId);
    }
    dispatch({ type: "setPostData", payload: { postData: state.postData.filter((post) => post.id != state.deleteId) } });
    dispatch({ type: "setDeleteId", payload: { deleteId: "" } });
    closeDialog();
  };
  return (
    <Container>
      {state.deleteId !== "" && (
        <Dialog isOpen={isOpen} title="刪除應援物發放貼文" onConfirm={deleteMerchPost} onCancel={handleCancel} confirmText="刪除">
          確認刪除該篇應援物發放貼文?
        </Dialog>
      )}
      <MoreBtn onClick={() => setIsMoreClick((prev) => (prev === item.id ? "" : (item.id as string)))}>
        <StyleMore />
      </MoreBtn>
      <FeatureBtnContainer open={isMoreClick === item.id}>
        <FeatureBtn
          onClick={() => {
            dispatch({ type: "toggleIsEditMode", payload: { isEditMode: item, isPostClick: true } });
            setIsMoreClick("");
          }}
        >
          編輯
        </FeatureBtn>
        <FeatureBtn onClick={() => handlerDeleteClick(item.id ? item.id : "")}>刪除</FeatureBtn>
      </FeatureBtnContainer>
    </Container>
  );
}

export default MoreFeature;
