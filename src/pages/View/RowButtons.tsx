import styled from "styled-components";
import { Action, State } from ".";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  grid-auto-flow: column;
  padding: 0px 30px 60px 30px;
  color: white;
  gap: 10px;

  @media (max-width: 992px) {
    padding: 0px 60px;
    margin: 40px auto;
    width: 80%;
  }
  @media (max-width: 768px) {
    padding: 0px 40px;
    width: 90%;
  }
  @media (max-width: 575px) {
    padding: 0 30px;
    margin: 0 auto;
    width: 100%;
  }
`;
const Button = styled.button<{ col: boolean; haveData: boolean; isSelect: boolean }>`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border: none;
  position: relative;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 5px;
  background: ${(props) => (props.isSelect ? "#ffc788" : "fff")};
  grid-column: ${(props) => (props.col ? "span 2" : "span 3")};
  &:hover {
    background: #ffc788;
  }
  &::after {
    content: "";
    display: ${(props) => (props.haveData ? "block" : "none")};
    position: absolute;
    top: -5%;
    right: -5%;
    background: #ff8800;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function RowButtons({ state, dispatch }: Props) {
  return (
    <Container>
      {Array.from({ length: state.rowSeats.length }).map((_, index) => (
        <Button
          key={index}
          col={state.rowSeats.length > 10}
          haveData={state.allRowPost?.some((item) => item.row === index + 1) ?? false}
          isSelect={state.selectedRow === index && state.isSelectRow === true}
          onClick={() => {
            dispatch({ type: "selectRow", payload: { selectedRow: index, isSelectRow: true, selectedSeat: 0 } });
          }}
        >
          {index + 1}排
        </Button>
      ))}
    </Container>
  );
}

export default RowButtons;
