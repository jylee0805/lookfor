import { useEffect, useState } from "react";
import styled from "styled-components";
import { OriginView, ViewAction, ViewState } from "../../types";
import RowButtons from "./RowButtons";

const RowSection = styled.div<{ $isSelectSection: boolean }>`
  display: ${(props) => (props.$isSelectSection ? "block" : "none")};
  width: 30%;

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
interface Props {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
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
      <RowSection ref={sectionRef} $isSelectSection={state.isSelectSection}>
        <Title>{state.selectedSection}區</Title>
        {windowWidth <= 992 && state.allPost?.find((view) => view.section === state.selectedSection) && (
          <ReviewContainer>
            <ReviewImg src={state.allPost?.find((view) => view.section === state.selectedSection)?.image || ""} />
          </ReviewContainer>
        )}
        <RowButtons state={state} dispatch={dispatch} />
      </RowSection>
    )
  );
}

export default Rows;
