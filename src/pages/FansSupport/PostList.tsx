import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";
import "react-photo-view/dist/react-photo-view.css";
import { Action, State } from ".";
import PostContent from "./PostContent";
import MoreFeature from "./MoreFeature";

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
  const authContext = useContext(AuthContext);

  return (
    <List>
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
            {authContext?.loginState === item.userUID && <MoreFeature dispatch={dispatch} state={state} item={item} />}
          </PostItem>
        ))}
      {state.postData.length === 0 && <Hint>目前沒有應援物發放資訊</Hint>}
    </List>
  );
}

export default PostList;
