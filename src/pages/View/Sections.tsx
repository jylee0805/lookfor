import styled from "styled-components";
import SecondGPhoto from "../../images/Vector 9.svg";
import SecondFPhoto from "../../images/Vector 9-1.svg";
import SecondEPhoto from "../../images/Vector 9-2.svg";
import SecondDPhoto from "../../images/Vector 9-3.svg";
import SecondCPhoto from "../../images/Vector 9-4.svg";
import SecondBPhoto from "../../images/Vector 9-5.svg";
import SecondAPhoto from "../../images/Vector 9-6.svg";
import VIPAPhoto from "../../images/Vector 7.svg";
import VIPBPhoto from "../../images/Vector 8.svg";
import VIPCPhoto from "../../images/Vector 7-2.svg";
import ThirdGPhoto from "../../images/Vector 9-7.svg";
import ThirdFPhoto from "../../images/Vector 9-8.svg";
import ThirdEPhoto from "../../images/Vector 9-9.svg";
import ThirdDPhoto from "../../images/Vector 9-10.svg";
import ThirdCPhoto from "../../images/Vector 9-11.svg";
import ThirdBPhoto from "../../images/Vector 9-12.svg";
import ThirdAPhoto from "../../images/Vector 9-13.svg";

import { useState } from "react";
import { State } from ".";
import { motion } from "framer-motion";

const SelectSection = styled.div`
  width: 65%;
  max-width: 780px;
  padding: 0 30px;
  padding-right: 0;
  font-weight: 700;

  @media (max-width: 992px) {
    padding: 0 30px;
    width: 768px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    width: 575px;
  }
  @media (max-width: 575px) {
    width: 360px;
    padding: 0;
    font-size: 1rem;
  }
`;

const Vip = styled.div`
  position: relative;
  height: 160px;
  color: #000;
  @media (max-width: 768px) {
    height: 120px;
  }
  @media (max-width: 575px) {
    height: 100px;
  }
  @media (max-width: 475px) {
    height: 80px;
  }
  @media (max-width: 375px) {
    height: 60px;
  }
`;

const VipAMain = styled.div<{ x: number; y: number }>`
  width: 300px;
  height: 200px;
  position: fixed;
  display: none;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  transform: translate(-100%, -100%);
  background-color: #ffffff; /* 初始顏色 */
  padding: 5px;
  border-radius: 10px;
`;

