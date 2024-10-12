import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/api";
import useGoogleVisionAPI from "../../utils/useGoogleVisionAPI";
import { Action, State } from ".";
import loading from "../../images/loading.gif";
import { useEffect, useContext } from "react";
import { PostState } from "./index";
import { AuthContext } from "../../utils/AuthContextProvider";
import { MdOutlineClose } from "react-icons/md";
import imageLoading from "../../images/imageLoading.gif";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;
const PostContainer = styled.div<{ show: boolean; loading: boolean }>`
  position: fixed;
  width: 60%;
  max-height: 80vh;
  background: #ffffff;
  color: #000;
  z-index: 20;
  padding: 20px 5px 20px 30px;
  display: ${(props) => (props.show ? "block" : "none")};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: 3px 3px 3px #6c6c6c;
  clip-path: inset(0 round 15px);

  @media (max-width: 992px) {
    width: 80%;
  }
  @media (max-width: 575px) {
    padding: 20px 15px;
  }
`;
const LoadingContainer = styled.button`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #00000080;
  z-index: 60;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ImageLoading = styled.img`
  width: 80px;
  height: 80px;
`;
const PostTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
  z-index: 20;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
`;
const Btn = styled.button`
  border: none;
  position: fixed;
  background: transparent;
  color: #000;
  padding: 0 5px;
  top: 25px;
  right: 20px;
  &:hover {
    background: #565656;
  }
`;
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: 55vh;
  margin-top: 50px;
  margin-bottom: 65px;
  padding-right: 25px;

  &::-webkit-scrollbar {
    width: 8px;
    scroll-margin-left: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #6d6d6d;
  }
`;
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
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
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
const ImagePreviewBox = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  width: fit-content;
  height: 180px;
  position: relative;
  margin-top: 15px;
`;
const ImagePreviewDelete = styled.button`
  position: absolute;
  background: none;
  padding: 0;
  right: 5px;
  top: 5px;
  color: #fff;
`;
const ImagePreview = styled.img`
  object-fit: cover;
`;
const PostFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 30px 20px 30px;
`;
const Hint = styled.p`
  font-size: 12px;
  color: #8a8a8a;
  margin-left: 10px;
  margin-bottom: 3px;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;
const SelectPhotoBtn = styled.label`
  text-align: center;
  background: #d2d2d2;
  padding: 5px 15px;
  border-radius: 8px;
  cursor: pointer;
`;
const FileBtn = styled.input`
  visibility: hidden;
  width: 0;
`;
const Submit = styled.button<{ load: boolean }>`
  padding: ${(props) => (props.load ? "0 15px" : "5px 15px")};
  margin-left: 5px;
  display: flex;
  align-items: center;
  border: none;
  background: #191919;
  color: #fff;
  margin-left: auto;
  &:hover {
    background: #565656;
  }
`;
const Loading = styled.img`
  width: 30px;
`;
const Error = styled.span`
  font-weight: 600;
  color: #ff6262;
  margin-left: 15px;
`;

interface Props {
  state: State;
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
  const authContext = useContext(AuthContext);
  const { labels, handleAnalyzeImage } = useGoogleVisionAPI();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormInputs>();
  const sectionValue = watch("section");
  const rowValue = parseInt(watch("row"));

