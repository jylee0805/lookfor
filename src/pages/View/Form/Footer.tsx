import { useContext } from "react";
import { SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { ViewAction, ViewPost, ViewState } from "../../../types";
import api from "../../../utils/api";
import { AuthContext } from "../../../utils/AuthContextProvider";
import handleAnalyzeImage from "../../../utils/handleAnalyzeImage";
import { FormInputs, ViewContext } from "../../../utils/ViewContextProvider";

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
const Submit = styled.button<{ $load: boolean }>`
  padding: ${(props) => (props.$load ? "0 15px" : "5px 15px")};
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
const Error = styled.span`
  font-weight: 600;
  color: #ff6262;
  margin-left: 15px;
`;

const resetValue = {
  section: "",
  row: "",
  seat: "",
  concert: "",
  note: "",
  content: "",
  image: undefined,
};
interface Props {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
}
function Footer({ state, dispatch }: Props) {
  const authContext = useContext(AuthContext);
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useContext(ViewContext);
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
      url = await api.uploadImage("viewPost", state.selectPhoto);
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
  const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: target.files[0], localPhotoUrl: URL.createObjectURL(target.files[0]) } });
    }
  };
  return (
    <PostFooter>
      <Hint>僅限一張照片</Hint>
      <BtnBox>
        <SelectPhotoBtn>
          選擇照片
          <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" {...register("image", { required: state.postEdit?.image ? false : "請選擇照片" })} onChange={selectImage} />
        </SelectPhotoBtn>
        {errors.image && <Error>{errors.image.message}</Error>}

        <Submit onClick={handleSubmit(onSubmit)} $load={state.isLoading}>
          送出
        </Submit>
      </BtnBox>
    </PostFooter>
  );
}

export default Footer;
