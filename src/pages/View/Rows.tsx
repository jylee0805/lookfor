import styled from "styled-components";
import { Action } from ".";

const RowSection = styled.div<{ isSelectSection: boolean }>`
  display: ${(props) => (props.isSelectSection ? "block" : "none")};
  padding: 0px 60px 60px 0;
  color: white;
  @media (max-width: 992px) {
    padding: 0px 80px;
    margin-top: 150px;
  }
  @media (max-width: 575px) {
    padding: 0px 60px;
    margin-top: 100px;
  }
`;
const Title = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 25px;
`;
const RowBtn = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border: none;
  &:hover {
    background: #d2d2d2;
  }
`;
interface Props {
  state: {
    rowSeats: number[];
    section: string;
    row: number;
    seat: number;
    isSelectSection: boolean;
  };
  dispatch: React.Dispatch<Action>;
}

function Rows({ state, dispatch }: Props) {
  return (
    <RowSection isSelectSection={state.isSelectSection}>
      <Title>{state.section}區</Title>
      {Array.from({ length: state.rowSeats.length }).map((_, index) => (
        <RowBtn
          key={index}
          onClick={() => {
            dispatch({ type: "selectRow", payload: { row: index, isSelectRow: true } });
            // dispatch({ type: "isSelectRow", payload: { isSelectRow: true } });
          }}
        >
          {index + 1}排
        </RowBtn>
      ))}
    </RowSection>
  );
}

export default Rows;
