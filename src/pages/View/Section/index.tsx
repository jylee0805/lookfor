import { memo } from "react";
import styled from "styled-components";
import { Seats } from "..";
import { ViewAction, ViewState } from "../../../types";
import api from "../../../utils/api";
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
interface Props {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
  sectionRef: React.RefObject<HTMLDivElement>;
  sectionData: Seats[];
}
function Sections({ state, dispatch, sectionRef, sectionData }: Props) {
  console.log(sectionData);

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
    dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, selectedSection: section, isSelectRow: false } });
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
      <SectionVIP state={state} sectionData={sectionData} />
      <SectionSecond state={state} sectionData={sectionData} />
      <SectionThird state={state} sectionData={sectionData} />
    </SelectSection>
  );
}

export default memo(Sections, (prevProps, nextProps) => {
  return prevProps.state.selectedSection === nextProps.state.selectedSection && prevProps.sectionData === nextProps.sectionData;
});
