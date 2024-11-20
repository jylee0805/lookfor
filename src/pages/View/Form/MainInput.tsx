import { useContext } from "react";
import styled from "styled-components";
import ViewSelect from "../../../components/ViewSelect";
import { ViewContext } from "../../../utils/ViewContextProvider";

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 15px;
  z-index: 20;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0px;
  }
`;
const Label = styled.p`
  margin: 0 15px 0 5px;
`;
const FormRow = styled.div`
  display: flex;
  align-items: center;
  z-index: 20;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    margin-left: 5px;
  }
  @media (max-width: 575px) {
    display: grid;
    grid-template-columns: 1fr auto;
    row-gap: 10px;
    column-gap: 5px;
    margin-top: 10px;
  }
`;

const Input = styled.input`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    margin-left: 5px;
  }
`;
const Content = styled.textarea`
  grid-column: span 2;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
  height: 100px;
  resize: none;
  @media (max-width: 768px) {
    grid-column: span 1;
    margin-left: 5px;
  }
`;

const seatOptions = ["VIPA", "VIPB", "VIPC", "2A", "2B", "2C", "2D", "2E", "2F", "2G", "3A", "3B", "3C", "3D", "3E", "3F", "3G"];

interface Seats {
  sectionName: string;
  row: number[];
}
interface Props {
  sectionData: Seats[];
}
function MainInput({ sectionData }: Props) {
  const { register, watch } = useContext(ViewContext);

  const sectionValue = watch("section");
  const rowValue = parseInt(watch("row"));

  const filteredSeats = sectionData.filter((item) => item.sectionName === sectionValue);
  const uniqueRows = filteredSeats.length > 0 && Array.isArray(filteredSeats[0].row) ? filteredSeats[0].row : [];
  const seats = uniqueRows[rowValue - 1];
  return (
    <FormContainer>
      <Label>位置</Label>
      <FormRow>
        <ViewSelect name={"section"} hint={"區域"} label={"區"} options={seatOptions} />

        <ViewSelect name={"row"} hint={"排數"} label={"排"} options={uniqueRows.map((_, index) => index + 1)} />

        <ViewSelect name={"seat"} hint={"座位"} label={"號"} options={Array.from({ length: seats }).map((_, index) => index + 1)} />
      </FormRow>

      <Label>觀看場次</Label>
      <Input type="text" defaultValue="" {...register("concert", { required: true })} placeholder="2024 SUPER JUNIOR <SUPER SHOW SPIN-OFF : Halftime>" />

      <Label>備註</Label>
      <Input type="text" defaultValue="" {...register("note")} placeholder="會被欄杆擋住、冷氣很冷..." />

      <Content defaultValue="" {...register("content")} placeholder="演唱會心得或是視角感受分享..."></Content>
    </FormContainer>
  );
}

export default MainInput;
