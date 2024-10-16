import styled from "styled-components";
import { Action, State } from ".";
import { ViewPost } from "../../types";
import api from "../../utils/api";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from "react";
import { Comment } from "../../types";
import SeatButtons from "./SeatButtons";
import ViewPostCard from "./ViewPostCard";

const StyleClose = styled(MdOutlineClose)`
  font-size: 2rem;
  margin-right: 4px;
`;

const SeatSection = styled.div<{ rowSelect: boolean }>`
  grid-column: span 2;
  margin-top: 80px;
  padding: 0 60px;
  margin-bottom: 80px;
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  background: #000;
  top: -80px;
  left: ${(props) => (props.rowSelect ? "0" : "-100%")};
  height: 100vh;
  z-index: 10;
  width: 60vw;
  transition: left ease 1s;

  @media (max-width: 1280px) {
    width: 65vw;
  }
  @media (max-width: 992px) {
    grid-column: span 1;
    padding: 0 60px;
    position: fixed;
    margin-bottom: 0;
    top: auto;
    bottom: ${(props) => (props.rowSelect ? "0" : "-100%")};
    left: 0;
    height: 90vh;
    z-index: 10;
    width: 100vw;
    transition: bottom ease 1s;
    border-radius: 20px 20px 0 0;
  }
  @media (max-width: 575px) {
    padding: 0 20px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #000000;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff3e7;
  }

  &::before {
    z-index: -1;
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: ${(props) => (props.rowSelect ? "0" : "-100%")};
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    width: 20%;
    background: #232222;
    overflow: hidden;
    box-shadow:
      5vw 60vh 0 5vw #535252,
      15vw 30vh 0 10vw #171414,
      19vw -10vh 0 3vw #686868,
      35vw 80vh 0 2vw #716b69;
    filter: blur(12rem);
    transition:
      left ease 1s,
      opacity ease 0.5s;
    opacity: ${(props) => (props.rowSelect ? 1 : 0)};
    transition-delay: ${(props) => (props.rowSelect ? "0.2s" : "0s")};

    @media (max-width: 992px) {
      top: 20%;
      left: 0;
      box-shadow:
        5vw 60vh 0 5vw #535252,
        35vw 20vh 0 10vw #171414,
        80vw 20vh 0 3vw #686868,
        35vw 60vh 0 2vw #716b69;
    }
  }
`;
const Header = styled.div`
  position: sticky;
  padding-top: 10px;
  top: 0;
  background: #121212;
`;
const CloseBtn = styled.button`
  margin-left: auto;
  margin-right: -50px;
  display: block;
  background: none;
  border: none;
  color: #fff;
  @media (max-width: 575px) {
    margin-top: 15px;
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  margin: 25px 0;
  @media (max-width: 575px) {
    font-size: 1.6rem;
  }
`;

const NoView = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 40px 0;
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Seat({ state, dispatch }: Props) {
  useEffect(() => {
    const loadViewPosts = async () => {
      const unsubscribes: (() => void)[] = [];
      let posts: ViewPost[] = [];

      posts = JSON.parse(
        JSON.stringify(
          state.allPost.filter((post) => {
            return post.section === state.selectedSection && post.row - 1 === state.selectedRow && post.seat - 1 === state.selectedSeat;
          })
        )
      );

      const fetchUserNames = async () => {
        const userNamesPromises = posts.map(async (post) => {
          if (post.userUID) {
            const user = await api.getUser(post.userUID);

            return { userName: user.userName, avatar: user.avatar };
          }
          return null;
        });
        const userNames = await Promise.all(userNamesPromises);

        return userNames;
      };

      fetchUserNames().then((userNames) => {
        posts.forEach((post, index) => {
          post.userName = userNames[index]?.userName;
          post.avatar = userNames[index]?.avatar;
        });
      });

      await Promise.all(
        posts.map(async (post) => {
          const unsubscribe = api.getViewComments(post.id, (updatedComments: Comment[]) => {
            const comments = JSON.parse(JSON.stringify(updatedComments));

            const fetchUserNames = async () => {
              const userNamesPromises = comments.map(async (comment: Comment) => {
                if (comment.userUID) {
                  const user = await api.getUser(comment.userUID);

                  return { userName: user.userName, avatar: user.avatar };
                }
                return null;
              });

              const userNames = await Promise.all(userNamesPromises);
              return userNames;
            };

            fetchUserNames().then((userNames) => {
              comments.forEach((comment: Comment, index: number) => {
                if (userNames[index]) {
                  comment.userName = userNames[index]?.userName || comment.userName;
                  comment.avatar = userNames[index]?.avatar || comment.avatar;
                }
              });
              post.comment = comments;
              dispatch({ type: "setViewPosts", payload: { viewPosts: [...posts] } });
            });
          });

          unsubscribes.push(await unsubscribe);
        })
      );

      dispatch({ type: "setViewPosts", payload: { viewPosts: posts } });

      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    };

    loadViewPosts();
  }, [state.selectedSection, state.selectedRow, state.selectedSeat, state.deleteViewId]);

  return (
    <SeatSection rowSelect={state.isSelectRow}>
      <Header>
        <CloseBtn onClick={() => dispatch({ type: "isSelectRow" })}>
          <StyleClose />
        </CloseBtn>
        <SeatButtons state={state} dispatch={dispatch} />
      </Header>
      <Title> 視角分享</Title>

      {state.viewPosts && state.viewPosts.length !== 0 ? (
        state.viewPosts.map((post: ViewPost, index) => <ViewPostCard post={post} index={index} state={state} dispatch={dispatch} />)
      ) : (
        <NoView>暫時沒有視角</NoView>
      )}
    </SeatSection>
  );
}

export default Seat;
