import { useContext } from "react";
import styled from "styled-components";
import api from "../../../utils/api";
import { ViewContext } from "../../../utils/ViewContextProvider";
import SectionSecond from "./SectionSecond";
import SectionThird from "./SectionThird";
import SectionVIP from "./SectionVIP";

const SelectSection = styled.div`
  width: 65%;
  max-width: 780px;
  padding: 0 30px;
  padding-right: 0;
  font-weight: 700;
  @media (max-width: 992px) {
    padding: 0 30px;
    width: 768px;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    width: 575px;
  }
  @media (max-width: 575px) {
    width: 360px;
    padding: 0;
    font-size: 0.8rem;
  }
`;

function Sections() {
  const { state, dispatch, sectionRef } = useContext(ViewContext);
  const handlerSection = async (section: string) => {
    const rows = await api.getRows(section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];

    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    if (section === state.selectedSection) {
      dispatch({ type: "selectSection", payload: { rowSeats: [], selectedSection: "", isSelectRow: false } });
    } else {
      dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, selectedSection: section, isSelectRow: false } });
    }
  };

  return (
    <SelectSection
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.dataset.section !== undefined || target.dataset.section !== undefined) {
          handlerSection(target.dataset.section);
        }
      }}
    >
      <SectionVIP />
      <SectionSecond />
      <SectionThird />
    </SelectSection>
  );
}

export default Sections;
