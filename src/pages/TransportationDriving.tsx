import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import pin from "../images/pin.png";
import selectPin from "../images/google-maps.png";
import api from "../utils/api";
import proj4 from "proj4";

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
const ParkSubTitle = styled(SubTitle)`
  grid-column: span 2;
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
  padding: 0 50px;
  grid-column: span 2;
  display: flex;
  column-gap: 20px;
`;
const Map = styled.div`
  flex-grow: 1;
  height: 500px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  overflow: hidden; /* 防止地圖超出容器 */
`;
const Place = styled.div`
  width: 30%;
`;
const PlaceContent = styled.div`
  width: 100%;
`;
const PlaceTitle = styled.p`
  font-size: 20px;
  color: #000;
  font-weight: 700;
  margin-bottom: 10px;
`;
const PlaceName = styled.p`
  font-size: 16px;
  color: #000;
  font-weight: 700;
  margin-bottom: 10px;
`;
const PlaceText = styled.p`
  font-size: 15px;
  color: #000;
  line-height: 1.8;
`;

export interface Place {
  lat: number | string;
  lng: number | string;
  name: string;
  parkNum: string;
  fee: string;
  openTime: string;
  address?: string;
  placeId?: string;
  availablecar?: number;
  availablemotor?: number;
}

export interface PlaceAvailable {
  availablebus: number;
  availablecar: number;
  availablehandicap: number;
  availableheavymotor: number;
  availablemotor: number;
  id: string;
}
function TransportationDriving() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA3EzkV4hLZiO3UWwyXgtWQxZHRc85JmHs",
    libraries: ["places"],
  });
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);

  const tw97 = "+proj=tmerc +lat_0=0 +lon_0=121 +k=1 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  const wgs84 = "EPSG:4326"; // WGS84 坐标系

  const center = { lat: 25.052391331855265, lng: 121.59855174326229 };
  const wgs84Min = [121.59412155976037, 25.048075142191188];
  const wgs84Max = [121.60305597786436, 25.056169036644455];
  const tw97Max = proj4(wgs84, tw97, wgs84Max);
  const tw97Min = proj4(wgs84, tw97, wgs84Min);

  const onLoad = async () => {
    try {
      const res = await api.getParkInfo(tw97Max, tw97Min); // 直接在 onLoad 中呼叫 getParkInfo
      console.log(res); // 使用回傳的資料
      const result = res.map((element: Place) => {
        const wgs = proj4(tw97, wgs84, [parseFloat(element.lng as string), parseFloat(element.lat as string)]);
        return { ...element, lng: wgs[0], lat: wgs[1] };
      });

      const resAvailable = await api.getParkAvailable(result);
      console.log(resAvailable);
      const all = result.map((item: Place) => {
        const matchedRes = resAvailable.find((res: PlaceAvailable) => item.placeId === res.id);
        return {
          ...item,
          availablecar: matchedRes?.availablecar,
          availablemotor: matchedRes?.availablemotor,
        };
      });
      console.log(all);

      console.log(result);

      setPlaces(all); // 更新 places 狀態
    } catch (error) {
      console.error("Error loading park info:", error);
    }
  };
  const handleMarkerClick = (place: Place) => {
    setSelectedMarker(place);
    console.log(place);
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <Banner>
        <VenueTitle>臺北流行音樂中心</VenueTitle>
        <VenueSubTitle>TAIPEI MUSIC CENTER</VenueSubTitle>
      </Banner>
      <Nav>
        <NavItem>
          <StyleLink to="/view">視角分享</StyleLink>
        </NavItem>
        <NavItem>
          <StyleLink to="/transportation-driving">交通資訊</StyleLink>
        </NavItem>
      </Nav>
      <Main>
        <BtnBox>
          <StyleLink to="/transportation-public">大眾運輸</StyleLink>
          <StyleLink to="/transportation-driving">自行開車</StyleLink>
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
          <ParkSubTitle>停車資訊</ParkSubTitle>
          <MapContainer>
            <Map>
              <GoogleMap zoom={16} center={center} mapContainerStyle={containerStyle} onLoad={onLoad}>
                {places &&
                  places.map((place, index) => (
                    <MarkerF
                      key={index}
                      position={{ lat: place.lat as number, lng: place.lng as number }}
                      onClick={() => handleMarkerClick(place)}
                      icon={place.name === selectedMarker?.name ? selectPin : pin}
                      label={{
                        text: place.availablecar === undefined ? " " : place.availablecar === -9 ? "0" : place.availablecar.toString(),
                        color: "#000000",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                      // label={place.availablecar === undefined ? "" : place.availablecar === -9 ? "0" : place.availablecar.toString()}
                    />
                  ))}
              </GoogleMap>
            </Map>
            <Place>
              <PlaceTitle>詳細資訊</PlaceTitle>
              {selectedMarker && (
                <PlaceContent>
                  <PlaceName>{selectedMarker.name}</PlaceName>
                  <PlaceText>開放時間：{selectedMarker.openTime}</PlaceText>
                  <PlaceText>停車位：{selectedMarker.parkNum}</PlaceText>
                  <PlaceText>費用：{selectedMarker.fee}</PlaceText>
                  <a href={`https://www.google.com/maps/dir/?api=1&origin=臺北流行音樂中心&destination=${selectedMarker.lat},${selectedMarker.lng}`} target="blank">
                    在 Google 上查看
                  </a>
                </PlaceContent>
              )}
            </Place>
          </MapContainer>
        </Content>
      </Main>
    </Container>
  );
}

export default TransportationDriving;