  useEffect(() => {
    if (state.isPostEditMode?.section) {
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

  const filteredSeats = state.allSeats.filter((item) => item.sectionName === sectionValue);
  const uniqueRows = filteredSeats.length > 0 && Array.isArray(filteredSeats[0].row) ? filteredSeats[0].row : [];
  const seats = uniqueRows[rowValue - 1];

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    let url;
    console.log(state.isLoading);
    dispatch({ type: "setLoading", payload: { isLoading: true } });

    if (state.isPostEditMode?.image) {
      const formValues = getValues();
      await handleAnalyzeImage(state.isPostEditMode.image);

      dispatch({ type: "setUploadPhotoUrl", payload: { uploadPhotoUrl: state.isPostEditMode.image } });
      await api.updateViewPost(state.isPostEditMode.id, formValues, state.uploadPhotoUrl);

      const update = state.viewPosts?.map((post) => {
        if (post.id === state.isPostEditMode?.id) {
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
        return post;
      });
      dispatch({ type: "setViewPosts", payload: { viewPosts: update as PostState[] } });
      dispatch({ type: "setLoading", payload: { isLoading: false } });
      reset({
        section: "",
        row: "",
        seat: "",
        concert: "",
        note: "",
        content: "",
      });

      dispatch({ type: "togglePostClick", payload: { isPostClick: false, isShowMask: false } });
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });

      document.body.style.overflow = "auto";
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
      if (labels.includes("Person") && labels.includes("Clothing") && labels.includes("Pants")) {
        setError("image", {
          type: "manual",
          message: "請確認圖片不包含人物",
        });

        dispatch({ type: "setLoading", payload: { isLoading: false } });
        return;
      } else if (labels === "") {
        return;
      } else {
        if (formValues) {
          console.log(formValues);

          if (state.isPostEditMode?.id) {
            await api.updateViewPost(state.isPostEditMode.id, formValues, state.uploadPhotoUrl);

            const update = state.viewPosts?.map((post) => {
              if (post.id === state.isPostEditMode?.id) {
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
              return post;
            });
            dispatch({ type: "setViewPosts", payload: { viewPosts: update as PostState[] } });
          } else {
            await api.setViewPost(formValues, state.uploadPhotoUrl, authContext?.loginState as string);
          }
        }

        const rows = await api.getRows(formValues.section);
        const sectionAry: number[] = Array.isArray(rows) ? rows : [];
        dispatch({ type: "selectSection", payload: { rowSeats: sectionAry, section: formValues.section, isSelectRow: false } });
        dispatch({ type: "selectRow", payload: { row: parseInt(formValues.row) - 1, isSelectRow: true, seat: 0 } });
        dispatch({ type: "selectSeat", payload: { seat: parseInt(formValues.seat) - 1 } });

        dispatch({ type: "setLoading", payload: { isLoading: false } });
        reset({
          section: "",
          row: "",
          seat: "",
          concert: "",
          note: "",
          content: "",
          image: undefined,
        });

        dispatch({ type: "togglePostClick", payload: { isPostClick: false, isShowMask: false } });
        dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
        document.body.style.overflow = "auto";
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

    dispatch({ type: "setPostMode", payload: { isPostEditMode: {} as PostState, isPostClick: false, isShowMask: false } });
    dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
    document.body.style.overflow = "auto";
  };

  const handleDeletePreview = () => {
    if (state.selectPhoto) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
    } else if (state.isPostEditMode?.image) {
      const update = JSON.parse(JSON.stringify(state.isPostEditMode));
      update.image = "";
      dispatch({ type: "updatePostMode", payload: { isPostEditMode: update } });
    }
  };
  return (
    <PostContainer show={state.isPostClick} loading={state.isLoading}>
      {state.isLoading && (
        <LoadingContainer>
          <ImageLoading src={imageLoading} alt="" />
          發佈中
        </LoadingContainer>
      )}

      <PostTitle>{state.isPostEditMode?.section ? "更新視角" : "發布視角"}</PostTitle>
      <Btn onClick={() => handlerCancel()}>
        <StyleClose />
      </Btn>
      <ContentContainer>
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
        <ImagePreviewBox show={!!state.selectPhoto || !!state.isPostEditMode?.image}>
          <ImagePreviewDelete onClick={() => handleDeletePreview()}>
            <StyleClose />
          </ImagePreviewDelete>
          {state.selectPhoto && <ImagePreview src={state.localPhotoUrl} />}
          {state.isPostEditMode?.image && <ImagePreview src={state.isPostEditMode?.image} />}
        </ImagePreviewBox>
      </ContentContainer>
      <PostFooter>
        <Hint>僅限一張照片</Hint>
        <BtnBox>
          <SelectPhotoBtn>
            選擇照片
            <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" {...register("image", { required: state.isPostEditMode?.image ? false : "請選擇照片" })} onChange={sendImage} />
          </SelectPhotoBtn>
          {errors.image && <Error>{errors.image.message}</Error>}

          <Submit onClick={handleSubmit(onSubmit)} load={state.isLoading}>
            送出
            {state.isLoading && <Loading src={loading} />}
          </Submit>
        </BtnBox>
      </PostFooter>
    </PostContainer>
  );
}

export default Post;
