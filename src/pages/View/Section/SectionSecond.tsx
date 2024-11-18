import styled from "styled-components";
import SecondFPhoto from "../../../assets/Vector 9-1.svg";
import SecondEPhoto from "../../../assets/Vector 9-2.svg";
import SecondDPhoto from "../../../assets/Vector 9-3.svg";
import SecondCPhoto from "../../../assets/Vector 9-4.svg";
import SecondBPhoto from "../../../assets/Vector 9-5.svg";
import SecondAPhoto from "../../../assets/Vector 9-6.svg";
import SecondGPhoto from "../../../assets/Vector 9.svg";
import Section from "../../../components/Section";
import { ViewState } from "../../../types";

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
const SecondBase = styled(Section)<{ $width: string; $height: string; $top: string; $left: string; $top768: string; $height768?: string; $top575: string; $height575: string }>`
  background-color: #ffc27d;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  &:hover {
    background-color: #ff9318;
  }

  @media (max-width: 768px) {
    top: ${(props) => props.$top768};
    ${(props) => props.$height768 && `height:${props.$height768}`}
  }
  @media (max-width: 575px) {
    top: ${(props) => props.$top575};
    height: ${(props) => props.$height575};
  }
`;

interface Props {
  state: ViewState;
}
const secondData = [
  { sectionName: "2A", imgUrl: SecondAPhoto, width: "14.5%", height: "150px", top: "-10px", left: " 5%", top768: "-50px", height768: "190px", top575: "-20px", height575: "100%" },
  { sectionName: "2B", imgUrl: SecondBPhoto, width: "13.2%", height: "165px", top: "38px", left: " 16.5%", top768: "0px", top575: "5px", height575: "100%" },
  { sectionName: "2C", imgUrl: SecondCPhoto, width: "11.9%", height: "156px", top: "62px", left: " 28.5%", top768: "15px", top575: "15px", height575: "100%" },
  { sectionName: "2D", imgUrl: SecondDPhoto, width: "14.1%", height: "148px", top: "72px", left: " 42%", top768: "28px", top575: "17px", height575: "100%" },
  { sectionName: "2E", imgUrl: SecondEPhoto, width: "11.9%", height: "156px", top: "64px", left: " 57.5%", top768: "14px", top575: "15px", height575: "100%" },
  { sectionName: "2F", imgUrl: SecondFPhoto, width: "13.2%", height: "165px", top: "37px", left: " 68%", top768: "-7px", top575: "5px", height575: "100%" },
  { sectionName: "2G", imgUrl: SecondGPhoto, width: "15%", height: "150px", top: "-10px", left: " 77.5%", top768: "-35px", top575: "-20px", height575: "100%" },
];
function SectionSecond({ state }: Props) {
  return (
    <Second>
      {secondData.map((item) => (
        <SecondBase
          sectionName={item.sectionName}
          state={state}
          imgUrl={item.imgUrl}
          $width={item.width}
          $height={item.height}
          $top={item.top}
          $left={item.left}
          $top768={item.top768}
          $height768={item.height768}
          $top575={item.top575}
          $height575={item.height575}
        />
      ))}
      {/* <SecondA sectionName="2A" state={state} imgUrl={SecondAPhoto} />
      <SecondB sectionName="2B" state={state} imgUrl={SecondBPhoto} />
      <SecondC sectionName="2C" state={state} imgUrl={SecondCPhoto} />
      <SecondD sectionName="2D" state={state} imgUrl={SecondDPhoto} />
      <SecondE sectionName="2E" state={state} imgUrl={SecondEPhoto} />
      <SecondF sectionName="2F" state={state} imgUrl={SecondFPhoto} />
      <SecondG sectionName="2G" state={state} imgUrl={SecondGPhoto} /> */}
    </Second>
  );
}

export default SectionSecond;
