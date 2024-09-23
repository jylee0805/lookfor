import styled from "styled-components";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Concerts } from "../ConcertList";
import api from "../../utils/api";
import { State, Action } from "./index";
import { useEffect } from "react";

const Container = styled.div<{ isPostClick: boolean }>`
  padding: 60px 30px;
  display: ${(props) => (props.isPostClick ? "block" : "none")};
  position: fixed;
  background: #d2d2d2;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h3``;
const Label = styled.p``;
const InputContainer = styled.div``;
const Input = styled.input``;
const ColumnContainer = styled.div``;
const Select = styled.select``;
const BtnBox = styled.div``;
const Btn = styled.button``;
const MoreContent = styled.textarea``;
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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    let urls;
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
    const allData = {
      concertId: concert.id,
      content: data.more,
      qualify: data.qualify,
      passPlace: data.place,
      passState: data.status,
      passDay: data.day,
      passTime: total,
      image: state.isEditMode ? state.isEditMode.image : urls,
      userUID: state.isEditMode ? state.isEditMode.userUID : response,
    };
    if (state.isEditMode.id) {
      await api.updateMerchPost(state.isEditMode.id, allData);
    } else {
      await api.setMerchPost(allData);
    }
    reset({ day: "", status: "", concert: "", place: "", qualify: "", more: "" });
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: false } });
  };
  const handlerCancel = () => {
    dispatch({ type: "toggleIsPostClick", payload: { isPostClick: false } });
    reset({ day: "", status: "", concert: "", place: "", qualify: "", more: "", image: undefined });
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
          <Select {...register("day", { required: true })}>{concert.date && day.map((item) => <option value={item}>{item}</option>)}</Select>
        </ColumnContainer>
        <ColumnContainer>
          <Label>時間</Label>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Select Time"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)} // 更新時間
              />
            )}
          />
        </ColumnContainer>
        <ColumnContainer>
          <Label>狀態</Label>
          <Select {...register("status", { required: true })}>
            <option value="1">未發放</option>
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
      {state.localPhotoUrl && state.localPhotoUrl.map((item) => <img src={item} />)}
      {state.isEditMode.image && state.isEditMode.image.map((item) => <img src={item} />)}
      <BtnBox>
        <SelectPhotoBtn>
          選擇照片
          <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple {...register("image")} onChange={(e) => handleChange(e)} />
        </SelectPhotoBtn>
        <Btn onClick={() => handlerCancel()}>取消</Btn>
        <Btn onClick={handleSubmit(onSubmit)}>送出</Btn>
      </BtnBox>
    </Container>
  );
}

export default FanPost;
