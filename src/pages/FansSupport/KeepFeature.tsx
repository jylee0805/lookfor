import styled from "styled-components";
import api from "../../utils/api";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import { MdOutlineBookmarkBorder, MdOutlineBookmark } from "react-icons/md";
import "react-photo-view/dist/react-photo-view.css";
import { MerchPost, Personal } from "../../types";
import { Action, State } from ".";

const StyleKeep = styled(MdOutlineBookmarkBorder)`
  font-size: 1.5em;
  margin-right: 4px;
`;
const StyleKeepFill = styled(MdOutlineBookmark)`
  font-size: 1.8rem;
  margin-right: 4px;
`;
const MoreBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
  display: flex;
  align-items: center;
`;
const KeepBtn = styled(MoreBtn)``;
const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;
const KeepNumber = styled.p``;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  item: MerchPost;
}

function KeepFeature({ state, dispatch, item }: Props) {
  const authContext = useContext(AuthContext);
  const handleKeep = async (id: string) => {
    if (authContext?.user.keepIds?.includes(id)) {
      authContext.setUser((prev) => {
        api.updateUser(authContext?.user.id, { UID: prev.UID, avatar: prev.avatar, userName: prev.userName, keepIds: prev.keepIds?.filter((item) => item !== id) });
        return { ...prev, keepIds: prev.keepIds?.filter((item) => item !== id) };
      });
      const updateUser = state.users.map((user) => {
        if (user.UID === authContext?.user.UID) {
          return { ...user, keepIds: user.keepIds?.filter((item) => item !== id) };
        }
        return user;
      });
      dispatch({ type: "setUsers", payload: { users: updateUser } });
    } else if (authContext?.user.keepIds === undefined || authContext?.user.keepIds?.includes(id) === false) {
      authContext?.setUser((prev: Personal) => {
        const updatedKeepIds = prev.keepIds ? [...prev.keepIds, id] : [id];
        api.setKeepPost(authContext?.loginState as string, id);
        return { ...prev, keepIds: updatedKeepIds };
      });

      const updateUser = state.users.map((user) => {
        if (user.UID === authContext?.user.UID) {
          return { ...user, keepIds: [...(user.keepIds ?? []), id] };
        }
        return user;
      });

      dispatch({ type: "setUsers", payload: { users: updateUser } });
    }
  };
  return (
    <Container>
      <KeepBtn onClick={() => handleKeep(item.id as string)}>
        {Array.isArray(authContext?.user.keepIds) && authContext.user.keepIds.includes(item.id as string) ? <StyleKeepFill /> : <StyleKeep />}
      </KeepBtn>
      <KeepNumber>{state.users.filter((user) => user.keepIds?.includes(item.id as string)).length}</KeepNumber>
    </Container>
  );
}

export default KeepFeature;
