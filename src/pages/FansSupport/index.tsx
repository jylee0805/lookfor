import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

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

const Content = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 30px;
  column-gap: 50px;
`;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;
const Content = styled.div``;

function FansSupport() {
  const queryParams = new URLSearchParams(window.location.search);
  const concertId = queryParams.get("concert") || "";
  const location = useLocation();
  const { concert } = location.state || {};

  const navigate = useNavigate();
  console.log(concert);

  return (
    <Container>
      <ConcertName>{concert.concertName}</ConcertName>
      <BtnBox>
        <PageBtn onClick={() => navigate(`/concert?concert=${concert.id}`, { state: { concert } })}>演唱會資訊</PageBtn>
        <PageBtn onClick={() => navigate(`/fanssupport?concert=${concert.id}`)}>應援物發放資訊</PageBtn>
      </BtnBox>

      <Content></Content>
    </Container>
  );
}

export default FansSupport;
