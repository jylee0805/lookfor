import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Detail } from "../types";
import api from "../utils/api";
import { ConcertContext } from "../utils/ConcertContextProvider";

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const ConcertName = styled.h3`
  font-size: 2rem;
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
  margin: 0 auto 50px;
  border: 2px solid #fff;

  @media (max-width: 575px) {
    width: 100%;
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
    color: rgb(255, 98, 19);
  }
`;
const Content = styled.div`
  display: flex;
  flex: auto;
  column-gap: 10%;
  justify-content: center;
  @media (max-width: 992px) {
    align-items: center;
    flex-direction: column;
    row-gap: 25px;
    column-gap: 10px;
  }
`;
const PosterBox = styled.div`
  width: 35%;
  text-align: center;
  margin-bottom: 40px;
  margin-left: 10%;
  @media (max-width: 992px) {
    width: 50%;
    margin-bottom: 0px;
    margin-left: 0;
  }
  @media (max-width: 575px) {
    width: 80%;
  }
`;
const Poster = styled.img`
  border: 5px solid #fff;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  width: 50%;
  @media (max-width: 992px) {
    width: 80%;
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;
const Info = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.h4`
  font-size: 1.7rem;
  letter-spacing: 10px;
  font-weight: 700;
  grid-column: span 2;
  line-height: 2;
  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const InfoItem = styled.div`
  display: flex;
  column-gap: 10px;
  margin-bottom: 5px;
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  width: 96px;
  flex-shrink: 0;
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 70px;
  }
`;

const List = styled.ul`
  font-size: 1.1rem;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
`;
const WebLink = styled.a`
  font-size: 1.1rem;
  line-height: 1.5;
  display: block;
  word-break: break-word;
  white-space: normal;
  word-wrap: break-word;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function Concert() {
  const navigate = useNavigate();
  const concertContext = useContext(ConcertContext);
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const [detailData, setDetailData] = useState<Detail | null>(null);

  useEffect(() => {
    const getDetail = async (concertId: string) => {
      const detail = await api.getConcertDetail(concertId);
      if (detail === null) {
        navigate("/");
      }
      setDetailData(detail);
    };
    getDetail(concertId);
    concertContext?.setConcertId(concertId);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <Container>
      <ConcertName>{concertContext?.concertData.concertName}</ConcertName>
      <BtnBox>
        <PageBtn to={`/concert?concert=${concertId}`}>演唱會資訊</PageBtn>
        <PageBtn to={`/fanssupport?concert=${concertId}`}>應援物發放資訊</PageBtn>
      </BtnBox>

      <Content>
        <PosterBox>{detailData?.images && <Poster src={detailData.images} />}</PosterBox>

        <InfoContainer>
          <Info>
            <Title>演出資訊</Title>
            <InfoItem>
              <SubTitle>演出日期｜</SubTitle>
              <List>{concertContext?.concertData.date && concertContext?.concertData.date.map((item: string) => <li>{item}</li>)}</List>
            </InfoItem>
            <InfoItem>
              <SubTitle>演出地點｜</SubTitle>
              <Text>{concertContext?.concertData.place}</Text>
            </InfoItem>
          </Info>
          <Info>
            <Title>售票資訊</Title>
            <InfoItem>
              <SubTitle>售票時間｜</SubTitle>
              <List>{detailData?.ticketSaleTime && detailData.ticketSaleTime.map((item) => <li>{item}</li>)}</List>
            </InfoItem>
            <InfoItem>
              <SubTitle>票{"　　"}價｜</SubTitle>
              <Text>{detailData?.ticketPrice}</Text>
            </InfoItem>
            <InfoItem>
              <SubTitle>售票網頁｜</SubTitle>
              <WebLink href={detailData?.ticketSaleWebsite} target="blank">
                {detailData?.ticketSaleWebsite}
              </WebLink>
            </InfoItem>
          </Info>
        </InfoContainer>
      </Content>
    </Container>
  );
}

export default Concert;
