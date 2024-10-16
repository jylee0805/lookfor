import styled from "styled-components";
import { State } from "..";
import VIPCPhoto from "../../../assets/Vector 7-2.svg";
import VIPAPhoto from "../../../assets/Vector 7.svg";
import VIPBPhoto from "../../../assets/Vector 8.svg";
import Section from "../../../components/Section";

const Vip = styled.div`
  position: relative;
  height: 160px;
  color: #000;
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const VipBase = styled(Section)`
  background-color: #ffe6cf;
  &:hover {
    background-color: #ff9318;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const VipA = styled(VipBase)`
  width: 19.6%;
  height: 160px;
  top: 0;
  left: 16%;
`;
const VipB = styled(VipBase)`
  width: 21%;
  height: 161px;
  top: 0;
  left: 38%;
`;
const VipC = styled(VipBase)`
  width: 19.5%;
  height: 160px;
  top: 0;
  left: 62%;
`;

interface Props {
  state: State;
}

function SectionVIP({ state }: Props) {
  return (
    <Vip>
      <VipA sectionName="VIPA" state={state} imgUrl={VIPAPhoto} />
      <VipB sectionName="VIPB" state={state} imgUrl={VIPBPhoto} />
      <VipC sectionName="VIPC" state={state} imgUrl={VIPCPhoto} />
    </Vip>
  );
}

export default SectionVIP;
