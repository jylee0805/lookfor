import { motion } from "framer-motion";
import styled from "styled-components";
import useSection from "../hooks/useSection";
import { State } from "../utils/ViewContextProvider";

const Preview = styled.div<{ $x: number; $y: number }>`
  width: 300px;
  height: 200px;
  position: fixed;
  display: none;
  top: ${(props) => `${props.$y}px`};
  left: ${(props) => `${props.$x}px`};
  transform: translate(-100%, -100%);
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
`;

const SectionDiv = styled(motion.div)<{ $windowWidth: number; $imgUrl: string }>`
  position: absolute;
  mask-image: url("${(props) => props.$imgUrl}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  cursor: pointer;

  &:hover + ${Preview} {
    display: ${(props) => (props.$windowWidth <= 992 ? "none" : "block")};
  }
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
const Text = styled.p<{ $haveData: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface SectionProps {
  sectionName: string;
  state: State;
  imgUrl: string;
  className?: string;
}

const Section = ({ sectionName, state, imgUrl, className }: SectionProps) => {
  const { hasData, sectionData, image, mousePosition, handleMouseMove, windowWidth } = useSection(sectionName, state);
  return (
    <>
      <SectionDiv
        className={className}
        $windowWidth={windowWidth}
        data-section={sectionName}
        whileTap={{ scale: 1 }}
        animate={{
          scale: state.selectedSection === sectionName ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onMouseEnter={handleMouseMove}
        $imgUrl={imgUrl}
      >
        <Text data-section={sectionName} $haveData={hasData}>
          {sectionName}
        </Text>
      </SectionDiv>
      {sectionData && (
        <Preview $x={mousePosition.x} $y={mousePosition.y}>
          <PreviewImg src={image} />
        </Preview>
      )}
    </>
  );
};

export default Section;
