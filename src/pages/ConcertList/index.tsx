import { DocumentData } from "firebase/firestore";
import { useEffect, useReducer, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { Concerts } from "../../types";
import api from "../../utils/api";
import { QueryDocumentSnapshot } from "../../utils/firebase";
import Filter from "./Filter";
import ListItem from "./ListItem";
import Search from "./Search";

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
  @media (max-width: 768px) {
    display: block;
  }
`;
const Title = styled.h3`
  font-size: 1.96rem;
  font-weight: 700;
  @media (max-width: 768px) {
    display: inline-block;
    margin-bottom: 20px;
  }
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
const Hint = styled.p`
  color: #ffffff;
  line-height: 2;
  background: #ff602c;
  text-align: center;
  width: 25%;
  margin: 0 auto 30px;
`;

export type State ={
  concertData: Concerts[];
  searchData: Concerts[];
  weekData: Concerts[];
  searchHint: boolean;
  isLoaded: boolean;
}
export type Action =
  | { type: "setConcertData"; payload: { concertData: Concerts[] } }
  | { type: "setSearchData"; payload: { searchData: Concerts[] } }
  | { type: "toggleSearchHint"; payload: { searchHint: boolean } }
  | { type: "toggleIsLoaded"; payload: { isLoaded: boolean } }
  | { type: "setFilterData"; payload: { searchData: Concerts[]; weekData: Concerts[] } };

const initial: State = {
  concertData: [],
  searchData: [],
  weekData: [],
  searchHint: false,
  isLoaded: false,
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setConcertData":
      return { ...state, concertData: action.payload.concertData };
    case "setSearchData":
      return { ...state, searchData: action.payload.searchData };
    case "toggleSearchHint":
      return { ...state, searchHint: action.payload.searchHint };
    case "toggleIsLoaded":
      return { ...state, isLoaded: action.payload.isLoaded };
    case "setFilterData":
      return { ...state, searchData: action.payload.searchData, weekData: action.payload.weekData };
    default:
      return state;
  }
};
function ConcertList() {
  const [state, dispatch] = useReducer(reducer, initial);
  const [startAt, setStartAt] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [nextLoad, setNextLoad] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "toggleIsLoaded", payload: { isLoaded: true } });
      document.body.style.overflowY = "auto";
    }, 2000);
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
      if (data.data.length === 0) {
        setNextLoad(false);
        return;
      }
      dispatch({ type: "setConcertData", payload: { concertData: [...state.concertData, ...data.data] } });
      setNextLoad(false);
      setStartAt(data.lastVisibleDoc);
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
        setNextLoad(true);
      }
    }
  };

  return (
    <Container ref={scrollRef}>
      <Header>
        <Title>演唱會資訊</Title>
        <Filter state={state} dispatch={dispatch} />
        <Search state={state} dispatch={dispatch} />
      </Header>
      {state.searchHint && <Hint>查無該關鍵字活動</Hint>}
      <AllList>
        {state.searchData.length !== 0
          ? state.searchData.map((concert, index) => <ListItem key={`search-${concert.id}`} concert={concert} index={index} state={state} />)
          : state.weekData.length !== 0
            ? state.weekData.map((concert, index) => <ListItem key={`eek-${concert.id}`} concert={concert} index={index} state={state} />)
            : state.concertData && state.concertData.map((concert, index) => <ListItem key={concert.id} concert={concert} index={index} state={state} />)}
      </AllList>
    </Container>
  );
}

export default ConcertList;
