import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 60px 60px;
`;

const Title = styled.h3`
  font-size: 36px;
  margin-bottom: 40px;
  font-weight: 700;
`;
const AllList = styled.ul``;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 5px #dbddae50;
  border-radius: 20px;
  padding: 15px 50px;
  column-gap: 20px;
  margin-bottom: 25px;
  background: #fff;
`;
const DateContainer = styled.div`
  margin-right: 30px;
  text-align: center;
`;
const Month = styled.p`
  font-size: 32px;
  margin-bottom: -15px;
  width: 50px;
`;
const Day = styled.p`
  font-size: 60px;
`;
const Line = styled.div`
  width: 1px;
  height: 100px;
  background: #000;
`;
const More = styled.button`
  display: block;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  border-radius: 50px;
  border: 1px solid #d2d2d2;
`;
const Detail = styled.div`
  flex-grow: 1;
`;
const DetailItem = styled.p`
  font-size: 20px;
  color: #545454;
  line-height: 2;
`;
export interface Concerts {
  concertName: string;
  date: string[];
  images: string;
  place: string;
  concertId: string;
  firstDay?: string;
  id: string;
}

function ConcertList() {
  const navigate = useNavigate();
  const [concertData, setConcertData] = useState<Concerts[]>([]);

  const stringToTime = (data: Concerts[]) => {
    const all = data.map((item: Concerts) => {
      const dateString = item.date[0];
      const date = new Date(dateString);

      const options = { month: "short" as const, day: "2-digit" as const };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return { ...item, firstDay: formattedDate };
    });
    setConcertData(all);
  };
  useEffect(() => {
    const getConcert = async () => {
      const data = await api.getConcerts();
      setConcertData(data);
      stringToTime(data);
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
              <DateContainer>
                <Month>{concert.firstDay === "Invalid Date" ? "" : concert.firstDay}</Month>
                <Day></Day>
              </DateContainer>
              <Line />
              <Detail>
                <DetailItem>{concert.concertName}</DetailItem>
                {concert.date && Array.from({ length: concert.date.length }).map((_, index) => <DetailItem key={index}>{concert.date[index]}</DetailItem>)}

                <DetailItem>{concert.place}</DetailItem>
              </Detail>
              <More onClick={() => navigate(`/concert?concert=${concert.id}`, { state: { concert } })}>更多內容</More>
            </ListItem>
          ))}
      </AllList>
    </Container>
  );
}

export default ConcertList;
