import styled from "styled-components";
import { Action, AllPost } from ".";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const RowSection = styled.div<{ isSelectSection: boolean; col: boolean }>`
  display: ${(props) => (props.isSelectSection ? "grid" : "none")};
  grid-template-rows: repeat(11, 1fr);
  grid-template-columns: ${(props) => (props.col ? "1fr 1fr" : "1fr")};
  grid-auto-flow: column;
  padding: 0px 30px 60px 30px;
  color: white;
  gap: 10px;

  @media (max-width: 992px) {
    padding: 0px 60px;
    margin: 100px auto;
    width: 80%;
  }
  @media (max-width: 768px) {
    padding: 0px 40px;
    margin: 100px auto;
    width: 90%;
  }
  @media (max-width: 575px) {
    padding: 0px 30px;
    margin: 100px auto 0px;
    width: 100%;
  }
`;
const Title = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 25px;
  grid-column: span 3;
  @media (max-width: 575px) {
    font-size: 1.2rem;
  }
`;
const RowBtn = styled.button<{ col: boolean; haveData: boolean; isSelect: boolean; color: string }>`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border: none;
  position: relative;
  background: ${(props) => (props.isSelect ? props.color : "fff")};
  grid-column: ${(props) => (props.col ? "span 1" : "span 3")};
  &:hover {
    background: ${(props) => props.color};
  }
  &::after {
    content: "";
    display: ${(props) => (props.haveData ? "block" : "none")};
    position: absolute;
    top: 50%;
    left: 65%;
    transform: translateY(-50%);
    background: #ff9a0e;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;
interface Props {
  state: {
    rowSeats: number[];
    section: string;
    row: number;
    seat: number;
    isSelectSection: boolean;
    allSectionPost: AllPost[] | undefined;
  };
  dispatch: React.Dispatch<Action>;
}

function Rows({ state, dispatch }: Props) {
  const [color, setColor] = useState("");
  useEffect(() => {
    const getAllView = async () => {
      const allView = await api.getAllViewPost(state.section);
      console.log(allView);
      dispatch({ type: "setAllSectionPost", payload: { allSectionPost: allView as AllPost[] } });
    };
    getAllView();
    if (state.section.includes("VIP")) {
      setColor("#f1b3ff");
    } else if (state.section.includes("2")) {
      setColor("#ffb3b3");
    } else if (state.section.includes("3")) {
      setColor("#fff1b3");
    }
  }, [state.section]);

  return (
    <RowSection isSelectSection={state.isSelectSection} col={state.rowSeats.length > 10}>
      <Title>{state.section}區</Title>
      {Array.from({ length: state.rowSeats.length }).map((_, index) => (
        <RowBtn
          key={index}
          col={state.rowSeats.length > 10}
          color={color}
          haveData={state.allSectionPost?.some((item) => item.row === index + 1) ?? false}
          isSelect={state.row === index}
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
