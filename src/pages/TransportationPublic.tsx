import styled from "styled-components";
import VenueHeader from "../components/VenueHeader";

const Container = styled.div``;
const Main = styled.main`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 80px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
  line-height: 2;
  @media (max-width: 992px) {
    grid-template-columns: auto;
  }
  @media (max-width: 768px) {
    gap: 20px;
  }
`;
const SubTitle = styled.h4`
  font-size: 1.96rem;
  font-weight: 900;
  letter-spacing: 10px;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  @media (max-width: 992px) {
    padding: 0;
  }
  @media (max-width: 575px) {
  }
`;
const Station = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;
const Away = styled.p`
  margin-bottom: 25px;

  @media (max-width: 992px) {
  }
`;
const Detail = styled.div`
  @media (max-width: 992px) {
    grid-template-columns: auto;
    padding: 0;
  }
`;
const Line = styled.div`
  grid-column: span 2;
  width: 100%;
  height: 1px;
  background: #d2d2d2;
  margin-bottom: 30px;
  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;

function TransportationPublic() {
  return (
    <Container>
      <VenueHeader />
      <Main>
        <Content>
          <SubTitle>捷運</SubTitle>
          <Detail>
            <Station>捷運昆陽站</Station>
            <Away>距離本中心約 600 公尺距離。請從 4 號出口出站，向東步行約 8 分鐘抵達。</Away>
            <Station>捷運南港站</Station>
            <Away>距離本中心約 900 公尺。請由 1A 連通道出站，沿指標前行至 CITYLINK B 棟，由一樓走出大門後，沿市民大道向西步行約 11 分鐘抵達。</Away>
          </Detail>
          <Line />
          <SubTitle>高鐵、台鐵</SubTitle>
          <Detail>
            <Station>南港車站</Station>
            <Away>南港車站北出口出站後，沿市民大道向西步行約 11 分鐘抵達。</Away>
          </Detail>
          <Line />
          <SubTitle>公車</SubTitle>
          <Detail>
            <Station>捷運昆陽站</Station>
            <Away>
              212、212直、212夜、270、270區、279、281、284、588、600、817、藍15、藍20區、藍22、藍23、信義幹線、藍25、藍36、藍50、小1區、藍51、小3(含區)、小5(含區)、小12(含區)、市民小巴15、551。
            </Away>
            <Station>臺北流行音樂中心站（市民大道）</Station>
            <Away>小12、小12區</Away>
            <Station>南港高中站</Station>
            <Away>212、279、281、284、551、600、信義幹線、小1區、小3、小3區、小5、小5區、市民小巴15、藍20區、藍36、藍50。</Away>
            <Station>東明里站 （南港路二段，近表演廳）</Station>
            <Away>203、205、212、276、281、306、306區、551、600、605、605 新台五線、668、678、679、711、小1區、小5、小5區。</Away>
          </Detail>
          <Line />
          <SubTitle>YouBike</SubTitle>
          <Detail>
            <Station>捷運昆陽站（1號出口）</Station>
            <Away>捷運昆陽站 1 號出口外停車場旁</Away>
            <Station>南港路二段巷口</Station>
            <Away>南港路二段／南港路二段 178 巷口（北側）</Away>
            <Station>南港車站（興華路）</Station>
            <Away>市民大道八段／興華路口西北側人行道（鄰近南港高鐵站）</Away>
            <Station>南港車站（忠孝東路）</Station>
            <Away>忠孝東路七段與忠孝東路七段 415 巷交叉口（鄰近南港高鐵站）</Away>
            <Station>台北流行音樂中心（市民大道）</Station>
            <Away>市民大道 8 段 99 號（表演廳）</Away>
            <Station>台北流行音樂中心（南港路）</Station>
            <Away>南港路二段 178 巷路口（表演廳側）</Away>
          </Detail>
        </Content>
      </Main>
    </Container>
  );
}

export default TransportationPublic;
