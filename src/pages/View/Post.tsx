import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/api";
import useGoogleVisionAPI from "../../utils/useGoogleVisionAPI";
import { Action } from ".";
import loading from "../../images/loading.gif";
import { useEffect } from "react";
import { PostState } from "./index";

const PostContainer = styled.div<{ show: boolean }>`
  position: fixed;
  width: 50%;
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
  gap: 15px;
  margin-bottom: 15px;
`;
const FormRow = styled.div`
  display: flex;
  align-items: center;
`;
const PostTitle = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Label = styled.p`
  margin: 0 15px 0 5px;
`;
const Input = styled.input`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const Content = styled.textarea`
  grid-column: span 2;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
  height: 100px;
  resize: none;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  border: none;
  background: #191919;
  color: #fff;
  padding: 5px 15px;
  margin-left: auto;
  &:hover {
    background: #565656;
  }
`;
const Submit = styled(Btn)<{ load: boolean }>`
  padding: ${(props) => (props.load ? "0 15px" : "5px 15px")};
  margin-left: 5px;
  display: flex;
  align-items: center;
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
const Loading = styled.img`
  width: 30px;
`;
interface Seats {
  sectionName: string;
  row: number[];
}

interface Props {
  state: {
    allSeats: Seats[];
    section: string;
    viewPosts: PostState[];
    row: number;
    seat: number;
    isPostClick: boolean;
    selectPhoto: File | null;
    localPhotoUrl: string;
    isLoading: boolean;
    uploadPhotoUrl: string;
    isPostEditMode: PostState;
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
    getValues,

    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (state.isPostEditMode.section) {
      const values = {
        section: state.isPostEditMode.section,
        row: state.isPostEditMode.row?.toString(),
        seat: state.isPostEditMode.seat?.toString(),
        concert: state.isPostEditMode.concert,
        note: state.isPostEditMode.note,
        content: state.isPostEditMode.content,
      };
      reset(values);
    }
  }, [state.isPostEditMode]);

  const sectionValue = watch("section");
  const rowValue = parseInt(watch("row"));

  const filteredSeats = state.allSeats.filter((item) => item.sectionName === sectionValue);
  const uniqueRows = filteredSeats.length > 0 && Array.isArray(filteredSeats[0].row) ? filteredSeats[0].row : [];
  const seats = uniqueRows[rowValue - 1];

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    let url;
    dispatch({ type: "setLoading" });

    if (state.isPostEditMode.image) {
      const formValues = getValues();
      console.log("我在這");

      await handleAnalyzeImage(state.isPostEditMode.image);
      console.log("這裡");

      dispatch({ type: "setUploadPhotoUrl", payload: { uploadPhotoUrl: state.isPostEditMode.image } });
      await api.updateViewPost(state.isPostEditMode.id, formValues, state.uploadPhotoUrl);

      const update = state.viewPosts.map((post) => {
        if (post.id === state.isPostEditMode.id) {
          return {
            ...post,
            content: formValues.content,
            concert: formValues.concert,
            image: state.uploadPhotoUrl,
            note: formValues.note,
            row: parseInt(formValues.row),
            seat: parseInt(formValues.seat),
            section: formValues.section,
          };
        }
      });
      dispatch({ type: "setViewPosts", payload: { viewPosts: update as PostState[] } });

      dispatch({ type: "setLoading" });
      reset({
        section: "",
        row: "",
        seat: "",
        concert: "",
        note: "",
        content: "",
      });

      dispatch({ type: "togglePostClick" });
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
      alert("發布成功");
      document.body.style.overflow = "scroll";
    } else if (state.selectPhoto) {
      console.log(state.selectPhoto);
      url = await api.uploadImage(state.selectPhoto);
      await handleAnalyzeImage(url);
      dispatch({ type: "setUploadPhotoUrl", payload: { uploadPhotoUrl: url } });
      console.log(labels);
    }
  };

  useEffect(() => {
    let ignore = false;

    const handlerPost = async () => {
      const formValues = getValues();
      if (labels.includes("Person")) {
        alert("請確認圖片不包含人物");
        dispatch({ type: "setLoading" });
        return;
      } else if (labels === "") {
        return;
      } else {
        if (formValues) {
          console.log(formValues);

          if (state.isPostEditMode.id !== "") {
            console.log("我在更新");

            await api.updateViewPost(state.isPostEditMode.id, formValues, state.uploadPhotoUrl);

            const update = state.viewPosts.map((post) => {
              if (post.id === state.isPostEditMode.id) {
                return {
                  ...post,
                  content: formValues.content,
                  concert: formValues.concert,
                  image: state.uploadPhotoUrl,
                  note: formValues.note,
                  row: parseInt(formValues.row),
                  seat: parseInt(formValues.seat),
                  section: formValues.section,
                };
              }
            });
            dispatch({ type: "setViewPosts", payload: { viewPosts: update as PostState[] } });
          } else {
            console.log("我在上傳");

            const response = (await api.getLoginState()) as string;
            await api.setViewPost(formValues, state.uploadPhotoUrl, response);
          }
        }
        dispatch({ type: "setLoading" });
        reset({
          section: "",
          row: "",
          seat: "",
          concert: "",
          note: "",
          content: "",
          image: undefined,
        });

        dispatch({ type: "togglePostClick" });
        dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
        alert("發布成功");
        document.body.style.overflow = "scroll";
      }
    };
    if (!ignore) {
      handlerPost();
    }

    return () => {
      ignore = true;
    };
  }, [labels, state.uploadPhotoUrl]);

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
    dispatch({ type: "setPostMode", payload: { isPostEditMode: { id: "" } } });
    document.body.style.overflow = "scroll";
  };

  return (
    <PostContainer show={state.isPostClick}>
      <PostTitle>{state.isPostEditMode.section ? "更新視角" : "發布視角"}</PostTitle>
      <FormContainer>
        <Label>位置</Label>
        <FormRow>
          <Select {...register("section", { required: true })}>
            <option value="">請選擇區域</option>
            <option value="VIPA">VIPA</option>
            <option value="VIPB">VIPB</option>
            <option value="VIPC">VIPC</option>
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
            <option value="">請選擇排數</option>
            {uniqueRows.map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </Select>
          <Label>排</Label>
          <Select {...register("seat", { required: true })}>
            <option value="">請選擇座位</option>
            {Array.from({ length: seats }).map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </Select>
          <Label>號</Label>
        </FormRow>

        <Label>觀看場次</Label>

        <Input type="text" defaultValue="" {...register("concert", { required: true })} placeholder="2024 SUPER JUNIOR <SUPER SHOW SPIN-OFF : Halftime>" />
        <Label>備註</Label>
        <Input type="text" defaultValue="" {...register("note")} placeholder="會被欄杆擋住、冷氣很冷..." />
        <Content defaultValue="" {...register("content")} placeholder="演唱會心得或是視角感受分享..."></Content>
      </FormContainer>
      {state.selectPhoto && <ImagePreview src={state.localPhotoUrl} />}
      {state.isPostEditMode.image && <ImagePreview src={state.isPostEditMode.image} />}

      <BtnBox>
        <SelectPhotoBtn>
          選擇照片
          <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" {...register("image", { required: state.isPostEditMode.image ? false : "請選擇照片" })} onChange={sendImage} />
        </SelectPhotoBtn>
        {errors.image && <p>{errors.image.message}</p>}
        <Btn onClick={() => handlerCancel()}>取消</Btn>
        <Submit onClick={handleSubmit(onSubmit)} load={state.isLoading}>
          送出
          {state.isLoading && <Loading src={loading} />}
        </Submit>
      </BtnBox>
    </PostContainer>
  );
}

export default Post;
