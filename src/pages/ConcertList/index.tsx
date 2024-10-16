import styled from "styled-components";
import api from "../../utils/api";
import { useEffect, useRef, useReducer } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryDocumentSnapshot } from "../../utils/firebase";
import { DocumentData } from "firebase/firestore";
import { Concerts } from "../../types";
import ListItem from "./ListItem";
import Search from "./Search";
import Filter from "./Filter";

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

export interface State {
  concertData: Concerts[];
  searchData: Concerts[];
  weekData: Concerts[];
  searchValue: string;
  searchHint: boolean;
  startAt: QueryDocumentSnapshot<DocumentData> | null;
  isLoaded: boolean;
  nextLoad: boolean;
}
export type Action =
  | { type: "setConcertData"; payload: { concertData: Concerts[]; startAt: QueryDocumentSnapshot<DocumentData> | null; nextLoad: boolean } }
  | { type: "setSearchData"; payload: { searchData: Concerts[] } }
  | { type: "setSearchValue"; payload: { searchValue: string } }
  | { type: "toggleSearchHint"; payload: { searchHint: boolean } }
  | { type: "toggleIsLoaded"; payload: { isLoaded: boolean } }
  | { type: "toggleNextLoad"; payload: { nextLoad: boolean } }
  | { type: "setFilterData"; payload: { searchData: Concerts[]; weekData: Concerts[] } };

const initial: State = {
  concertData: [],
  searchData: [],
  weekData: [],
  searchValue: "",
  searchHint: false,
  startAt: null,
  isLoaded: false,
  nextLoad: false,
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setConcertData":
      return { ...state, concertData: action.payload.concertData, startAt: action.payload.startAt, nextLoad: action.payload.nextLoad };
    case "setSearchData":
      return { ...state, searchData: action.payload.searchData };
    case "setSearchValue":
      return { ...state, searchValue: action.payload.searchValue };
    case "toggleSearchHint":
      return { ...state, searchHint: action.payload.searchHint };
    case "toggleIsLoaded":
      return { ...state, isLoaded: action.payload.isLoaded };
    case "toggleNextLoad":
      return { ...state, nextLoad: action.payload.nextLoad };
    case "setFilterData":
      return { ...state, searchData: action.payload.searchData, weekData: action.payload.weekData };
    default:
      return state;
  }
};
function ConcertList() {
  const [state, dispatch] = useReducer(reducer, initial);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "toggleIsLoaded", payload: { isLoaded: true } });
      document.body.style.overflowY = "auto";
    }, 2000);
    window.addEventListener("scroll", handleScroll);
    dispatch({ type: "toggleNextLoad", payload: { nextLoad: true } });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const getConcert = async () => {
      const data = await api.getNextConcerts(state.startAt);
      if (data.data.length === 0) {
        dispatch({ type: "toggleNextLoad", payload: { nextLoad: false } });
        return;
      }
      dispatch({ type: "setConcertData", payload: { concertData: [...state.concertData, ...data.data], startAt: data.lastVisibleDoc, nextLoad: false } });
    };
    if (state.nextLoad) {
      getConcert();
    }
  }, [state.nextLoad]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = scrollRef.current?.offsetHeight;

    if (documentHeight) {
      if (window.scrollY + windowHeight - 150 >= documentHeight) {
        dispatch({ type: "toggleNextLoad", payload: { nextLoad: true } });
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
          ? state.searchData.map((concert, index) => <ListItem concert={concert} index={index} state={state} />)
          : state.weekData.length !== 0
            ? state.weekData.map((concert, index) => <ListItem concert={concert} index={index} state={state} />)
            : state.concertData && state.concertData.map((concert, index) => <ListItem concert={concert} index={index} state={state} />)}
      </AllList>
    </Container>
  );
}

export default ConcertList;
