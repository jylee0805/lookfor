import { useContext, useState } from "react";
import { FaSort } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import "react-photo-view/dist/react-photo-view.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Action, State } from ".";
import Dialog from "../../components/Dialog";
import { useDialog } from "../../hooks/useDialog";
import { AuthContext } from "../../utils/AuthContextProvider";

const StyleSort = styled(FaSort)`
  font-size: 1.5rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;
const StyleAdd = styled(MdOutlineAdd)`
  font-size: 1.5rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;

const FeatureBox = styled.div`
  display: flex;
  justify-content: end;
  margin-left: auto;
  @media (max-width: 575px) {
    justify-content: center;
    margin: 0 auto;
  }
`;
const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  color: #fff;
  border: none;
  @media (max-width: 575px) {
    padding: 10px 15px;
  }
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddPost({ state, dispatch }: Props) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isOpen, setIsOpen, closeDialog } = useDialog();
  const [sort, setSort] = useState<string>("createdTime");
  const handleSort = () => {
    if (sort === "createdTime") {
      const sortList = [...state.postData].sort((a, b) => {
        const dayDifference = a.passDay.localeCompare(b.passDay);

        if (dayDifference !== 0) {
          return dayDifference;
        }
        return a.passTime.localeCompare(b.passTime);
      });
      setSort("passTime");
      dispatch({ type: "setPostData", payload: { postData: sortList } });
    } else {
      const sortList = [...state.postData].sort((a, b) => {
        return b.createdTime.seconds - a.createdTime.seconds;
      });
      setSort("createdTime");
      dispatch({ type: "setPostData", payload: { postData: sortList } });
    }
  };
  const handleConfirm = () => {
    navigate("/login");
    closeDialog();
  };
  const handlePostClick = () => {
    if (authContext?.loginState === null || authContext?.loginState === undefined) {
      setIsOpen(true);
      document.body.style.overflowY = "hidden";
      return;
    }
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: true } });
  };

  return (
    <FeatureBox>
      {authContext?.loginState === undefined && (
        <Dialog isOpen={isOpen} title="您尚未登入" onConfirm={handleConfirm} onCancel={closeDialog} confirmText="前往登入">
          是否前往登入執行更多功能?
        </Dialog>
      )}
      <ActionBtn onClick={() => handleSort()}>
        <StyleSort />
        {sort === "createdTime" ? "依發放時間排序" : "依貼文發布時間排序"}
      </ActionBtn>
      <ActionBtn onClick={() => handlePostClick()}>
        <StyleAdd />
        發佈資訊
      </ActionBtn>
    </FeatureBox>
  );
}

export default AddPost;