const VipA = styled(motion.div)`
  width: 19.6%;
  height: 160px;
  position: absolute;
  top: 0;
  left: 16%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPAPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  &:hover + ${VipAMain} {
    display: block;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;

const VipMainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const VipB = styled(motion.div)`
  width: 21%;
  height: 161px;
  position: absolute;
  top: 0;
  left: 38%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPBPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  &:hover + ${VipAMain} {
    display: block;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const VipC = styled(motion.div)`
  width: 19.5%;
  height: 160px;
  position: absolute;
  top: 0;
  left: 62%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPCPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  &:hover + ${VipAMain} {
    display: block;
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const Second = styled.div`
  position: relative;
  height: 180px;
  color: #000;
  @media (max-width: 768px) {
    height: 140px;
  }
  @media (max-width: 575px) {
    height: 80px;
  }
`;
const SecondDiv = styled(motion.div)`
  position: absolute;
  background-color: #ffb3b3;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
`;

const SecondA = styled(SecondDiv)`
  width: 14.5%;
  height: 150px;
  top: 0;
  left: 5%;
  mask-image: url("${SecondAPhoto}");

  @media (max-width: 575px) {
    height: 100%;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const SecondB = styled(SecondDiv)`
  width: 13.2%;
  height: 165px;
  top: 48px;
  left: 16.5%;
  mask-image: url("${SecondBPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 28px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;

const SecondC = styled(SecondDiv)`
  width: 11.9%;
  height: 156px;
  top: 72px;
  left: 28.5%;
  mask-image: url("${SecondCPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 38px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const SecondD = styled(SecondDiv)`
  width: 14.1%;
  height: 148px;
  top: 82px;
  left: 42%;
  mask-image: url("${SecondDPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 42px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const SecondE = styled(SecondDiv)`
  width: 11.9%;
  height: 156px;
  top: 74px;
  left: 57.5%;
  mask-image: url("${SecondEPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 38px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const SecondF = styled(SecondDiv)`
  width: 13.2%;
  height: 165px;
  top: 47px;
  left: 68%;
  mask-image: url("${SecondFPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 25px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const SecondG = styled(SecondDiv)`
  width: 15%;
  height: 150px;
  top: 0px;
  left: 77.5%;
  mask-image: url("${SecondGPhoto}");

  @media (max-width: 575px) {
    height: 100%;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;

const Third = styled.div`
  height: 300px;
  position: relative;
  color: #000;
  @media (max-width: 768px) {
    height: 200px;
  }
  @media (max-width: 575px) {
    height: 150px;
  }
`;
const ThirdDiv = styled(motion.div)`
  background-color: #fff1b3;
  position: absolute;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;
  &:hover {
    background-color: #ffe77b;
  }
`;
const ThirdA = styled(ThirdDiv)`
  width: 14.1%;
  height: 151px;
  top: 0;
  left: 4.5%;
  mask-image: url("${ThirdAPhoto}");

  @media (max-width: 575px) {
    height: 100%;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;

const ThirdB = styled(ThirdDiv)`
  width: 15%;
  height: 176px;
  top: 50px;
  left: 15%;
  mask-image: url("${ThirdBPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 32px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const ThirdC = styled(ThirdDiv)`
  width: 11.4%;
  height: 185px;
  top: 80px;
  left: 28%;
  mask-image: url("${ThirdCPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 48px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const ThirdD = styled(ThirdDiv)`
  width: 14.1%;
  height: 176px;
  top: 95px;
  left: 42.5%;
  mask-image: url("${ThirdDPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 52px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const ThirdE = styled(ThirdDiv)`
  width: 11.4%;
  height: 185px;
  top: 80px;
  left: 60%;
  mask-image: url("${ThirdEPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 48px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const ThirdF = styled(ThirdDiv)`
  width: 15.1%;
  height: 176px;
  top: 50px;
  left: 69%;
  mask-image: url("${ThirdFPhoto}");

  @media (max-width: 575px) {
    height: 100%;
    top: 32px;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;

const ThirdG = styled(ThirdDiv)`
  width: 14.1%;
  height: 150px;
  top: 0;
  left: 80.5%;
  mask-image: url("${ThirdGPhoto}");

  @media (max-width: 575px) {
    height: 100%;
  }
  &:hover + ${VipAMain} {
    display: block;
  }
`;
const Text = styled.p<{ haveData: boolean; color: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props {
  handlerSection: (section: string) => void;
  state: State;
}
function Sections({ handlerSection, state }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    console.log(e.clientX, e.clientY);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <SelectSection
      onClick={(e) => {
        console.log(e);
        const target = e.target as HTMLElement;
        if (target.dataset.section !== undefined || target.dataset.section !== undefined) {
          handlerSection(target.dataset.section);
        }
      }}
    >
      <Vip>
        <VipA
          data-section="VIPA"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "VIPA" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="VIPA" haveData={state.allPost?.some((item) => item.section === "VIPA") ?? false} color={state.allPost?.some((item) => item.section === "VIPA") ? "#d51aff" : "none"}>
            VIPA
          </Text>
        </VipA>
        {state.allPost?.find((view) => view.section === "VIPA") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "VIPA")?.image || ""} />
          </VipAMain>
        )}
        <VipB
          data-section="VIPB"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "VIPB" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="VIPB" haveData={state.allPost?.some((item) => item.section === "VIPB") ?? false} color={state.allPost?.some((item) => item.section === "VIPB") ? "#d51aff" : "none"}>
            VIPB
          </Text>
        </VipB>
        {state.allPost?.find((view) => view.section === "VIPB") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "VIPB")?.image || ""} />
          </VipAMain>
        )}
        <VipC
          data-section="VIPC"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "VIPC" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="VIPC" haveData={state.allPost?.some((item) => item.section === "VIPC") ?? false} color={state.allPost?.some((item) => item.section === "VIPC") ? "#d51aff" : "none"}>
            VIPC
          </Text>
        </VipC>
        {state.allPost?.find((view) => view.section === "VIPC") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "VIPC")?.image || ""} />
          </VipAMain>
        )}
      </Vip>
      <Second>
        <SecondA
          data-section="2A"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2A" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 5 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2A" haveData={state.allPost?.some((item) => item.section === "2A") ?? false} color={state.allPost?.some((item) => item.section === "2A") ? "#ff1a1a" : "none"}>
            2A
          </Text>
        </SecondA>
        {state.allPost?.find((view) => view.section === "2A") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2A")?.image || ""} />
          </VipAMain>
        )}
        <SecondB
          data-section="2B"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2B" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2B" haveData={state.allPost?.some((item) => item.section === "2B") ?? false} color={state.allPost?.some((item) => item.section === "2B") ? "#ff1a1a" : "none"}>
            2B
          </Text>
        </SecondB>
        {state.allPost?.find((view) => view.section === "2B") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2B")?.image || ""} />
          </VipAMain>
        )}
        <SecondC
          data-section="2C"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2C" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2C" haveData={state.allPost?.some((item) => item.section === "2C") ?? false} color={state.allPost?.some((item) => item.section === "2C") ? "#ff1a1a" : "none"}>
            2C
          </Text>
        </SecondC>
        {state.allPost?.find((view) => view.section === "2C") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2C")?.image || ""} />
          </VipAMain>
        )}
        <SecondD
          data-section="2D"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2D" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2D" haveData={state.allPost?.some((item) => item.section === "2D") ?? false} color={state.allPost?.some((item) => item.section === "2D") ? "#ff1a1a" : "none"}>
            2D
          </Text>
        </SecondD>
        {state.allPost?.find((view) => view.section === "2D") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2D")?.image || ""} />
          </VipAMain>
        )}
        <SecondE
          data-section="2E"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2E" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2E" haveData={state.allPost?.some((item) => item.section === "2E") ?? false} color={state.allPost?.some((item) => item.section === "2E") ? "#ff1a1a" : "none"}>
            2E
          </Text>
        </SecondE>
        {state.allPost?.find((view) => view.section === "2E") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2E")?.image || ""} />
          </VipAMain>
        )}
        <SecondF
          data-section="2F"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2F" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2F" haveData={state.allPost?.some((item) => item.section === "2F") ?? false} color={state.allPost?.some((item) => item.section === "2F") ? "#ff1a1a" : "none"}>
            2F
          </Text>
        </SecondF>
        {state.allPost?.find((view) => view.section === "2F") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2F")?.image || ""} />
          </VipAMain>
        )}
        <SecondG
          data-section="2G"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "2G" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="2G" haveData={state.allPost?.some((item) => item.section === "2G") ?? false} color={state.allPost?.some((item) => item.section === "2G") ? "#ff1a1a" : "none"}>
            2G
          </Text>
        </SecondG>
        {state.allPost?.find((view) => view.section === "2G") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "2G")?.image || ""} />
          </VipAMain>
        )}
      </Second>
      <Third>
        <ThirdA
          data-section="3A"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3A" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3A" haveData={state.allPost?.some((item) => item.section === "3A") ?? false} color={state.allPost?.some((item) => item.section === "3A") ? "#ffd51a" : "none"}>
            3A
          </Text>
        </ThirdA>
        {state.allPost?.find((view) => view.section === "3A") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3A")?.image || ""} />
          </VipAMain>
        )}
        <ThirdB
          data-section="3B"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3B" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3B" haveData={state.allPost?.some((item) => item.section === "3B") ?? false} color={state.allPost?.some((item) => item.section === "3B") ? "#ffd51a" : "none"}>
            3B
          </Text>
        </ThirdB>
        {state.allPost?.find((view) => view.section === "3B") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3B")?.image || ""} />
          </VipAMain>
        )}
        <ThirdC
          data-section="3C"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3C" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3C" haveData={state.allPost?.some((item) => item.section === "3C") ?? false} color={state.allPost?.some((item) => item.section === "3C") ? "#ffd51a" : "none"}>
            3C
          </Text>
        </ThirdC>
        {state.allPost?.find((view) => view.section === "3C") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3C")?.image || ""} />
          </VipAMain>
        )}
        <ThirdD
          data-section="3D"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3D" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3D" haveData={state.allPost?.some((item) => item.section === "3D") ?? false} color={state.allPost?.some((item) => item.section === "3D") ? "#ffd51a" : "none"}>
            3D
          </Text>
        </ThirdD>
        {state.allPost?.find((view) => view.section === "3D") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3D")?.image || ""} />
          </VipAMain>
        )}
        <ThirdE
          data-section="3E"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3E" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3E" haveData={state.allPost?.some((item) => item.section === "3E") ?? false} color={state.allPost?.some((item) => item.section === "3E") ? "#ffd51a" : "none"}>
            3E
          </Text>
        </ThirdE>
        {state.allPost?.find((view) => view.section === "3E") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3E")?.image || ""} />
          </VipAMain>
        )}
        <ThirdF
          data-section="3F"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3F" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3F" haveData={state.allPost?.some((item) => item.section === "3F") ?? false} color={state.allPost?.some((item) => item.section === "3F") ? "#ffd51a" : "none"}>
            3F
          </Text>
        </ThirdF>
        {state.allPost?.find((view) => view.section === "3F") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3F")?.image || ""} />
          </VipAMain>
        )}
        <ThirdG
          data-section="3G"
          whileTap={{ scale: 1 }}
          animate={{
            scale: state.selectedSection === "3G" ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onMouseEnter={handleMouseMove}
        >
          <Text data-section="3G" haveData={state.allPost?.some((item) => item.section === "3G") ?? false} color={state.allPost?.some((item) => item.section === "3G") ? "#ffd51a" : "none"}>
            3G
          </Text>
        </ThirdG>
        {state.allPost?.find((view) => view.section === "3G") && (
          <VipAMain x={mousePosition.x} y={mousePosition.y}>
            <VipMainImg src={state.allPost?.find((view) => view.section === "3G")?.image || ""} />
          </VipAMain>
        )}
      </Third>
    </SelectSection>
  );
}

export default Sections;
