import styled from "styled-components";
import { Action, State } from ".";
import defaultSeat from "../../images/defaultSeat.png";
import dataSeat from "../../images/dataSeat.png";

import { motion } from "framer-motion";

const Container = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #3f3f3f;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff3e7;
  }

  @media (max-width: 992px) {
    &::-webkit-scrollbar {
      height: 8px;
    }
  }
`;
const SeatBtn = styled.button<{ haveData: boolean }>`
  padding: 0;
  width: 55px;
  height: 55px;
  margin-bottom: 5px;
  margin-top: 10px;
  background-image: ${(props) => (props.haveData ? `url(${dataSeat})` : `url(${defaultSeat})`)};
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
  background-size: 70px;
  position: relative;
  @media (max-width: 992px) {
    width: 50px;
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    width: 40px;
    margin-right: 8px;
  }
  @media (max-width: 575px) {
    width: 40px;
    height: 50px;
  }
`;
const SeatBtnText = styled.span`
  position: absolute;
  display: block;
  width: 55px;
  top: 10px;
  right: 0;
  font-weight: 700;
  @media (max-width: 992px) {
    width: 50px;
  }
  @media (max-width: 768px) {
    width: 40px;
  }
`;
const SeatPoint = styled(motion.div)`
  position: absolute;
  top: -60%;
  left: 32%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 15px solid red;

  @media (max-width: 768px) {
    left: 25%;
  }
  @media (max-width: 575px) {
    top: -65%;
  }
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function SeatButtons({ state, dispatch }: Props) {
  const handlerSeat = (value: number) => {
    dispatch({ type: "selectSeat", payload: { selectedSeat: value } });
  };
  return (
    <Container>
      {Array.from({ length: state.rowSeats[state.selectedRow] }).map((_, index) => (
        <SeatBtn
          key={index}
          haveData={state.allRowPost?.some((item) => item.row === state.selectedRow + 1 && item.seat === index + 1) ?? false}
          onClick={() => {
            handlerSeat(index);
          }}
        >
          <SeatBtnText>{index + 1}</SeatBtnText>
          {state.selectedSeat === index && (
            <SeatPoint
              animate={{
                y: [20, 25, 20],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            ></SeatPoint>
          )}
        </SeatBtn>
      ))}
    </Container>
  );
}

export default SeatButtons;
