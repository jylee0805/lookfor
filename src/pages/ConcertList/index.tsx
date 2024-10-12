import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState, useRef } from "react";
import concertImg from "../../images/concert.jpg";
import { IoSearch } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Fuse from "fuse.js";
import { QueryDocumentSnapshot } from "../../utils/firebase";
import { DocumentData } from "firebase/firestore";

const skeletonLoading = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;
const StyleSearch = styled(IoSearch)`
  font-size: 1.2rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;
const Container = styled.div`
  margin: 60px auto;
  width: 85%;
  @media (max-width: 1280px) {
    width: 100%;
    padding: 0 60px;
  }
  @media (max-width: 992px) {
    padding: 0 40px;
  }
  @media (max-width: 575px) {
    padding: 0 30px;
    margin: 40px auto;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  justify-content: space-between;
  @media (max-width: 575px) {
    display: block;
  }
`;
const Title = styled.h3`
  font-size: 1.96rem;
  font-weight: 700;
  @media (max-width: 575px) {
    margin-bottom: 20px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SearchInput = styled.input`
  border-radius: 8px 0 0 8px;
  height: 36px;
  width: 180px;
  padding: 8px 12px;
  box-shadow: none;
  border: none;
  outline: none;
  @media (max-width: 575px) {
    flex-grow: 1;
  }
`;
const SearchBtn = styled.button`
  background: #ffffff;
  padding: 5px 12px;
  height: 36px;
  color: #000;
  border-radius: 0 8px 8px 0;
  border: none;
  box-shadow: none;
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
const Hint = styled.p`
  color: #ffffff;
  line-height: 2;
  background: #ff602c;
  text-align: center;
  width: 25%;
  margin: 0 auto 30px;
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

const options = {
  keys: ["concertName", "place"],
  threshold: 0.8,
  includeScore: false, // 是否包含匹配分數
};

function ConcertList() {
  const [concertData, setConcertData] = useState<Concerts[]>([]);
  const [searchData, setSearchData] = useState<Concerts[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchHint, setSearchHint] = useState<boolean>(false);
  const [startAt, setStartAt] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nextLoad, setNextLoad] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null); // 創建 ref

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflowY = "auto";
    }, 2000);
    document.body.style.overflow = "auto";
    window.addEventListener("scroll", handleScroll);
    setNextLoad(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getConcert = async () => {
      const data = await api.getNextConcerts(startAt);
      console.log(data);
      if (data.data.length === 0) {
        setNextLoad(false); // 停止加載
        return;
      }
      setConcertData((prev) => [...prev, ...data.data]);
      setStartAt(data.lastVisibleDoc);
      setNextLoad(false);
    };
    if (nextLoad) {
      getConcert();
    }
  }, [nextLoad]);
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = scrollRef.current?.offsetHeight;

    if (documentHeight) {
      if (window.scrollY + windowHeight - 150 >= documentHeight) {
        setNextLoad((prevNextLoad) => {
          if (!prevNextLoad) {
            return true;
          }
          return prevNextLoad;
        });
      }
    }
  };

  const handleSearch = () => {
    const fuse = new Fuse(concertData, options);
    const result = fuse.search(searchValue);
    console.log(result);
    const search = result.map((item) => {
      return item.item;
    });
    if (search.length === 0) {
      setSearchHint(true);
    } else {
      setSearchHint(false);
    }
    setSearchData(search);
  };

  return (
    <Container ref={scrollRef}>
      <Header>
        <Title>演唱會資訊</Title>
        <SearchContainer>
          <SearchInput type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="搜尋演唱會、場地" />
          <SearchBtn onClick={() => handleSearch()}>
            <StyleSearch />
          </SearchBtn>
        </SearchContainer>
      </Header>
      {searchHint && <Hint>查無該關鍵字活動</Hint>}
      <AllList>
        {searchData.length === 0
          ? concertData &&
            concertData.map((concert, index) => (
              <ListItem key={index}>
                <StyleLink to={`/concert?concert=${concert.id}`}>
                  {isLoaded ? (
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
              </ListItem>
            ))
          : searchData.map((concert, index) => (
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
