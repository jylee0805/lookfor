import styled from "styled-components";

import { Seats } from "..";
import Section from "../../../components/Section";
import { ViewState } from "../../../types";

const Vip = styled.div`
  position: relative;
  height: 160px;
  color: #000;
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const VipBase = styled(Section)<{ $width: string; $height: string; $top: string; $left: string }>`
  background-color: #ffe6cf;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  &:hover {
    background-color: #ff9318;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
interface Props {
  state: ViewState;
  sectionData: Seats[];
}

function SectionVIP({ state, sectionData }: Props) {
  return (
    <Vip>
      {sectionData
        .filter((item) => item.sectionName.includes("VIP"))
        .map((item) => (
          <VipBase sectionName={item.sectionName} state={state} imgUrl={`${item.imgUrl}`} $width={item.width} $height={item.height} $top={item.top} $left={item.left} key={item.sectionName} />
        ))}
    </Vip>
  );
}

export default SectionVIP;
