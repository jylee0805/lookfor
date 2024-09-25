import styled from "styled-components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Concerts } from "../ConcertList";
import api from "../../utils/api";
import { State, Action, MerchPost } from "./index";
import { useEffect } from "react";

const Container = styled.div<{ isPostClick: boolean }>`
  padding: 20px 30px;
  display: ${(props) => (props.isPostClick ? "block" : "none")};
  position: fixed;
  background: #ffffff;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Label = styled.p``;
const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
  column-gap: 20px;
  row-gap: 15px;
`;
const Input = styled.input`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const CustomTimePicker = styled(TimePicker)({
  "& .MuiInputBase-root": {
    backgroundColor: "#ffffff", // 修改輸入框的背景顏色
    borderRadius: "5px", // 修改邊框圓角
    padding: "0px", // 調整內距
    fontSize: "14px",
    height: "30px",
    width: "150px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d2d2d2", // 修改邊框顏色
  },

  "& .MuiIconButton-root": {
    marginRight: "3px",
  },
  "& .css-lc42l8-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "0px 8px",
  },
});
const ColumnContainer = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
`;
const Select = styled.select`
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  padding: 5px;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
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
`;
const Image = styled.img`
  width: 65px;
  margin-bottom: 15px;
`;
const SelectPhotoBtn = styled.label`
  text-align: center;
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
}
interface Props {
  concert: Concerts;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function FanPost({ concert, state, dispatch }: Props) {
  const { register, handleSubmit, control, reset } = useForm<FormInputs>({
    defaultValues: {
      time: dayjs(), // 預設值為當前時間
    },
  });

  useEffect(() => {
    if (state.isEditMode.passDay) {
      const values = {
        day: state.isEditMode.passDay,
        time: dayjs(state.isEditMode.passTime, "HH:mm"),
        status: state.isEditMode.passState,
        place: state.isEditMode.passPlace,
        qualify: state.isEditMode.qualify,
        more: state.isEditMode.content,
        // image: state.isEditMode.image,
      };
      reset(values);
    }
    console.log(state.isEditMode);
  }, [state.isEditMode]);

  const day = concert.date.map((item) => {
    if (item) {
      const dayOnly = item.split(" ")[0] + " " + item.split(" ")[1];
      return dayOnly;
    }
  });
  console.log(state.isEditMode);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    let urls: string[] = [];
    try {
      if (state.selectPhotos) {
        urls = await Promise.all(
          state.selectPhotos.map(async (item) => {
            const url = await api.uploadImage(item);
            return url;
          })
        );
        console.log(urls); // 這裡會是所有上傳後的網址
      } else {
        urls = [];
      }
    } catch (error) {
      console.error("上傳圖片時出錯:", error);
      // 如果有必要，你可以返回或處理錯誤
    }

    const time = data.time;

    const hours = time.hour();
    const minutes = String(time.minute()).padStart(2, "0");
    const total = hours.toString() + ":" + minutes;
    console.log(total);
    const response = (await api.getLoginState()) as string;
    console.log(state.isEditMode.userUID);

    const UID = state.isEditMode.userUID === undefined || state.isEditMode.userUID === "" ? response : state.isEditMode.userUID;
    console.log(UID);

    const allData = {
      concertId: concert.id,
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
      await api.updateMerchPost(state.isEditMode.id, allData);
    } else {
      console.log(allData);

      await api.setMerchPost(allData);
    }
    dispatch({ type: "toggleIsEditMode", payload: { isEditMode: {} as MerchPost, isPostClick: false } });
    reset({ day: "", status: "", concert: "", place: "", qualify: "", more: "" });
    dispatch({ type: "setLocalPhotoUrl", payload: { localPhotoUrl: [], selectPhotos: [] } });

    // dispatch({ type: "toggleIsPostClick", payload: { isPostClick: false } });
  };
  const handlerCancel = () => {
    console.log(concert.date);

    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: false } });
    dispatch({ type: "setLocalPhotoUrl", payload: { localPhotoUrl: [], selectPhotos: [] } });
    dispatch({ type: "toggleIsEditMode", payload: { isEditMode: {} as MerchPost, isPostClick: false } });
    reset({ day: "", status: "0", concert: "", place: "", qualify: "", more: "", image: undefined });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const localUrl = Array.from(target.files).map((item) => {
        return URL.createObjectURL(item);
      });
      dispatch({ type: "setLocalPhotoUrl", payload: { localPhotoUrl: localUrl, selectPhotos: Array.from(target.files) } });
    }
  };

  return (
    <Container isPostClick={state.isPostClick}>
      <Title>建立資訊</Title>
      <InputContainer>
        <ColumnContainer>
          <Label>日期</Label>
          <Select {...register("day", { required: true })}>
            <option value="">請選擇日期</option>
            {concert.date && day.map((item) => <option value={item}>{item}</option>)}
          </Select>
        </ColumnContainer>
        <ColumnContainer>
          <Label>時間</Label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <CustomTimePicker
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)} // 更新時間
              />
            )}
          />
        </ColumnContainer>
        <ColumnContainer>
          <Label>狀態</Label>
          <Select {...register("status", { required: true })}>
            <option value="0">未發放</option>
            <option value="1">發放中</option>
            <option value="2">發放完畢</option>
          </Select>
        </ColumnContainer>
        <ColumnContainer>
          <Label>地點</Label>
          <Input type="text" {...register("place", { required: true })} />
        </ColumnContainer>
        <ColumnContainer>
          <Label>領取資格</Label>
          <Input type="text" {...register("qualify", { required: true })} />
        </ColumnContainer>
        <MoreContent {...register("more", { required: true })}></MoreContent>
      </InputContainer>
      {state.localPhotoUrl && state.localPhotoUrl.map((item) => <Image src={item} />)}
      {state.isEditMode.image && state.isEditMode.image.map((item) => <Image src={item} />)}
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
