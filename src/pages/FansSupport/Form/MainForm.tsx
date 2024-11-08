import { TimePicker } from "@mui/x-date-pickers";
import { useContext } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Concerts } from "../../../types";
import { SupportFormContext } from "../../../utils/SupportFormContextProvider";

const Label = styled.p`
  color: #000;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  column-gap: 20px;
  row-gap: 15px;
  @media (max-width: 768px) {
    grid-template-columns: auto 1fr;
  }
`;
const Input = styled.input`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const QualifyInput = styled(Input)`
  grid-column: span 3;
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;
const CustomTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    padding: "0px",
    fontSize: "14px",
    height: "30px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d2d2d2",
  },

  "& .MuiIconButton-root": {
    marginRight: "3px",
  },
  "& .css-lc42l8-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0px 8px",
  },
});
const MoreContent = styled.textarea`
  border: 1px solid #d2d2d2;
  height: 120px;
  resize: none;
  border-radius: 5px;
  padding: 5px;
  flex-grow: 1;
  grid-column: span 4;
  @media (max-width: 768px) {
    grid-column: span 2;
    height: 80px;
  }
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
type Props = {
  concert: Concerts;
};
function MainForm({ concert }: Props) {
  const { register, control } = useContext(SupportFormContext);
  const day = concert?.date?.map((item) => {
    if (item) {
      const dayOnly = item.split(" ")[0] + " " + item.split(" ")[1];
      return dayOnly;
    }
  });
  return (
    <InputContainer>
      <Label>應援物品</Label>
      <QualifyInput type="text" {...register("item", { required: true })} />
      <Label>日期</Label>
      <Select {...register("day", { required: true })}>
        <option value="">請選擇日期</option>
        {concert?.date && day.map((item) => <option value={item}>{item}</option>)}
      </Select>
      <Label>時間</Label>
      <Controller name="time" control={control} render={({ field }) => <CustomTimePicker value={field.value} onChange={(newValue) => field.onChange(newValue)} />} />
      <Label>狀態</Label>
      <Select {...register("status", { required: true })}>
        <option value="0">未發放</option>
        <option value="1">發放中</option>
        <option value="2">發放完畢</option>
      </Select>
      <Label>地點</Label>
      <Input type="text" {...register("place", { required: true })} />
      <Label>領取資格</Label>
      <QualifyInput type="text" {...register("qualify", { required: true })} />
      <MoreContent {...register("more", { required: true })} placeholder="分享更多應援物資訊..."></MoreContent>
    </InputContainer>
  );
}

export default MainForm;
