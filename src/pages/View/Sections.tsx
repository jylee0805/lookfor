import styled from "styled-components";

const SelectSection = styled.div`
  padding: 60px;
`;
const Title = styled.h4`
  font-size: 32px;
  font-weight: 600;
`;
const Vip = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: center;
`;
const Second = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;
const Third = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: center;
`;
const VipFirst = styled.div`
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 80%);
  width: 248px;
  height: 158px;
  background: #c2c2c2;
`;
const VipSecond = styled(VipFirst)`
  transform: scaleX(-1);
`;
/*const SecondA = styled.div`
  width: 90px;
  height: 110px;
  background: rgb(105, 240, 174);
  clip-path: polygon(35% 0%, 100% 25%, 60% 100%, 0% 85%);
  text-align: center;
  color: #000;
  line-height: 90px;
`;*/
/*const SecondG = styled(SecondA)`
  //transform: scaleX(-1);
`;*/
const SecondB = styled.div`
  width: 90px;
  height: 110px;
  background: rgb(105, 240, 174);
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
        <VipFirst data-section="2A"></VipFirst>
        <VipSecond data-section="2A"></VipSecond>
      </Vip>
      <Second>
        <SecondB data-section="2A">2A</SecondB>
        <SecondB data-section="2B">2B</SecondB>
        <SecondB data-section="2C">2C</SecondB>
        <SecondB data-section="2D">2D</SecondB>
        <SecondB data-section="2E">2E</SecondB>
        <SecondB data-section="2F">2F</SecondB>
        <SecondB data-section="2G">2G</SecondB>
      </Second>
      <Third>
        <SecondB data-section="3A">3A</SecondB>
        <SecondB data-section="3B">3B</SecondB>
        <SecondB data-section="3C">3C</SecondB>
        <SecondB data-section="3D">3D</SecondB>
        <SecondB data-section="3E">3E</SecondB>
        <SecondB data-section="3F">3F</SecondB>
        <SecondB data-section="3G">3G</SecondB>
      </Third>
    </SelectSection>
  );
}

export default Sections;
