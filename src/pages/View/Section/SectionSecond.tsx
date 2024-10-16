import styled from "styled-components";
import { State } from "..";
import SecondFPhoto from "../../../assets/Vector 9-1.svg";
import SecondEPhoto from "../../../assets/Vector 9-2.svg";
import SecondDPhoto from "../../../assets/Vector 9-3.svg";
import SecondCPhoto from "../../../assets/Vector 9-4.svg";
import SecondBPhoto from "../../../assets/Vector 9-5.svg";
import SecondAPhoto from "../../../assets/Vector 9-6.svg";
import SecondGPhoto from "../../../assets/Vector 9.svg";
import Section from "../../../components/Section";

const Second = styled.div`
  position: relative;
  height: 200px;
  color: #000;

  @media (max-width: 768px) {
    height: 140px;
  }
  @media (max-width: 575px) {
    height: 100px;
  }
`;
const SecondBase = styled(Section)`
  background-color: #ffc27d;
  &:hover {
    background-color: #ff9318;
  }
`;

const SecondA = styled(SecondBase)`
  width: 14.5%;
  height: 150px;
  top: -10px;
  left: 5%;
  @media (max-width: 768px) {
    height: 190px;
    top: -50px;
  }
  @media (max-width: 575px) {
    top: -20px;
    height: 100%;
  }
`;
const SecondB = styled(SecondBase)`
  width: 13.2%;
  height: 165px;
  top: 38px;
  left: 16.5%;

  @media (max-width: 768px) {
    top: 0px;
  }
  @media (max-width: 575px) {
    top: 5px;
    height: 100%;
  }
`;
const SecondC = styled(SecondBase)`
  width: 11.9%;
  height: 156px;
  top: 62px;
  left: 28.5%;

  @media (max-width: 768px) {
    top: 15px;
  }
  @media (max-width: 575px) {
    top: 15px;
    height: 100%;
  }
`;
const SecondD = styled(SecondBase)`
  width: 14.1%;
  height: 148px;
  top: 72px;
  left: 42%;

  @media (max-width: 768px) {
    top: 28px;
  }
  @media (max-width: 575px) {
    top: 17px;
    height: 100%;
  }
`;
const SecondE = styled(SecondBase)`
  width: 11.9%;
  height: 156px;
  top: 64px;
  left: 57.5%;

  @media (max-width: 768px) {
    top: 14px;
  }
  @media (max-width: 575px) {
    top: 15px;
    height: 100%;
  }
`;
const SecondF = styled(SecondBase)`
  width: 13.2%;
  height: 165px;
  top: 37px;
  left: 68%;

  @media (max-width: 768px) {
    top: -7px;
  }
  @media (max-width: 575px) {
    top: 5px;
    height: 100%;
  }
`;
const SecondG = styled(SecondBase)`
  width: 15%;
  height: 150px;
  top: -10px;
  left: 77.5%;

  @media (max-width: 768px) {
    top: -35px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: -20px;
  }
`;

interface Props {
  state: State;
}

function SectionSecond({ state }: Props) {
  return (
    <Second>
      <SecondA sectionName="2A" state={state} imgUrl={SecondAPhoto} />
      <SecondB sectionName="2B" state={state} imgUrl={SecondBPhoto} />
      <SecondC sectionName="2C" state={state} imgUrl={SecondCPhoto} />
      <SecondD sectionName="2D" state={state} imgUrl={SecondDPhoto} />
      <SecondE sectionName="2E" state={state} imgUrl={SecondEPhoto} />
      <SecondF sectionName="2F" state={state} imgUrl={SecondFPhoto} />
      <SecondG sectionName="2G" state={state} imgUrl={SecondGPhoto} />
    </Second>
  );
}

export default SectionSecond;
