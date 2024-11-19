import styled from "styled-components";
import { Seats } from "..";
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
  sectionData: Seats[];
}

function SectionSecond({ state, sectionData }: Props) {
  return (
    <Second>
      {sectionData
        .filter((item) => item.sectionName.includes("2"))
        .map((item) => (
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
            key={item.sectionName}
          />
        ))}
    </Second>
  );
}

export default SectionSecond;
