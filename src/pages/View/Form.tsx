import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { Action, State } from ".";
import imageLoading from "../../assets/imageLoading.gif";
import loading from "../../assets/loading.gif";
import { ViewPost } from "../../types";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";
import handleAnalyzeImage from "../../utils/handleAnalyzeImage";

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

const Mask = styled.div<{ postClick: boolean }>`
  display: ${(props) => (props.postClick ? "block" : "none")};
  background: #3e3e3e99;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 15;
  backdrop-filter: blur(10px);
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
interface Seats {
  sectionName: string;
  row: number[];
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

const seatOptions = ["VIPA", "VIPB", "VIPC", "2A", "2B", "2C", "2D", "2E", "2F", "2G", "3A", "3B", "3C", "3D", "3E", "3F", "3G"];

const resetValue = {
  section: "",
  row: "",
  seat: "",
  concert: "",
  note: "",
  content: "",
  image: undefined,
};
function Post({ state, dispatch }: Props) {
  const authContext = useContext(AuthContext);
  const [allSeats, setAllSeats] = useState<Seats[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      section: "2A",
      row: "6",
      seat: "6",
      concert: "IVE THE FIRST FAN CONCERT 《The Prom Queens》 in Taipei",
      note: "算是很靠邊的位置",
      content: "很近!，整場看下來的感受很好",
    },
  });
  const sectionValue = watch("section");
  const rowValue = parseInt(watch("row"));

  useEffect(() => {
    if (state.postEdit?.section) {
      const values = {
        section: state.postEdit.section,
        row: state.postEdit.row?.toString(),
        seat: state.postEdit.seat?.toString(),
        concert: state.postEdit.concert,
        note: state.postEdit.note,
        content: state.postEdit.content,
      };
      reset(values);
    }
  }, [state.postEdit]);

  useEffect(() => {
    const getAllSeats = async () => {
      try {
        const allSection = (await api.getSections()) as Seats[];
        setAllSeats(allSection);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getAllSeats();
  }, [state.viewPosts]);

  const filteredSeats = allSeats.filter((item) => item.sectionName === sectionValue);
  const uniqueRows = filteredSeats.length > 0 && Array.isArray(filteredSeats[0].row) ? filteredSeats[0].row : [];
  const seats = uniqueRows[rowValue - 1];

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    let url = "";
    dispatch({ type: "setLoading", payload: { isLoading: true } });
    const formValues = getValues();

    if (state.postEdit?.image) {
      const update = state.viewPosts?.map((post) => {
        if (post.id === state.postEdit?.id) {
          return {
            ...post,
            content: formValues.content,
            concert: formValues.concert,
            image: state.postEdit.image,
            note: formValues.note,
            row: parseInt(formValues.row),
            seat: parseInt(formValues.seat),
            section: formValues.section,
          };
        }
        return post;
      });
      dispatch({ type: "setViewPosts", payload: { viewPosts: update as ViewPost[] } });
    } else if (state.selectPhoto) {
      url = await api.uploadImage(state.selectPhoto);
      const result = await handleAnalyzeImage(url);
      if (result) {
        if (formValues) {
          if (state.postEdit?.id) {
            await api.updateViewPost(state.postEdit.id, formValues, url);

            const update = state.viewPosts?.map((post) => {
              if (post.id === state.postEdit?.id) {
                return {
                  ...post,
                  content: formValues.content,
                  concert: formValues.concert,
                  image: url,
                  note: formValues.note,
                  row: parseInt(formValues.row),
                  seat: parseInt(formValues.seat),
                  section: formValues.section,
                };
              }
              return post;
            });
            dispatch({ type: "setViewPosts", payload: { viewPosts: update as ViewPost[] } });
          } else {
            await api.setViewPost(formValues, url, authContext?.loginState as string);
          }
        }
      } else {
        setError("image", {
          type: "manual",
          message: "請確認圖片不包含人物",
        });

        dispatch({ type: "setLoading", payload: { isLoading: false } });
        return;
      }
    }
    const rows = await api.getRows(formValues.section);
    const sectionAry: number[] = Array.isArray(rows) ? rows : [];

    dispatch({
      type: "resetPost",
      payload: {
        rowSeats: sectionAry,
        selectedSection: formValues.section,
        selectedRow: parseInt(formValues.row) - 1,
        isSelectRow: true,
        isSelectSection: true,
        selectedSeat: parseInt(formValues.seat) - 1,
        isLoading: false,
        isPostClick: false,
        isShowMask: false,
        selectPhoto: null,
        localPhotoUrl: "",
      },
    });

    document.body.style.overflow = "auto";

    reset(resetValue);
  };

  const handlerCancel = () => {
    reset(resetValue);

    dispatch({ type: "cancelPost", payload: { postEdit: {} as ViewPost, isPostClick: false, isShowMask: false, selectPhoto: null, localPhotoUrl: "" } });

    document.body.style.overflow = "auto";
  };

  const handleDeletePreview = () => {
    if (state.selectPhoto) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
    } else if (state.postEdit?.image) {
      const update = JSON.parse(JSON.stringify(state.postEdit));
      update.image = "";
      dispatch({ type: "updatePostMode", payload: { postEdit: update } });
    }
  };
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: target.files[0], localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };
  return (
    <>
      <Mask postClick={state.isShowMask} />

      <PostContainer show={state.isPostClick} loading={state.isLoading}>
        {state.isLoading && (
          <LoadingContainer>
            <ImageLoading src={imageLoading} alt="" />
            發佈中
          </LoadingContainer>
        )}

        <PostTitle>{state.postEdit?.section ? "更新視角" : "發佈視角"}</PostTitle>

        <Btn onClick={() => handlerCancel()}>
          <StyleClose />
        </Btn>

        <ContentContainer>
          <FormContainer>
            <Label>位置</Label>
            <FormRow>
              <Select {...register("section", { required: true })}>
                <option value="">請選擇區域</option>
                {seatOptions.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
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
          <ImagePreviewBox show={!!state.selectPhoto || !!state.postEdit?.image}>
            <ImagePreviewDelete onClick={() => handleDeletePreview()}>
              <StyleClose />
            </ImagePreviewDelete>
            {state.selectPhoto && <ImagePreview src={state.localPhotoUrl} />}
            {state.postEdit?.image && <ImagePreview src={state.postEdit?.image} />}
          </ImagePreviewBox>
        </ContentContainer>
        <PostFooter>
          <Hint>僅限一張照片</Hint>
          <BtnBox>
            <SelectPhotoBtn>
              選擇照片
              <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" {...register("image", { required: state.postEdit?.image ? false : "請選擇照片" })} onChange={selectImage} />
            </SelectPhotoBtn>
            {errors.image && <Error>{errors.image.message}</Error>}

            <Submit onClick={handleSubmit(onSubmit)} load={state.isLoading}>
              送出
              {state.isLoading && <Loading src={loading} />}
            </Submit>
          </BtnBox>
        </PostFooter>
      </PostContainer>
    </>
  );
}

export default Post;