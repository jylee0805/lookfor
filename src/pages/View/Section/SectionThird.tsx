import styled from "styled-components";
import ThirdDPhoto from "../../../assets/Vector 9-10.svg";
import ThirdCPhoto from "../../../assets/Vector 9-11.svg";
import ThirdBPhoto from "../../../assets/Vector 9-12.svg";
import ThirdAPhoto from "../../../assets/Vector 9-13.svg";
import ThirdGPhoto from "../../../assets/Vector 9-7.svg";
import ThirdFPhoto from "../../../assets/Vector 9-8.svg";
import ThirdEPhoto from "../../../assets/Vector 9-9.svg";
import Section from "../../../components/Section";
import { ViewState } from "../../../types";

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
const ThirdBase = styled(Section)<{ $width: string; $height: string; $top: string; $left: string; $top768: string; $top575: string; $height575: string }>`
  background-color: #ffac4d;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  &:hover {
    background-color: #ff8800;
  }
  @media (max-width: 768px) {
    top: ${(props) => props.$top768};
  }
  @media (max-width: 575px) {
    top: ${(props) => props.$top575};
    height: ${(props) => props.$height575};
  }
`;

interface Props {
  state: ViewState;
}
const thirdData = [
  { sectionName: "3A", imgUrl: ThirdAPhoto, width: "14.1%", height: "151px", top: "-10px", left: " 4.5%", top768: "-35px", top575: "-25px", height575: "100%" },
  { sectionName: "3B", imgUrl: ThirdBPhoto, width: "15%", height: "176px", top: "40px", left: " 15%", top768: "-5px", top575: "5px", height575: "100%" },
  { sectionName: "3C", imgUrl: ThirdCPhoto, width: "11.4%", height: "185px", top: "70px", left: " 28%", top768: "15px", top575: "20px", height575: "100%" },
  { sectionName: "3D", imgUrl: ThirdDPhoto, width: "14.1%", height: "176px", top: "85px", left: " 42.5%", top768: "30px", top575: "25px", height575: "100%" },
  { sectionName: "3E", imgUrl: ThirdEPhoto, width: "11.4%", height: "185px", top: "70px", left: " 60%", top768: "15px", top575: "20px", height575: "100%" },
  { sectionName: "3F", imgUrl: ThirdFPhoto, width: "15.1%", height: "176px", top: "40px", left: " 69%", top768: "-5px", top575: "5px", height575: "100%" },
  { sectionName: "3G", imgUrl: ThirdGPhoto, width: "14.1%", height: "150px", top: "-10px", left: " 80.5%", top768: "-35px", top575: "-25px", height575: "100%" },
];
function SectionThird({ state }: Props) {
  return (
    <Third>
      {thirdData.map((item) => (
        <ThirdBase
          sectionName={item.sectionName}
          state={state}
          imgUrl={item.imgUrl}
          $width={item.width}
          $height={item.height}
          $top={item.top}
          $left={item.left}
          $top768={item.top768}
          $top575={item.top575}
          $height575={item.height575}
        />
      ))}
    </Third>
  );
}

export default SectionThird;
