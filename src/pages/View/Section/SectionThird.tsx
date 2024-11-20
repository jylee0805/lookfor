import styled from "styled-components";
import { Seats } from "..";
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
  sectionData: Seats[];
}

function SectionThird({ state, sectionData }: Props) {
  return (
    <Third>
      {sectionData
        .filter((item) => item.sectionName.includes("3"))
        .map((item) => (
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
            key={item.sectionName}
          />
        ))}
    </Third>
  );
}

export default SectionThird;
