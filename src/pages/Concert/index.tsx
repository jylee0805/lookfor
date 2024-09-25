import styled from "styled-components";
import { useLocation } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import FansSupport from "./FanSupport";

const Container = styled.div`
  padding: 60px 120px;
`;
const ConcertName = styled.h3`
  font-size: 40px;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
`;
const BtnBox = styled.div`
  border-radius: 50px;
  box-shadow: 0 4px 4px #00000025;
  padding: 6px 30px;
  width: 360px;
  text-align: center;
  margin: 0 auto 30px;
`;
const PageBtn = styled.button`
  background: none;
  border: none;
  display: inline-block;
  padding: 5px 25px;
`;

const Poster = styled.img``;
const PosterBox = styled.div`
  width: 768px;
  margin: 0 auto 60px;
  text-align: center;
`;
const SubTitle = styled.p`
  font-size: 24px;
  letter-spacing: 10px;
`;
const Content = styled.div<{ pageChange: string }>`
  display: ${(props) => (props.pageChange === "concert" ? "grid" : "none")};
  grid-template-columns: auto 1fr;
  row-gap: 30px;
  column-gap: 50px;
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 1.5;
`;
const List = styled.ul`
  font-size: 24px;
  line-height: 2;
`;

const Title = styled.h4`
  font-size: 32px;
  letter-spacing: 10px;
  font-weight: 700;
  grid-column: span 2;
`;

const WebLink = styled.a`
  font-size: 24px;
`;

export interface Detail {
  images: string;
  ticketPrice: string;
  ticketSaleTime: string[];
  ticketSaleWebsite: string;
}
function Concert() {
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const location = useLocation();
  const { concert } = location.state || {};
  const [detailData, setDetailData] = useState<Detail | null>(null);
  const [changePage, setChangePage] = useState<string>("concert");
  console.log(concert);
  useEffect(() => {
    const getDetail = async (concertId: string) => {
      const detail = await api.getConcertDetail(concertId);
      setDetailData(detail);
    };
    getDetail(concertId);
  }, []);

  return (
    <Container>
      <ConcertName>{concert.concertName}</ConcertName>
      <BtnBox>
        <PageBtn onClick={() => setChangePage("concert")}>演唱會資訊</PageBtn>
        <PageBtn onClick={() => setChangePage("fanSupport")}>應援物發放資訊</PageBtn>
      </BtnBox>
      <PosterBox>{detailData?.images && <Poster src={detailData.images} />}</PosterBox>

      <Content pageChange={changePage}>
        <Title>演出資訊</Title>
        <SubTitle>演出日期</SubTitle>
        <List>{concert.date && concert.date.map((item: string) => <li>{item}</li>)}</List>
        <SubTitle>演出地點</SubTitle>
        <Text>{concert.place}</Text>

        <Title>售票資訊</Title>
        <SubTitle>售票時間</SubTitle>
        <List>{detailData?.ticketSaleTime && detailData.ticketSaleTime.map((item) => <li>{item}</li>)}</List>
        <SubTitle>票價</SubTitle>
        <Text>{detailData?.ticketPrice}</Text>
        <SubTitle>售票網頁</SubTitle>
        <WebLink>{detailData?.ticketSaleWebsite}</WebLink>

        {/* <SubTitle>注意事項</SubTitle>
        <List>
          <li>
            ※一人一票，憑票入場，孩童亦需購票。因考量人身安全及整體音量恐對孩童造成影響及其身高受限而影響視線，故孕婦及身高未滿110公分或7歲以下之孩童不建議購買搖滾站區，主辦方將有權謝絕入場，購票前請自行斟酌。
          </li>
          <li>※活動現場禁止使用任何器材拍照、攝影、直播、錄音，違者須依照工作人員指示離場。</li>
          <li>※請務必於演出日前至主辦單位官方網站及社群頁面確認入場規範、粉絲福利入場流程等相關資訊，以免損害自身權益。如未能於公佈的進場/福利整隊時間內報到，將視為放棄排隊序號或福利權利。</li>
          <li>※演出5天前始開放取票。</li>
          <li>※活動當天入場時需配合嚴格安檢，活動相關內容及詳細辦法請關注活動主辦單位 APPLEWOOD及APPLEWOOD TAIWAN 官方臉書及拓元售票網頁。 以上活動內容，主辦單位保留異動之權力</li>
        </List> */}
      </Content>
      <FansSupport changePage={changePage} />
    </Container>
  );
}

export default Concert;
