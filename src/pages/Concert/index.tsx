import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { Concerts } from "../ConcertList";

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
  }
`;
const ConcertName = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 992px) {
    font-size: 1.96rem;
  }
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
const BtnBox = styled.div`
  border-radius: 50px;
  box-shadow: 0 4px 4px #00000025;
  padding: 6px 30px;
  width: 360px;
  text-align: center;
  margin: 0 auto 30px;

  border: 2px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
  @media (max-width: 575px) {
    width: 320px;
    padding: 6px 10px;
  }
`;
const PageBtn = styled(Link)`
  background: none;
  border: none;
  display: inline-block;
  padding: 5px 0px;
  width: 50%;
  font-weight: 700;
  color: #fff;
  &:hover {
    background: linear-gradient(239deg, #ffe53b 0%, #ff5001 74%);
    background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Poster = styled.img``;
const PosterBox = styled.div`
  width: 768px;
  margin: 0 auto 40px;
  text-align: center;
  grid-column: span 2;
  @media (max-width: 992px) {
    width: 75%;
    margin: 0 auto 20px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  row-gap: 30px;
  column-gap: 50px;
  @media (max-width: 992px) {
    font-size: 1.96rem;
  }
  @media (max-width: 768px) {
    row-gap: 25px;
    column-gap: 15px;
  }
  @media (max-width: 575px) {
    grid-template-columns: 100px auto;
    row-gap: 20px;
    column-gap: 0px;
  }
`;
const Title = styled.h4`
  font-size: 1.96rem;
  letter-spacing: 10px;
  font-weight: 700;
  grid-column: span 2;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.p`
  font-size: 1.4rem;
  letter-spacing: 10px;
  display: flex;
  margin: auto;
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 5px;
  }
`;
const Text = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const List = styled.ul`
  font-size: 1.4rem;
  line-height: 2;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const WebLink = styled.a`
  font-size: 1.4rem;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 1rem;

    word-wrap: break-word; /* 自動換行 */
    word-break: break-all; /* 確保長單詞換行 */
  }
`;

export interface Detail {
  ticketPrice: string;
  ticketSaleTime: string[];
  ticketSaleWebsite: string;
  images: string;
}
function Concert() {
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const [concert, setConcert] = useState<Concerts | null>(null);
  const [detailData, setDetailData] = useState<Detail | null>(null);
  console.log(concertId);
  useEffect(() => {
    const getDetail = async (concertId: string) => {
      const concert = await api.getConcert(concertId);
      const detail = await api.getConcertDetail(concertId);

      setDetailData(detail);
      setConcert(concert as Concerts);
      console.log(detail);
      console.log(concert);
    };
    getDetail(concertId);
  }, []);

  return (
    <Container>
      <ConcertName>{concert?.concertName}</ConcertName>
      <BtnBox>
        <PageBtn to={`/concert?concert=${concertId}`}>演唱會資訊</PageBtn>
        <PageBtn to={`/fanssupport?concert=${concertId}`}>應援物發放資訊</PageBtn>
      </BtnBox>

      <Content>
        <PosterBox>{detailData?.images && <Poster src={detailData.images} />}</PosterBox>
        <Title>演出資訊</Title>
        <SubTitle>演出日期</SubTitle>
        <List>{concert?.date && concert?.date.map((item: string) => <li>{item}</li>)}</List>
        <SubTitle>演出地點</SubTitle>
        <Text>{concert?.place}</Text>

        <Title>售票資訊</Title>
        <SubTitle>售票時間</SubTitle>
        <List>{detailData?.ticketSaleTime && detailData.ticketSaleTime.map((item) => <li>{item}</li>)}</List>
        <SubTitle>票價</SubTitle>
        <Text>{detailData?.ticketPrice}</Text>
        <SubTitle>售票網頁</SubTitle>
        <WebLink>{detailData?.ticketSaleWebsite}</WebLink>
      </Content>
    </Container>
  );
}

export default Concert;
