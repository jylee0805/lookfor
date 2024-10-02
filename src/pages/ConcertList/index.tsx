import styled from "styled-components";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import concertImg from "../../images/concert.jpg";

const Container = styled.div`
  width: 85%;
  margin: 60px auto;
  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const Title = styled.h3`
  font-size: 1.96rem;
  margin-bottom: 40px;
  font-weight: 700;
`;
const AllList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media (max-width: 992px) {
    gap: 15px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ListItem = styled.li`
  box-shadow: 3px 5px 6px #5d5d5d50;
  border-radius: 20px;
  column-gap: 20px;
  margin-bottom: 25px;
  background: #ffffff;
  @media (max-width: 992px) {
    margin-bottom: 10px;
  }
`;

const StyleLink = styled(Link)`
  display: block;
`;

const Detail = styled.div`
  margin: 15px 30px 20px;
`;
const DetailItem = styled.p`
  color: #545454;
  line-height: 2;
`;
const DetailName = styled(DetailItem)`
  font-size: 1.2rem;
  font-weight: 700;
  grid-column: span 2;
  @media (max-width: 992px) {
    font-size: 1.1rem;
  }
`;
const DetailPlace = styled(DetailItem)`
  grid-column: span 2;
`;
const ImageBox = styled.div`
  height: 240px;
`;
const Image = styled.img`
  object-fit: cover;
  object-position: 0% 10%;
  width: 100%;
  border-radius: 20px 20px 0 0;
`;
export interface Concerts {
  concertName: string;
  date: string[];
  images: string;
  place: string;
  concertId: string;
  firstDay?: string;
  id: string;
  poster?: string;
}

function ConcertList() {
  const [concertData, setConcertData] = useState<Concerts[]>([]);

  const stringToTime = (data: Concerts[]) => {
    const all = data.map((item: Concerts) => {
      const dateString = item.date[0];
      const date = new Date(dateString);

      const options = { month: "short" as const, day: "2-digit" as const };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return { ...item, firstDay: formattedDate };
    });
    console.log(all);

    setConcertData(all);
  };
  useEffect(() => {
    const today = dayjs().format("YYYY/MM/DD");

    const getConcert = async () => {
      const data = await api.getConcerts();
      const result = data.filter((item) => item.date[0] > today);
      console.log(result);

      setConcertData(result);
      stringToTime(result);
    };
    getConcert();
  }, []);

  return (
    <Container>
      <Title>演唱會資訊</Title>

      <AllList>
        {concertData &&
          concertData.map((concert, index) => (
            <ListItem key={index}>
              <StyleLink to={`/concert?concert=${concert.id}`}>
                <ImageBox>
                  <Image src={concert.poster ? concert.poster : concertImg} />
                </ImageBox>
                <Detail>
                  <DetailName>{concert.concertName}</DetailName>
                  {concert.date && Array.from({ length: concert.date.length }).map((_, index) => <DetailItem key={index}>{concert.date[index]}</DetailItem>)}

                  <DetailPlace>{concert.place}</DetailPlace>
                </Detail>
              </StyleLink>
            </ListItem>
          ))}
      </AllList>
    </Container>
  );
}

export default ConcertList;
