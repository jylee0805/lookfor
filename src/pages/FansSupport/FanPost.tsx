import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { Concerts, MerchPost } from "../../types";
import api from "../../utils/api";
import { SupportFormContext } from "../../utils/SupportFormContextProvider";
import FanPostForm from "./FanPostForm";
import { Action, State } from "./index";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;

const Container = styled.div<{ isPostClick: boolean }>`
  width: 60%;
  padding: 20px 5px 20px 30px;
  display: ${(props) => (props.isPostClick ? "block" : "none")};
  position: fixed;
  background: #ffffff;
  color: #000;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  max-height: 80vh;
  @media (max-width: 992px) {
    width: 80%;
  }
`;
const ContentContainer = styled.div`
  overflow-y: auto;
  max-height: 55vh;
  margin-top: 50px;
  margin-bottom: 45px;
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
const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
  color: #000;
  z-index: 20;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 0 30px 20px 30px;
`;
const Btn = styled.button`
  background: #191919;
  color: #fff;
  padding: 5px 15px;
  margin-left: auto;
`;
const SubmitBtn = styled(Btn)`
  margin-left: 5px;
`;
const ImageContainer = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? "block" : "none")};
  overflow-x: auto;
  overflow-y: hidden;
`;
const ImagePreviewBox = styled.div`
  position: relative;
  margin-top: 15px;
  display: flex;
  width: fit-content;
  column-gap: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 200px;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;
const ImagePreviewDelete = styled.button`
  position: absolute;
  background: none;
  padding: 0;
  right: 5px;
  top: 5px;
  color: #808080;
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

export interface FormInputs {
  day: string | number;
  time: Dayjs;
  status: string;
  concert: string;
  place: string;
  qualify: string;
  more: string;
  image: object;
  item: string;
}
interface Props {
  concert: Concerts;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function FanPost({ concert, state, dispatch }: Props) {
  //const { register, handleSubmit, control, reset } = useForm<FormInputs>();
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string[]>([]);
  const [selectPhotos, setSelectPhotos] = useState<File[]>([]);
  const { register, handleSubmit, reset } = useContext(SupportFormContext);
  useEffect(() => {
    if (state.isEditMode.passDay) {
      const values = {
        item: state.isEditMode.item,
        day: state.isEditMode.passDay,
        time: dayjs(state.isEditMode.passTime, "HH:mm"),
        status: state.isEditMode.passState,
        place: state.isEditMode.passPlace,
        qualify: state.isEditMode.qualify,
        more: state.isEditMode.content,
      };

      reset(values);
    }
  }, [state.isEditMode]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let urls: string[] = [];
    if (selectPhotos) {
      urls = await Promise.all(
        selectPhotos.map(async (item: File) => {
          const url = await api.uploadImage("fansSupport", item);
          return url;
        })
      );
    } else {
      urls = [];
    }

    const time = data.time;
    const hours = time.hour();
    const minutes = String(time.minute()).padStart(2, "0");
    const total = hours.toString() + ":" + minutes;

    const response = (await api.getLoginState()) as string;
    const UID = state.isEditMode.userUID === undefined || state.isEditMode.userUID === "" ? response : state.isEditMode.userUID;

    const allData = {
      concertId: concert.id,
      item: data.item,
      content: data.more,
      qualify: data.qualify,
      passPlace: data.place,
      passState: data.status,
      passDay: data.day,
      passTime: total,
      image: state.isEditMode.content ? state.isEditMode.image.concat(urls) : urls,
      userUID: UID,
    };

    if (state.isEditMode.id) {
      if (state.isEditMode.passState !== data.status) {
        const stateText = data.status === "0" ? "尚未發放" : data.status === "1" ? "發放中" : "發放完畢";
        api.setNotify(state.isEditMode.id, concert.id, `應援物${stateText}`, state.isEditMode.item);
      } else if (state.isEditMode.passPlace !== data.place) {
        api.setNotify(state.isEditMode.id, concert.id, `地點更改為${data.place}`, state.isEditMode.item);
      } else if (state.isEditMode.passTime !== total) {
        api.setNotify(state.isEditMode.id, concert.id, `時間更改為${total}`, state.isEditMode.item);
      }
      await api.updateMerchPost(state.isEditMode.id, allData);
    } else {
      await api.setMerchPost(allData);
    }
    dispatch({ type: "toggleIsEditMode", payload: { isEditMode: {} as MerchPost, isPostClick: false } });
    reset({ day: "", status: "", concert: "", place: "", qualify: "", more: "", item: "" });
    setSelectPhotos([]);
    setLocalPhotoUrl([]);
  };
  const handlerCancel = () => {
    dispatch({ type: "toggleIsEditMode", payload: { isEditMode: {} as MerchPost, isPostClick: false } });
    setLocalPhotoUrl([]);
    setSelectPhotos([]);
    reset({ day: "", status: "", concert: "", place: "", qualify: "", more: "", image: undefined });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const localUrl = Array.from(target.files).map((item) => {
        return URL.createObjectURL(item);
      });
      setLocalPhotoUrl(localUrl);
      setSelectPhotos(Array.from(target.files));
    }
  };

  const handleDeletePreview = (id: number) => {
    if (selectPhotos.length > 0) {
      setLocalPhotoUrl((prev) => prev.filter((_, index) => index !== id));
      setSelectPhotos((prev) => prev.filter((_, index) => index !== id));
    } else if (state.isEditMode.image) {
      const update = JSON.parse(JSON.stringify(state.isEditMode));
      const result = update.image.filter((_: void, index: number) => index !== id);

      dispatch({ type: "toggleIsEditMode", payload: { isEditMode: result, isPostClick: true } });
    }
  };

  return (
    <Container isPostClick={state.isPostClick}>
      <Title>建立資訊</Title>
      <ContentContainer>
        <FanPostForm concert={concert} />
        <ImageContainer $show={selectPhotos !== null && (selectPhotos?.length > 0 || state.isEditMode?.image?.length > 0)}>
          <ImagePreviewBox>
            {localPhotoUrl &&
              localPhotoUrl.map((item: string, index) => (
                <ImageBox>
                  <ImagePreviewDelete onClick={() => handleDeletePreview(index)}>
                    <StyleClose />
                  </ImagePreviewDelete>
                  <Image src={item} />
                </ImageBox>
              ))}
            {state.isEditMode.image &&
              state.isEditMode.image.map((item: string, index) => (
                <ImageBox>
                  <ImagePreviewDelete onClick={() => handleDeletePreview(index)}>
                    <StyleClose />
                  </ImagePreviewDelete>
                  <Image src={item} />
                </ImageBox>
              ))}
          </ImagePreviewBox>
        </ImageContainer>
      </ContentContainer>

      <BtnBox>
        <SelectPhotoBtn>
          選擇照片
          <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple {...register("image")} onChange={(e) => handleChange(e)} />
        </SelectPhotoBtn>
        <Btn onClick={() => handlerCancel()}>取消</Btn>
        <SubmitBtn onClick={handleSubmit(onSubmit)}>送出</SubmitBtn>
      </BtnBox>
    </Container>
  );
}

export default FanPost;
