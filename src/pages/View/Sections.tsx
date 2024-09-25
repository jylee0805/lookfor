import styled from "styled-components";
// import SecondGPhoto from "../../images/Vector 9.svg";
// import SecondFPhoto from "../../images/Vector 9-1.svg";
// import SecondEPhoto from "../../images/Vector 9-2.svg";
// import SecondDPhoto from "../../images/Vector 9-3.svg";
// import SecondCPhoto from "../../images/Vector 9-4.svg";
// import SecondBPhoto from "../../images/Vector 9-5.svg";
// import SecondAPhoto from "../../images/Vector 9-6.svg";
// import VIPAPhoto from "../../images/Vector 7-1.svg";
// import VIPBPhoto from "../../images/Vector 8.svg";
// import VIPCPhoto from "../../images/Vector 7.svg";
// import ThirdGPhoto from "../../images/Vector 9-7.svg";
// import ThirdFPhoto from "../../images/Vector 9-8.svg";
// import ThirdEPhoto from "../../images/Vector 9-9.svg";
// import ThirdDPhoto from "../../images/Vector 9-10.svg";
// import ThirdCPhoto from "../../images/Vector 9-11.svg";
// import ThirdBPhoto from "../../images/Vector 9-12.svg";
// import ThirdAPhoto from "../../images/Vector 9-13.svg";

const SelectSection = styled.div`
  padding: 60px;
`;
const Title = styled.h4`
  font-size: 32px;
  font-weight: 600;
`;
const Vip = styled.div`
  display: flex;

  column-gap: 20px;
  justify-content: center;
  align-items: end;
  margin-bottom: 15px;
`;
const Second = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
  margin-bottom: 15px;
`;
const Third = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
`;
const Section = styled.div`
  width: 163px;
  height: 150px;
  background: #d2d2d2;
`;
// const VipA = styled.div`
//   width: 163px;
//   height: 160px;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-image: url(${VIPAPhoto});
//   position: relative;
// `;
// const VipB = styled.div`
//   width: 171px;
//   height: 161px;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-image: url(${VIPBPhoto});
//   position: relative;
// `;
// const VipC = styled(VipA)`
//   width: 159px;
//   height: 160px;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-image: url(${VIPCPhoto});
// `;

// const SecondG = styled.div`
//   width: 120px;
//   height: 150px;
//   position: absolute;
//   top: 0px;
//   left: 81.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondGPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondF = styled.div`
//   width: 110px;
//   height: 165px;
//   position: absolute;
//   top: 47px;
//   left: 71%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondFPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondE = styled.div`
//   width: 100px;
//   height: 156px;

//   position: absolute;
//   top: 74px;
//   left: 59.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondEPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondD = styled.div`
//   width: 117px;
//   height: 148px;

//   position: absolute;
//   top: 82px;
//   left: 42%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondDPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondC = styled.div`
//   width: 100px;
//   height: 156px;

//   position: absolute;
//   top: 72px;
//   left: 26.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondCPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondB = styled.div`
//   width: 110px;
//   height: 165px;

//   position: absolute;
//   top: 48px;
//   left: 13.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondBPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const SecondA = styled.div`
//   width: 120px;
//   height: 150px;

//   position: absolute;
//   top: 0;
//   left: 2%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${SecondAPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;

// const ThirdA = styled.div`
//   width: 117px;
//   height: 151px;

//   position: absolute;
//   top: 0;
//   left: 4.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdAPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;

// const ThirdB = styled.div`
//   width: 124px;
//   height: 176px;

//   position: absolute;
//   top: 50px;
//   left: 15%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdBPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const ThirdC = styled.div`
//   width: 96px;
//   height: 185px;

//   position: absolute;
//   top: 80px;
//   left: 28%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdCPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const ThirdD = styled.div`
//   width: 117px;
//   height: 176px;

//   position: absolute;
//   top: 95px;
//   left: 42.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdDPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const ThirdE = styled.div`
//   width: 96px;
//   height: 185px;

//   position: absolute;
//   top: 80px;
//   left: 60%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdEPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
// const ThirdF = styled.div`
//   width: 125px;
//   height: 176px;

//   position: absolute;
//   top: 50px;
//   left: 69%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdFPhoto}) no-repeat center;
//   mask-size: contain;
//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;

// const ThirdG = styled.div`
//   width: 117px;
//   height: 150px;

//   position: absolute;
//   top: 0;
//   left: 80.5%;
//   background-color: #d2d2d2; /* 初始顏色 */
//   mask: url(${ThirdGPhoto}) no-repeat center;
//   mask-size: contain;

//   &:hover {
//     background-color: #ffdd00; /* hover 狀態變色 */
//   }
// `;
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
      <Vip>
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
      </Third>
      {/* <Vip>
        <VipA data-section="VIPA">
          <Text>VIPA</Text>
        </VipA>
        <VipB data-section="VIPB">
          <Text>VIPB</Text>
        </VipB>
        <VipC data-section="VIPC">
          <Text>VIPC</Text>
        </VipC>
      </Vip>
      <Second>
        <SecondA data-section="2A">
          <Text>2A</Text>
        </SecondA>
        <SecondB data-section="2B">
          <Text>2B</Text>
        </SecondB>
        <SecondC data-section="2C">
          <Text>2C</Text>
        </SecondC>
        <SecondD data-section="2D">
          <Text>2D</Text>
        </SecondD>
        <SecondE data-section="2E">
          <Text>2E</Text>
        </SecondE>
        <SecondF data-section="2F">
          <Text>2F</Text>
        </SecondF>
        <SecondG data-section="2G">
          <Text>2G</Text>
        </SecondG>
      </Second>
      <Third>
        <ThirdA data-section="3A">
          <Text>3A</Text>
        </ThirdA>
        <ThirdB data-section="3B">
          <Text>3B</Text>
        </ThirdB>
        <ThirdC data-section="3C">
          <Text>3C</Text>
        </ThirdC>
        <ThirdD data-section="3D">
          <Text>3D</Text>
        </ThirdD>
        <ThirdE data-section="3E">
          <Text>3E</Text>
        </ThirdE>
        <ThirdF data-section="3F">
          <Text>3F</Text>
        </ThirdF>
        <ThirdG data-section="3G">
          <Text>3G</Text>
        </ThirdG>
      </Third> */}
    </SelectSection>
  );
}

export default Sections;
