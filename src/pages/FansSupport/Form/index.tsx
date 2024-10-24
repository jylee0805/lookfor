import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { Concerts } from "../../../types";
import { SupportFormContext } from "../../../utils/SupportFormContextProvider";
import { Action, State } from "../index";
import Footer from "./Footer";
import ImagePreview from "./ImagePreview";
import MainForm from "./MainForm";

const Container = styled.div<{ isPostClick: boolean }>`
  width: 60%;
  padding: 20px 5px 20px 30px;
  display: ${(props) => (props.isPostClick ? "block" : "none")};
  position: fixed;
  background: #ffffff;
  color: #000;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  max-height: 80vh;
  @media (max-width: 992px) {
    width: 80%;
  }
`;
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: 55vh;
  margin-top: 50px;
  margin-bottom: 45px;
  padding-right: 25px;
  &::-webkit-scrollbar {
    width: 8px;
    scroll-margin-left: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #6d6d6d;
  }
`;
const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000;
  z-index: 20;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
`;

export type FormInputs = {
  day: string | number;
  time: Dayjs;
  status: string;
  concert: string;
  place: string;
  qualify: string;
  more: string;
  image: object;
  item: string;
};
type Props = {
  concert: Concerts;
  state: State;
  dispatch: React.Dispatch<Action>;
};

function FanPost({ concert, state, dispatch }: Props) {
  const { reset } = useContext(SupportFormContext);
  useEffect(() => {
    if (state.isEditMode.passDay) {
      const values = {
        item: state.isEditMode.item,
        day: state.isEditMode.passDay,
        time: dayjs(state.isEditMode.passTime, "HH:mm"),
        status: state.isEditMode.passState,
        place: state.isEditMode.passPlace,
        qualify: state.isEditMode.qualify,
        more: state.isEditMode.content,
      };

      reset(values);
    }
  }, [state.isEditMode]);

  return (
    <Container isPostClick={state.isPostClick}>
      <Title>建立資訊</Title>
      <ContentContainer>
        <MainForm concert={concert} />
        <ImagePreview state={state} dispatch={dispatch} />
      </ContentContainer>
      <Footer concert={concert} state={state} dispatch={dispatch} />
    </Container>
  );
}

export default FanPost;
