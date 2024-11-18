import styled from "styled-components";
import VIPCPhoto from "../../../assets/Vector 7-2.svg";
import VIPAPhoto from "../../../assets/Vector 7.svg";
import VIPBPhoto from "../../../assets/Vector 8.svg";
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
}
const vipData = [
  { sectionName: "VIPA", imgUrl: VIPAPhoto, width: "19.6%", height: "160px", top: "0", left: " 16%" },
  { sectionName: "VIPB", imgUrl: VIPBPhoto, width: "21%", height: "161px", top: "0", left: " 38%" },
  { sectionName: "VIPC", imgUrl: VIPCPhoto, width: "19.5%", height: "160px", top: "0", left: " 62%" },
];
function SectionVIP({ state }: Props) {
  return (
    <Vip>
      {vipData.map((item) => (
        <VipBase sectionName={item.sectionName} state={state} imgUrl={item.imgUrl} $width={item.width} $height={item.height} $top={item.top} $left={item.left} key={item.sectionName} />
      ))}
    </Vip>
  );
}

export default SectionVIP;
