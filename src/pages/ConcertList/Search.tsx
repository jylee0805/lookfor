import Fuse from "fuse.js";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import { Action, State } from ".";

const StyleSearch = styled(IoSearch)`
  font-size: 1.2rem;
  margin-right: 4px;
  @media (max-width: 575px) {
  }
`;

const Container = styled.div`
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
  @media (max-width: 768px) {
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
const options = {
  keys: ["concertName", "place"],
  threshold: 0.8,
  includeScore: false,
};

type Props = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

function Search({ state, dispatch }: Props) {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = () => {
    const fuse = new Fuse(state.concertData, options);
    const result = fuse.search(searchValue);

    const search = result.map((item) => {
      return item.item;
    });
    if (search.length === 0) {
      dispatch({ type: "toggleSearchHint", payload: { searchHint: true } });
    } else {
      dispatch({ type: "toggleSearchHint", payload: { searchHint: false } });
    }
    dispatch({ type: "setSearchData", payload: { searchData: search.sort() } });
  };
  return (
    <Container>
      <SearchInput type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="搜尋演唱會、場地" />
      <SearchBtn onClick={() => handleSearch()}>
        <StyleSearch />
      </SearchBtn>
    </Container>
  );
}

export default Search;
