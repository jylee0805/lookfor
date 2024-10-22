import { useContext } from "react";
import styled from "styled-components";
import { FormInputs, ViewContext } from "../utils/ViewContextProvider";

const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const Label = styled.p`
  margin: 0 15px 0 5px;
`;

interface Props {
  label: string;
  options: string[] | number[];
  name: keyof FormInputs;
  hint: string;
}

function ViewSelect({ name, label, options, hint }: Props) {
  const { register } = useContext(ViewContext);
  return (
    <>
      <Select {...register(name, { required: true })}>
        <option value="">{`請選擇${hint}`}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Label>{label}</Label>
    </>
  );
}

export default ViewSelect;
