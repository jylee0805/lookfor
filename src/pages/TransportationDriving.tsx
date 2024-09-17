import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import parkingData from "../utils/parking.json";

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

interface Place {
  lat: number;
  lng: number;
  name: string;
  parkNum: string;
  fee: string;
  openTime: string;
  address?: string;
  placeId?: string;
}
function TransportationDriving() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA3EzkV4hLZiO3UWwyXgtWQxZHRc85JmHs",
    libraries: ["places"],
  });
  const center = { lat: 25.05312208941785, lng: 121.60058876881236 };
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Place | null>(null);

  console.log(selectedMarker);

  const onLoad = () => {
    console.log(typeof parkingData);
    setPlaces(parkingData);
  };

  const handleMarkerClick = (place: Place) => {
    setSelectedMarker(place);
    /*if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        placeId: place.placeId,
        fields: ["name", "formatted_address"], // 要求地址字段
      };

      service.getDetails(request, (result, status) => {
        if (result && result.formatted_address && status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSelectedMarker({
            ...place,
            address: result.formatted_address, // 更新地址
          });
          console.log(result?.formatted_address);
        } else {
          console.error("未能獲取地標詳細信息:", status);
        }
      });
    }*/
  };
  if (!isLoaded) return <div>Loading...</div>;
  /*useEffect(() => {
    async function getCar() {
      await GetAuthorizationHeader();
      GetApiResponse();
    }
    getCar();
  }, []);
  //console.log(places);

  

  async function GetAuthorizationHeader() {
    const parameter = {
      grant_type: "client_credentials",
      client_id: "smexoshinee17-cbb9d762-6467-4908",
      client_secret: "7f4b5b3d-73c6-4d3f-8a3c-2479d662d182",
    };

    const auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

    const urlEncodedData = new URLSearchParams(parameter).toString();

    fetch(auth_url, {
      method: "POST",
      headers: {
        "Accept-Encoding": "br, gzip",
        "Content-Type": "application/x-www-form-urlencoded", // 根據伺服器要求設置 Content-Type
      },
      body: urlEncodedData,
      //credentials: "include", // 根據需求設定 credentials
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(`Server responded with error: ${JSON.stringify(err)}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setToken(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        console.log("Error details:", error.message);
      });
  }

  function GetApiResponse() {
    //"https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/LiveTrainDelay?$top=30&$format=JSON"
    fetch("https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taipei?$format=JSON", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token.access_token}`,
        "Accept-Encoding": "br,gzip",
        "Content-Type": "application/x-www-form-urlencoded", // 根據伺服器要求設置 Content-Type
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(`Server responded with error: ${JSON.stringify(err)}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        console.log("Error details:", error.message);
      });
  }
*/
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
                {places && places.map((place, index) => <MarkerF key={index} position={{ lat: place.lat, lng: place.lng }} onClick={() => handleMarkerClick(place)} />)}
              </GoogleMap>
            </Map>
            <Place>
              {selectedMarker && (
                <PlaceContent>
                  <PlaceTitle>詳細資訊</PlaceTitle>
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
