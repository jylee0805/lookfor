import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { State } from ".";
import concertImg from "../../assets/concert.jpg";
import { Concerts } from "../../types";

const skeletonLoading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

const Item = styled.li`
  box-shadow: 3px 5px 6px #5d5d5d50;
  min-height: 441px;
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
const ImageBox = styled.div`
  height: 240px;
  display: block;
  background-image: linear-gradient(135deg, #dbdbdb 13%, #ededed 60%, #dbdbdb 90%);
  background-size: 600% 100%;
  background-position: 100% 50%;
  border-radius: 20px;
  animation: ${skeletonLoading} 1.2s ease infinite;
`;
const Image = styled.img`
  object-fit: cover;
  object-position: 0% 10%;
  width: 100%;
  border-radius: 20px 20px 0 0;
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
`;
const DetailPlace = styled(DetailItem)`
  grid-column: span 2;
`;

interface Props {
  concert: Concerts;
  index: number;
  state: State;
}

function ListItem({ state, concert, index }: Props) {
  return (
    <Item key={index}>
      <StyleLink to={`/concert?concert=${concert.id}`}>
        {state.isLoaded ? (
          <ImageBox>
            <Image src={concert.poster ? concert.poster : concertImg} />
          </ImageBox>
        ) : (
          <Skeleton height="240px" line-height="inherit" containerClassName="avatar-skeleton" baseColor="#c3c3c3" borderRadius="20px 20px 0 0 " />
        )}
        <Detail>
          <DetailName>{concert.concertName}</DetailName>
          {concert.date && Array.from({ length: concert.date.length }).map((_, index) => <DetailItem key={index}>{concert.date[index]}</DetailItem>)}

          <DetailPlace>{concert.place}</DetailPlace>
        </Detail>
      </StyleLink>
    </Item>
  );
}

export default ListItem;
