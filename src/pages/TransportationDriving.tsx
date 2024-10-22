import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import proj4 from "proj4";
import { useEffect, useState } from "react";
import styled from "styled-components";
import pin from "../assets/pin.png";
import selectPin from "../assets/selectPin.png";
import CustomMarkerLabel from "../components/CustomLabel";
import Loading from "../components/Loading";
import VenueHeader from "../components/VenueHeader";
import { PlaceAvailable, PlaceInfo } from "../types";
import api from "../utils/api";

const Container = styled.div`
  padding: 0 30px;
`;

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
`;
const Detail = styled.div`
  padding: 0px 0 20px;
  @media (max-width: 992px) {
    grid-template-columns: auto;
    padding: 0;
  }
`;
const Station = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;
const Away = styled.p`
  margin-bottom: 25px;
`;
const Line = styled.div`
  grid-column: span 2;
  width: 100%;
  height: 1px;
  background: #d2d2d2;
  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;
const ParkSubTitle = styled(SubTitle)`
  grid-column: span 2;
  margin: 0;
  justify-content: flex-start;
  @media (max-width: 992px) {
    grid-column: span 1;
  }
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
  @media (max-width: 992px) {
    grid-column: span 1;
    flex-direction: column;
    row-gap: 25px;
  }
  @media (max-width: 992px) {
    padding: 0;
  }
`;
const Map = styled.div`
  flex-grow: 1;
  height: 500px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Place = styled.div`
  width: 30%;
  @media (max-width: 992px) {
    width: 100%;
  }
`;
const PlaceContent = styled.div`
  width: 100%;
`;
const PlaceTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;
const PlaceName = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
`;
const PlaceText = styled.p`
  line-height: 1.8;
`;
const GoogleLink = styled.a`
  color: #fff;
  text-decoration: underline;
`;

function TransportationDriving() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    libraries: ["places"],
  });
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<PlaceInfo | null>(null);

  const tw97 = "+proj=tmerc +lat_0=0 +lon_0=121 +k=1 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  const wgs84 = "EPSG:4326";

  const center = { lat: 25.052391331855265, lng: 121.59855174326229 };
  const wgs84Min = [121.59412155976037, 25.048075142191188];
  const wgs84Max = [121.60305597786436, 25.056169036644455];
  const tw97Max = proj4(wgs84, tw97, wgs84Max);
  const tw97Min = proj4(wgs84, tw97, wgs84Min);
  useEffect(() => {
    document.body.style.overflowY = "auto";
  }, []);
  const onLoad = async () => {
    const res = await api.getParkInfo(tw97Max, tw97Min);
    const result = res.map((element: PlaceInfo) => {
      const wgs = proj4(tw97, wgs84, [parseFloat(element.lng as string), parseFloat(element.lat as string)]);
      return { ...element, lng: wgs[0], lat: wgs[1] };
    });

    const resAvailable = await api.getParkAvailable(result);
    const all = result.map((item: PlaceInfo) => {
      const matchedRes = resAvailable.find((res: PlaceAvailable) => item.placeId === res.id);
      return {
        ...item,
        availablecar: matchedRes?.availablecar,
        availablemotor: matchedRes?.availablemotor,
      };
    });

    setPlaces(all);
  };

  const handleMarkerClick = (place: PlaceInfo) => {
    setSelectedMarker(place);
  };
  if (!isLoaded) return <Loading />;

  return (
    <Container>
      <VenueHeader />
      <Main>
        <Content>
          <SubTitle>自行開車</SubTitle>
          <Detail>
            <Station>國道一號北上</Station>
            <Away>17-內湖出口（南港方向），下交流道 → 往南港方向 → 成功路二段 → 過成功橋 → 順行向陽路 → 左轉南港路二段 → 右轉東側道路 → 抵達臺北流行音樂中心</Away>
            <Station>國道三號北上</Station>
            <Away>14-南港出口下交流道 → 左轉橫科路 → 經力行橋 → 順行研究院路一段 101 巷 → 右轉研究院路一段 → 左轉忠孝東路 → 右轉向陽路 → 右轉南港路二段 → 右轉東側道路 → 抵達臺北流行音樂中心</Away>
            <Station>國道一號南下</Station>
            <Away>17-B 內湖出口下交流道 → 往南港方向 → 成功路二段 → 過成功橋 → 順行向陽路 → 左轉南港路二段 → 右轉東側道路 → 抵達臺北流行音樂中心</Away>
            <Station>國道三號南下</Station>
            <Away>12-新台五路出口下交流道 → 往南港方向 → 右轉新台五路一段（台五線） → 左轉大同路一段（台五線） → 順行南港路一段 → 順行南港路二段 → 左轉東側道路 → 抵達臺北流行音樂中心</Away>
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
                      icon={{
                        url: place.name === selectedMarker?.name ? selectPin : pin,
                        scaledSize: new window.google.maps.Size(65, 65),
                      }}
                    >
                      <CustomMarkerLabel
                        position={{ lat: place.lat as number, lng: place.lng as number }}
                        text={place.availablecar === undefined ? " " : place.availablecar === -9 ? "0" : place.availablecar.toString()}
                      />
                    </MarkerF>
                  ))}
              </GoogleMap>
            </Map>
            <Place>
              <PlaceTitle>詳細資訊</PlaceTitle>
              {selectedMarker && (
                <PlaceContent>
                  <PlaceName>{selectedMarker.name}</PlaceName>
                  {selectedMarker.availablecar && <PlaceName>目前剩餘車位：{selectedMarker.availablecar === -9 ? "0" : selectedMarker.availablecar}</PlaceName>}

                  <PlaceText>開放時間：{selectedMarker.openTime}</PlaceText>
                  <PlaceText>停車位：{selectedMarker.parkNum}</PlaceText>
                  <PlaceText>費用：{selectedMarker.fee}</PlaceText>
                  <GoogleLink href={`https://www.google.com/maps/dir/?api=1&origin=臺北流行音樂中心&destination=${selectedMarker.lat},${selectedMarker.lng}`} target="blank">
                    在 Google 上查看
                  </GoogleLink>
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
