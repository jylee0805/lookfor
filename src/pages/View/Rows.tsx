import styled from "styled-components";
import { Action, AllPost } from ".";
import { useEffect, useState } from "react";
import { darken } from "polished";
import { State } from "./index";

const RowSection = styled.div<{ isSelectSection: boolean; col: boolean }>`
  display: ${(props) => (props.isSelectSection ? "grid" : "none")};
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(3, 1fr);

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
`;
const RowBtn = styled.button<{ col: boolean; haveData: boolean; isSelect: boolean; color: string }>`
  display: block;
  width: 100%;
  /* width: ${(props) => (props.col ? "100%" : "50%")}; */
  margin-bottom: 10px;
  border: none;
  position: relative;
  font-size: 1.1rem;
  font-weight: 600;

  border-radius: 5px;
  background: ${(props) => (props.isSelect ? props.color : "fff")};
  grid-column: ${(props) => (props.col ? "span 1" : "span 1")};
  &:hover {
    background: ${(props) => props.color};
  }
  &::after {
    content: "";
    display: ${(props) => (props.haveData ? "block" : "none")};
    position: absolute;
    top: -5%;
    right: -5%;

    background: ${(props) => darken(0.3, props.color || "#000000")};
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;
interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Rows({ state, dispatch }: Props) {
  const [color, setColor] = useState("");
  console.log(state.allSectionPost?.filter((item) => item.section === state.section));

  useEffect(() => {
    // const getAllView = async () => {
    //   const allView = await api.getAllViewPost(state.section);
    //   console.log(allView);
    //   dispatch({ type: "setAllSectionPost", payload: { allSectionPost: allView as AllPost[] } });
    // };
    // getAllView();

    dispatch({ type: "setAllRowPost", payload: { allRowPost: state.allSectionPost?.filter((item) => item.section === state.section) as AllPost[] } });
    if (state.section.includes("VIP")) {
      setColor("#f1b3ff");
    } else if (state.section.includes("2")) {
      setColor("#ffb3b3");
    } else if (state.section.includes("3")) {
      setColor("#fff1b3");
    }
  }, [state.section]);

  return (
    state.section !== "" && (
      <RowSection isSelectSection={state.isSelectSection} col={state.rowSeats.length > 10}>
        <Title>{state.section}區</Title>
        {Array.from({ length: state.rowSeats.length }).map((_, index) => (
          <RowBtn
            key={index}
            col={state.rowSeats.length > 10}
            color={color}
            haveData={state.allRowPost?.some((item) => item.row === index + 1) ?? false}
            isSelect={state.row === index && state.isSelectRow === true}
            onClick={() => {
              dispatch({ type: "selectRow", payload: { row: index, isSelectRow: true } });
              dispatch({ type: "selectSeat", payload: { seat: 0 } });
            }}
          >
            {index + 1}排
          </RowBtn>
        ))}
      </RowSection>
    )
  );
}

export default Rows;
