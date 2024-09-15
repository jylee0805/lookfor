import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";

const Container = styled.div``;
const Banner = styled.div`
  text-align: center;
  padding: 200px 0;
`;
const VenueTitle = styled.h2`
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 1rem;
`;
const VenueSubTitle = styled.h3`
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 5px;
`;
const Nav = styled.ul`
  background: #f8f8f8;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  margin-bottom: 42px;
`;
const NavItem = styled.li``;
const StyleLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 4px;
  color: #000;
  padding: 10px;
`;
const Main = styled.main`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 80px;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
const TransportationBtn = styled.button`
  grid-column: span 2;
  display: block;
  margin: 0 auto 32px;
  font-size: 24px;
  font-weight: 600;
  padding: 12px 24px;
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
`;
const SubTitle = styled.h4`
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 10px;
  padding: 0 50px;
  display: flex;
  align-items: center;
`;
const Station = styled.p``;
const Away = styled.p``;
const Detail = styled.div`
  padding: 50px 0;
`;
const Line = styled.div`
  grid-column: span 2;
  width: 100%;
  height: 1px;
  background: #000;
`;

const containerStyle = {
  width: "100%",
  height: "600px",
};
const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  overflow: hidden; /* 防止地圖超出容器 */
`;

function TransportationDriving() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA3EzkV4hLZiO3UWwyXgtWQxZHRc85JmHs",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <Banner>
        <VenueTitle>臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/">視角分享</StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-driving">交通資訊</StyleLink>
        </NavItem>
      </Nav>
      <Main>
        <BtnBox>
          <TransportationBtn>大眾運輸</TransportationBtn>
          <TransportationBtn>自行開車</TransportationBtn>
        </BtnBox>
        <Content>
          <SubTitle>自行開車</SubTitle>
          <Detail>
            <Station>昆陽站</Station>
            <Away>距離本中心約 600 公尺距離。請從 4 號出口出站，向東步行約 8 分鐘抵達。</Away>
            <Station>南港站</Station>
            <Away>距離本中心約 900 公尺。請由 1A 連通道出站，沿指標前行至 CITYLINK B 棟，由一樓走出大門後，沿市民大道向西步行約 11 分鐘抵達。</Away>
          </Detail>
          <Line />
          <SubTitle>停車資訊</SubTitle>
          <MapContainer>
            <GoogleMap zoom={16} center={{ lat: 25.05212208941782, lng: 121.59858876881236 }} mapContainerStyle={containerStyle}></GoogleMap>
          </MapContainer>
        </Content>
      </Main>
    </Container>
  );
}

export default TransportationDriving;
