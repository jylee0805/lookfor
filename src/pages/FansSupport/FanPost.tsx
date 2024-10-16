import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { Concerts, MerchPost } from "../../types";
import api from "../../utils/api";
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

const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
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
  color: #fff;
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
const ImagePreviewBox = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
  width: fit-content;
  height: 180px;
  position: relative;
  margin-top: 15px;
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
  const { register, handleSubmit, control, reset } = useForm<FormInputs>({
    defaultValues: {
      time: dayjs(),
      item: "SKZOO糰子壓克力鑰匙圈+小零食",
      day: dayjs("13:30", "HH:mm").format("HH:mm"),
      status: "0",
      place: "世運捷運站",
      qualify: "四期會員/任一成員泡泡滿100天（以上）",
      more: "大家好！這裡是咪咪貓貓和黑糖饅頭演唱會倒數不到一個月ㄌ好期待好期待😣\n我們兩個這次一起準備了一些應援來和stay們分享～～～\n· 應援物內容：SKZOO糰子壓克力鑰匙圈+小零食幸運餅乾雙面壓克力吊飾圈（兩面的圖案是不一樣的✨）\n· 數量：約15-20份左右（如果有想要交換的朋友可以來私訊我！我們會幫你預留♥♡♥）\n-為了配合ATE的概念（？這次做了食物類的吊飾往後滑有實體照！threads的流量好像會比較好 嗎\n總之來借助串的力量了再請大家分享給你身邊的stay們啦～到時候見！🤤",
    },
  });
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string[]>([]);
  const [selectPhotos, setSelectPhotos] = useState<File[] | null>([]);

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

  const day = concert?.date?.map((item) => {
    if (item) {
      const dayOnly = item.split(" ")[0] + " " + item.split(" ")[1];
      return dayOnly;
    }
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let urls: string[] = [];
    try {
      if (selectPhotos) {
        urls = await Promise.all(
          selectPhotos.map(async (item: File) => {
            const url = await api.uploadImage(item);
            return url;
          })
        );
      } else {
        urls = [];
      }
    } catch (error) {
      console.error("上傳圖片時出錯:", error);
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
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: false } });
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

  const handleDeletePreview = () => {
    if (selectPhotos) {
      setLocalPhotoUrl([]);
      setSelectPhotos([]);
    } else if (state.isEditMode.image) {
      const update = JSON.parse(JSON.stringify(state.isEditMode));
      update.image = "";
      dispatch({ type: "toggleIsEditMode", payload: { isEditMode: update, isPostClick: true } });
    }
  };

  return (
    <Container isPostClick={state.isPostClick}>
      <Title>建立資訊</Title>
      <ContentContainer>
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
          <MoreContent {...register("more", { required: true })}></MoreContent>
        </InputContainer>
        <ImagePreviewBox show={selectPhotos !== null && (selectPhotos?.length > 0 || state.isEditMode?.image?.length > 0)}>
          <ImagePreviewDelete onClick={() => handleDeletePreview()}>
            <StyleClose />
          </ImagePreviewDelete>
          {localPhotoUrl && localPhotoUrl.map((item: string) => <Image src={item} />)}
          {state.isEditMode.image && state.isEditMode.image.map((item: string) => <Image src={item} />)}
        </ImagePreviewBox>
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
