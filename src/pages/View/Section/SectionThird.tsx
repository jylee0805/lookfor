import styled from "styled-components";
import { State } from "..";
import ThirdDPhoto from "../../../assets/Vector 9-10.svg";
import ThirdCPhoto from "../../../assets/Vector 9-11.svg";
import ThirdBPhoto from "../../../assets/Vector 9-12.svg";
import ThirdAPhoto from "../../../assets/Vector 9-13.svg";
import ThirdGPhoto from "../../../assets/Vector 9-7.svg";
import ThirdFPhoto from "../../../assets/Vector 9-8.svg";
import ThirdEPhoto from "../../../assets/Vector 9-9.svg";
import Section from "../../../components/Section";

const Third = styled.div`
  height: 300px;
  position: relative;
  color: #000;
  @media (max-width: 768px) {
    height: 180px;
  }
  @media (max-width: 575px) {
    height: 120px;
  }
`;
const ThirdBase = styled(Section)`
  background-color: #ffac4d;
  &:hover {
    background-color: #ff8800;
  }
`;
const ThirdA = styled(ThirdBase)`
  width: 14.1%;
  height: 151px;
  top: -10px;
  left: 4.5%;
  @media (max-width: 768px) {
    top: -35px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: -25px;
  }
`;
const ThirdB = styled(ThirdBase)`
  width: 15%;
  height: 176px;
  top: 40px;
  left: 15%;
  @media (max-width: 768px) {
    top: -5px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 5px;
  }
`;
const ThirdC = styled(ThirdBase)`
  width: 11.4%;
  height: 185px;
  top: 70px;
  left: 28%;
  @media (max-width: 768px) {
    top: 15px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 20px;
  }
`;
const ThirdD = styled(ThirdBase)`
  width: 14.1%;
  height: 176px;
  top: 85px;
  left: 42.5%;
  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 25px;
  }
`;
const ThirdE = styled(ThirdBase)`
  width: 11.4%;
  height: 185px;
  top: 70px;
  left: 60%;
  @media (max-width: 768px) {
    top: 15px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 20px;
  }
`;
const ThirdF = styled(ThirdBase)`
  width: 15.1%;
  height: 176px;
  top: 40px;
  left: 69%;
  @media (max-width: 768px) {
    top: -5px;
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 5px;
  }
`;
const ThirdG = styled(ThirdBase)`
  width: 14.1%;
  height: 150px;
  top: -10px;
  left: 80.5%;
  @media (max-width: 768px) {
    top: -35px;
  }
  @media (max-width: 575px) {
    top: -25px;
    height: 100%;
  }
`;

interface Props {
  state: State;
}

function SectionThird({ state }: Props) {
  return (
    <Third>
      <ThirdA sectionName="3A" state={state} imgUrl={ThirdAPhoto} />
      <ThirdB sectionName="3B" state={state} imgUrl={ThirdBPhoto} />
      <ThirdC sectionName="3C" state={state} imgUrl={ThirdCPhoto} />
      <ThirdD sectionName="3D" state={state} imgUrl={ThirdDPhoto} />
      <ThirdE sectionName="3E" state={state} imgUrl={ThirdEPhoto} />
      <ThirdF sectionName="3F" state={state} imgUrl={ThirdFPhoto} />
      <ThirdG sectionName="3G" state={state} imgUrl={ThirdGPhoto} />
    </Third>
  );
}

export default SectionThird;
