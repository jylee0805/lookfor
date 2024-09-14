import styled from "styled-components";

const Title = styled.h4``;
const RowSection = styled.div`
  padding: 0 100px;
`;
const RowBtn = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;
interface Props {
  state: {
    allSeats: number[];
    section: string;
    row: number;
    seat: number;
  };
  dispatch: React.Dispatch<Action>;
}

function Rows({ state, dispatch }: Props) {
  console.log(state.row);

  return (
    <RowSection>
      <Title>{state.section}區</Title>
      {Array.from({ length: state.allSeats.length }).map((_, index) => (
        <RowBtn
          key={index}
          onClick={() => {
            dispatch({ type: "selectRow", payload: { row: index } });
            dispatch({ type: "isSelectRow" });
          }}
        >
          {index + 1}排
        </RowBtn>
      ))}
    </RowSection>
  );
}

export default Rows;
