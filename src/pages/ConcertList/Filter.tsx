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

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Filter({ state, dispatch }: Props) {
  const handleAll = () => {
    dispatch({ type: "setFilterData", payload: { searchData: [], weekData: [] } });
  };

  const handleWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? 0 : 7);
    const endOfWeek = new Date(today.setDate(diff));
    endOfWeek.setHours(23, 59, 59, 999);

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
  };

  return (
    <Container>
      <FilterBtn onClick={handleAll}>全部</FilterBtn>
      <FilterBtn onClick={handleWeek}>本週</FilterBtn>
    </Container>
  );
}

export default Filter;
