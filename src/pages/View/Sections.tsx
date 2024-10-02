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

const SelectSection = styled.div`
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
const Title = styled.h4`
  font-size: 1.96rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 25px;
  @media (max-width: 575px) {
    font-size: 1.5rem;
    margin-left: 20px;
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

const VipA = styled.div`
  width: 20.6%;
  height: 160px;
  position: absolute;
  top: 0;
  left: 15%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPAPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const VipB = styled.div`
  width: 22%;
  height: 161px;
  position: absolute;
  top: 0;
  left: 38%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPBPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const VipC = styled.div`
  width: 20.5%;
  height: 160px;
  position: absolute;
  top: 0;
  left: 63%;
  background-color: #f1b3ff; /* 初始顏色 */
  mask-image: url("${VIPCPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ca70de; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;

const SecondG = styled.div`
  width: 16%;
  height: 150px;
  position: absolute;
  top: -5px;
  left: 81.5%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondGPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const SecondF = styled.div`
  width: 14.2%;
  height: 165px;
  position: absolute;
  top: 47px;
  left: 71%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondFPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 25px;
  }
`;
const SecondE = styled.div`
  width: 12.9%;
  height: 156px;

  position: absolute;
  top: 74px;
  left: 59.5%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondEPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 38px;
  }
`;
const SecondD = styled.div`
  width: 15.1%;
  height: 148px;

  position: absolute;
  top: 82px;
  left: 42%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondDPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 42px;
  }
`;
const SecondC = styled.div`
  width: 12.9%;
  height: 156px;

  position: absolute;
  top: 72px;
  left: 26.5%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondCPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 38px;
  }
`;
const SecondB = styled.div`
  width: 14.2%;
  height: 165px;

  position: absolute;
  top: 48px;
  left: 13.5%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondBPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 28px;
  }
`;
const SecondA = styled.div`
  width: 15.5%;
  height: 150px;

  position: absolute;
  top: 0;
  left: 2%;
  background-color: #ffb3b3; /* 初始顏色 */
  mask-image: url("${SecondAPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  transform: scale(calc(100vw / 1200)); /* 動態根據視窗寬度縮放 */
  transform-origin: top left; /* 設定縮放原點，確保位置不偏移 */
  object-fit: cover; /* 確保背景圖縮放時保持比例 */
  &:hover {
    background-color: #f57f7f; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;

const ThirdA = styled.div`
  width: 15.1%;
  height: 151px;

  position: absolute;
  top: 0;
  left: 4.5%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdAPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #fff1b3; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;

const ThirdB = styled.div`
  width: 16%;
  height: 176px;

  position: absolute;
  top: 50px;
  left: 15%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdBPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 32px;
  }
`;
const ThirdC = styled.div`
  width: 12.4%;
  height: 185px;

  position: absolute;
  top: 80px;
  left: 28%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdCPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 48px;
  }
`;
const ThirdD = styled.div`
  width: 15.1%;
  height: 176px;

  position: absolute;
  top: 95px;
  left: 42.5%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdDPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 52px;
  }
`;
const ThirdE = styled.div`
  width: 12.4%;
  height: 185px;

  position: absolute;
  top: 80px;
  left: 60%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdEPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 48px;
  }
`;
const ThirdF = styled.div`
  width: 16.1%;
  height: 176px;

  position: absolute;
  top: 50px;
  left: 69%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdFPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
    top: 32px;
  }
`;

const ThirdG = styled.div`
  width: 15.1%;
  height: 150px;

  position: absolute;
  top: 0;
  left: 80.5%;
  background-color: #fff1b3; /* 初始顏色 */
  mask-image: url("${ThirdGPhoto}");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  &:hover {
    background-color: #ffdd00; /* hover 狀態變色 */
  }
  @media (max-width: 575px) {
    height: 100%;
  }
`;
const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface Props {
  handlerSection: (section: string) => void;
}
function Sections({ handlerSection }: Props) {
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
      <Title>區域選擇</Title>
      {/* <Vip>
        <Section data-section="VIPA">VIPA</Section>
        <Section data-section="VIPB">VIPB</Section>
        <Section data-section="VIPC">VIPC</Section>
      </Vip>
      <Second>
        <Section data-section="2A">2A</Section>
        <Section data-section="2B">2B</Section>
        <Section data-section="2C">2C</Section>
        <Section data-section="2D">2D</Section>
        <Section data-section="2E">2E</Section>
        <Section data-section="2F">2F</Section>
        <Section data-section="2G">2G</Section>
      </Second>
      <Third>
        <Section data-section="3A">3A</Section>
        <Section data-section="3B">3B</Section>
        <Section data-section="3C">3C</Section>
        <Section data-section="3D">3D</Section>
        <Section data-section="3E">3E</Section>
        <Section data-section="3F">3F</Section>
        <Section data-section="3G">3G</Section>
      </Third> */}
      <Vip>
        <VipA data-section="VIPA">
          <Text data-section="VIPA">VIPA</Text>
        </VipA>
        <VipB data-section="VIPB">
          <Text data-section="VIPB">VIPB</Text>
        </VipB>
        <VipC data-section="VIPC">
          <Text data-section="VIPC">VIPC</Text>
        </VipC>
      </Vip>
      <Second>
        <SecondA data-section="2A">
          <Text data-section="2A">2A</Text>
        </SecondA>
        <SecondB data-section="2B">
          <Text data-section="2B">2B</Text>
        </SecondB>
        <SecondC data-section="2C">
          <Text data-section="2C">2C</Text>
        </SecondC>
        <SecondD data-section="2D">
          <Text data-section="2D">2D</Text>
        </SecondD>
        <SecondE data-section="2E">
          <Text data-section="2E">2E</Text>
        </SecondE>
        <SecondF data-section="2F">
          <Text data-section="2F">2F</Text>
        </SecondF>
        <SecondG data-section="2G">
          <Text data-section="2G">2G</Text>
        </SecondG>
      </Second>
      <Third>
        <ThirdA data-section="3A">
          <Text data-section="3A">3A</Text>
        </ThirdA>
        <ThirdB data-section="3B">
          <Text data-section="3B">3B</Text>
        </ThirdB>
        <ThirdC data-section="3C">
          <Text data-section="3C">3C</Text>
        </ThirdC>
        <ThirdD data-section="3D">
          <Text data-section="3D">3D</Text>
        </ThirdD>
        <ThirdE data-section="3E">
          <Text data-section="3E">3E</Text>
        </ThirdE>
        <ThirdF data-section="3F">
          <Text data-section="3F">3F</Text>
        </ThirdF>
        <ThirdG data-section="3G">
          <Text data-section="3G">3G</Text>
        </ThirdG>
      </Third>
    </SelectSection>
  );
}

export default Sections;
