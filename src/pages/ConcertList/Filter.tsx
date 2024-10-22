import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { Action, State } from ".";

const Container = styled.div`
  margin-right: auto;
  margin-left: 15px;
  @media (max-width: 768px) {
    display: inline-block;
  }
`;
const FilterBtn = styled.button`
  background: transparent;
  color: #fff;
  position: relative;
  padding: 5px 15px;
  font-size: 1.2rem;
  & + & {
    &::before {
      content: "";
      width: 1px;
      height: 60%;

      background: #fff;
      position: absolute;
      left: 0;
      top: 7px;
    }
  }
`;
const Hint = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  color: #000;
  background: #fff;
  padding: 5px 20px;
  border-radius: 50px;
  opacity: ${(props) => (props.$show ? "100" : "0")};
  transition: opacity ease 200ms;
`;
interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Filter({ state, dispatch }: Props) {
  const [show, setShow] = useState(false);
  const handleAll = () => {
    dispatch({ type: "setFilterData", payload: { searchData: [], weekData: [] } });
  };

  const handleWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? 0 : 7);
    const endOfWeek = new Date(today.setDate(diff));
    endOfWeek.setHours(23, 59, 59, 999);

    const result = state.concertData.filter((concert) => {
      const date: Date = new Date(concert.endDay.seconds * 1000);
      return date <= endOfWeek;
    });
    if (result.length === 0) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 4000);
    } else {
      dispatch({
        type: "setFilterData",
        payload: {
          searchData: [],
          weekData: state.concertData.filter((concert) => {
            const date: Date = new Date(concert.endDay.seconds * 1000);
            return date <= endOfWeek;
          }),
        },
      });
    }
  };

  return (
    <Container>
      <Hint $show={show}>本周暫無活動</Hint>
      <FilterBtn onClick={handleAll}>全部</FilterBtn>
      <FilterBtn onClick={handleWeek}>本週</FilterBtn>
    </Container>
  );
}

export default Filter;
