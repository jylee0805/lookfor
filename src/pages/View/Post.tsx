import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/api";
import useGoogleVisionAPI from "../../utils/useGoogleVisionAPI";
import { Action } from ".";

const PostContainer = styled.div<{ show: boolean }>`
  position: fixed;
  background: #ffffff;
  z-index: 5;
  padding: 20px 30px;
  display: ${(props) => (props.show ? "block" : "none")};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: 3px 3px 3px #6c6c6c;
`;
const FormContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
`;
const FormRow = styled.div`
  display: flex;
`;
const PostTitle = styled.h3``;
const Label = styled.p``;
const Input = styled.input``;
const Select = styled.select`
  flex-grow: 1;
`;
const Content = styled.textarea`
  grid-column: span 2;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;
const Submit = styled.button``;
const Cancel = styled.button`
  margin-left: auto;
`;
const SelectPhotoBtn = styled.label`
  text-align: center;
`;
const FileBtn = styled.input`
  visibility: hidden;
  width: 0;
`;
const ImagePreview = styled.img`
  width: 250px;
`;

interface Seats {
  sectionName: string;
  row: number[];
}

interface Props {
  state: {
    allSeats: Seats[];
    section: string;
    row: number;
    seat: number;
    isPostClick: boolean;
    selectPhoto: File | null;
    localPhotoUrl: string;
  };
  dispatch: React.Dispatch<Action>;
  sendImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormInputs {
  section: string;
  row: string;
  seat: string;
  concert: string;
  note: string;
  content: string;
  image: object;
}

function Post({ state, dispatch, sendImage }: Props) {
  const { labels, handleAnalyzeImage } = useGoogleVisionAPI();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    //formState: { errors },
  } = useForm<FormInputs>();
  const sectionValue = watch("section");
  const rowValue = parseInt(watch("row"));

  const filteredSeats = state.allSeats.filter((item) => item.sectionName === sectionValue);
  const uniqueRows = filteredSeats.length > 0 && Array.isArray(filteredSeats[0].row) ? filteredSeats[0].row : [];
  const seats = uniqueRows[rowValue - 1];

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    let url;
    if (state.selectPhoto) {
      console.log(state.selectPhoto);

      url = await api.uploadImage(state.selectPhoto);

      await handleAnalyzeImage(url);
      console.log(labels);

      dispatch({ type: "setUploadPhotoUrl", payload: { uploadPhotoUrl: url } });
      if (labels.includes("Person")) {
        alert("請確認圖片不包含人物");
        return;
      } else {
        await api.setViewPost(data, url);
        reset({
          section: "",
          row: "",
          seat: "",
          concert: "",
          note: "",
          content: "",
        });
      }
    }
  };
  const handlerCancel = () => {
    reset({
      section: "",
      row: "",
      seat: "",
      concert: "",
      note: "",
      content: "",
    });
    dispatch({ type: "togglePostClick" });
    document.body.style.overflow = "scroll";
  };

  return (
    <PostContainer show={state.isPostClick}>
      <PostTitle>發佈視角</PostTitle>
      <FormContainer>
        <Label>位置</Label>
        <FormRow>
          <Select {...register("section", { required: true })}>
            <option value="">Select section</option>
            <option value="2A">2A</option>
            <option value="2B">2B</option>
            <option value="2C">2C</option>
            <option value="2D">2D</option>
            <option value="2E">2E</option>
            <option value="2F">2F</option>
            <option value="2G">2G</option>
            <option value="3A">3A</option>
            <option value="3B">3B</option>
            <option value="3C">3C</option>
            <option value="3D">3D</option>
            <option value="3E">3E</option>
            <option value="3F">3F</option>
            <option value="3G">3G</option>
          </Select>
          <Label>區</Label>
          <Select {...register("row", { required: true })}>
            <option value="">Select section</option>
            {uniqueRows.map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </Select>
          <Label>排</Label>
          <Select {...register("seat", { required: true })}>
            <option value="">Select section</option>
            {Array.from({ length: seats }).map((_, index) => (
              <option value={index + 1}>{index + 1}</option>
            ))}
          </Select>
          <Label>號</Label>
        </FormRow>

        <Label>觀看場次</Label>
        <Input type="text" defaultValue="" {...register("concert", { required: true })} />
        <Label>備註</Label>
        <Input type="text" defaultValue="" {...register("note", { required: true })} />
        <Content defaultValue="" {...register("content")}></Content>
      </FormContainer>
      {state.selectPhoto && <ImagePreview src={state.localPhotoUrl} />}

      <BtnBox>
        <SelectPhotoBtn>
          選擇照片
          <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" {...register("image", { required: true })} onChange={sendImage} />
        </SelectPhotoBtn>
        <Cancel onClick={() => handlerCancel()}>取消</Cancel>
        <Submit onClick={handleSubmit(onSubmit)}>送出</Submit>
      </BtnBox>
    </PostContainer>
  );
}

export default Post;
