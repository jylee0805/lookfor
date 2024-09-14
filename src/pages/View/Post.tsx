import { useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/api";

const PostContainer = styled.div<{ show: boolean }>`
  position: absolute;
  background: #e2e2e2;
  z-index: 5;
  display: ${(props) => (props.show ? "block" : "none")};
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
const Content = styled.textarea`
  grid-column: span 2;
`;
const Submit = styled.button``;
const Cancel = styled.button``;
const SelectPhotoBtn = styled.label``;
const FileBtn = styled.input`
  visibility: hidden;
  width: 30px;
`;
const ImagePreview = styled.img`
  width: 250px;
`;
interface Props {
  state: {
    allSeats: number[];
    section: string;
    row: number;
    seat: number;
    isPostClick: boolean;
    selectPhoto: object;
  };
  dispatch: React.Dispatch<Action>;
  sendImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Post({ state, dispatch, sendImage }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(typeof data);

    let url;
    if (state.selectPhoto) {
      url = await api.uploadImage(state.selectPhoto);
      dispatch({ type: "setUploadPhotoUrl", payload: { uploadPhotoUrl: url } });
    }
    await api.setViewPost(data, url);
  };

  return (
    <PostContainer show={state.isPostClick}>
      <PostTitle>發佈視角</PostTitle>
      <FormContainer>
        <Label>位置</Label>
        <FormRow>
          <Input type="text" defaultValue="" {...register("section")} />
          <Label>區</Label>
          <Input type="number" defaultValue="" {...register("row")} />
          <Label>排</Label>
          <Input type="number" defaultValue="" {...register("seat")} />
          <Label>號</Label>
        </FormRow>

        <Label>觀看場次</Label>
        <Input type="text" defaultValue="" {...register("concert")} />
        <Label>備註</Label>
        <Input type="text" defaultValue="" {...register("note")} />
        <Content defaultValue="" {...register("content")}></Content>
      </FormContainer>
      {state.selectPhoto && <ImagePreview src={state.selectPhoto} />}

      <SelectPhotoBtn>
        選擇照片
        <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" onChange={sendImage} />
      </SelectPhotoBtn>
      <Cancel onClick={() => {}}>取消</Cancel>
      <Submit onClick={handleSubmit(onSubmit)}>送出</Submit>
    </PostContainer>
  );
}

export default Post;
