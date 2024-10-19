import { useContext, useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Action, State } from ".";
import { Notify } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";

const StyleNotify = styled(IoMdNotifications)`
  font-size: 24px;
  margin-right: 4px;
`;

const NotifyBtn = styled.button<{ $num: boolean }>`
  background: none;
  border: none;
  color: #fff;
  padding: 5px 10px;
  margin: 10px 20px 10px 0;
  display: flex;
  align-items: center;
  position: relative;
  &::after {
    content: "";
    z-index: 10;
    position: absolute;
    top: 7px;
    right: 15px;
    width: 10px;
    height: 10px;
    background: ${(props) => (props.$num ? "#f85a5a" : "transparent")};
    border-radius: 50%;
  }

  @media (max-width: 575px) {
    margin: 0 10px 0 0;
  }
`;
const NotifyList = styled.ul<{ $isNotifyOpen: boolean }>`
  display: ${(props) => (props.$isNotifyOpen ? "block" : "none")};
  width: 300px;
  padding: 0;
  background: #fff;
  color: #000;
  position: absolute;
  right: 50%;
  font-size: 1rem;
  border-radius: 8px;

  & :first-child {
    border-radius: 15px 15px 0 0;
  }
  & :last-child {
    border-radius: 0 0 15px 15px;
  }
  & :only-child {
    border-radius: 15px;
  }

  @media (max-width: 575px) {
    bottom: -50px;
    right: 0;
    margin: 0 10px 0 0;
    width: 180px;
  }
`;
const NotifyItem = styled.li`
  padding: 20px 25px;
  color: #000;
  &:hover {
    background: #fffab9;
  }
  @media (max-width: 575px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const NotifyTitle = styled.p`
  font-weight: 700;
`;
const NotifyContent = styled.p``;
const NotifyTime = styled.p`
  font-size: 0.8rem;
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function NotifyButton({ state, dispatch }: Props) {
  const authContext = useContext(AuthContext);
  const [notifyData, setNotifyData] = useState<Notify[]>([]);
  const handleNotify = (id: string) => {
    dispatch({ type: "toggleIsNotifyOpen" });
    api.deleteNotify(authContext?.user.id as string, id);
  };
  useEffect(() => {
    dispatch({ type: "toggleIsMenuOpen", payload: { isMenuOpen: false } });
    const loadViewPosts = async () => {
      const unsubscribeNotify: (() => void)[] = [];

      const unsubscribe = api.getNotify(authContext?.loginState as string, (updatedNotifies: Notify[]) => {
        setNotifyData(updatedNotifies);
      });

      unsubscribeNotify.push(await unsubscribe);

      return () => {
        unsubscribeNotify.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [authContext?.loginState]);
  return (
    <>
      <NotifyBtn onClick={() => dispatch({ type: "toggleIsNotifyOpen" })} $num={notifyData.length > 0}>
        <StyleNotify />
      </NotifyBtn>
      <NotifyList $isNotifyOpen={state.isNotifyOpen}>
        {notifyData.length > 0 ? (
          notifyData.map((item) => (
            <Link to={`/fanssupport?concert=${item.concertId}#${item.postId}`} onClick={() => handleNotify(item.id as string)}>
              <NotifyItem key={item.id}>
                <NotifyTitle>{item.title}</NotifyTitle>
                <NotifyContent>{item.message}</NotifyContent>
                <NotifyTime>{new Date(item.createdTime.seconds * 1000).toLocaleString()}</NotifyTime>
              </NotifyItem>
            </Link>
          ))
        ) : (
          <NotifyItem>目前沒有新通知</NotifyItem>
        )}
      </NotifyList>
    </>
  );
}

export default NotifyButton;
