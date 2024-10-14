import styled from "styled-components";
import { Action, State } from ".";
import { OriginView } from "../../types";
import { useEffect, useState } from "react";

const RowSection = styled.div<{ isSelectSection: boolean }>`
  display: ${(props) => (props.isSelectSection ? "block" : "none")};

  @media (max-width: 992px) {
    padding: 0px 60px;
    margin: 60px auto;
    width: 80%;
  }
  @media (max-width: 768px) {
    padding: 0px 40px;
    margin: 100px auto;
    width: 90%;
  }
  @media (max-width: 575px) {
    padding: 0px 30px;
    margin: 60px auto 0px;
    width: 100%;
  }
`;
const Title = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 25px;
  grid-column: span 3;
`;
const ReviewContainer = styled.div`
  grid-column: span 3;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 240px;
`;
const ReviewImg = styled.img`
  border: 5px solid #fff;
  border-radius: 5px;
`;
const RowBtnContainer = styled.div`
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
const RowBtn = styled.button<{ col: boolean; haveData: boolean; isSelect: boolean }>`
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
  sectionRef: React.RefObject<HTMLDivElement>;
}

function Rows({ state, dispatch, sectionRef }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    dispatch({ type: "setAllRowPost", payload: { allRowPost: state.allPost?.filter((item) => item.section === state.selectedSection) as OriginView[] } });
  }, [state.viewPosts, state.selectedSection, state.selectedRow, state.selectedSeat]);

  return (
    state.selectedSection !== "" && (
      <RowSection ref={sectionRef} isSelectSection={state.isSelectSection}>
        <Title>{state.selectedSection}區</Title>
        {windowWidth <= 992 && state.allPost?.find((view) => view.section === state.selectedSection) && (
          <ReviewContainer>
            <ReviewImg src={state.allPost?.find((view) => view.section === state.selectedSection)?.image || ""} />
          </ReviewContainer>
        )}
        <RowBtnContainer>
          {Array.from({ length: state.rowSeats.length }).map((_, index) => (
            <RowBtn
              key={index}
              col={state.rowSeats.length > 10}
              haveData={state.allRowPost?.some((item) => item.row === index + 1) ?? false}
              isSelect={state.selectedRow === index && state.isSelectRow === true}
              onClick={() => {
                dispatch({ type: "selectRow", payload: { selectedRow: index, isSelectRow: true, selectedSeat: 0 } });
              }}
            >
              {index + 1}排
            </RowBtn>
          ))}
        </RowBtnContainer>
      </RowSection>
    )
  );
}

export default Rows;
