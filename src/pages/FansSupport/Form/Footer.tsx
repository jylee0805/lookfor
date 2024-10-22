import { useContext } from "react";
import { SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Action, State } from "..";
import { Concerts, MerchPost } from "../../../types";
import api from "../../../utils/api";
import { FormInputs, SupportFormContext } from "../../../utils/SupportFormContextProvider";

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

interface Props {
  concert: Concerts;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Footer({ concert, state, dispatch }: Props) {
  const { register, handleSubmit, reset, selectPhotos, setLocalPhotoUrl, setSelectPhotos } = useContext(SupportFormContext);

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

  return (
    <BtnBox>
      <SelectPhotoBtn>
        選擇照片
        <FileBtn type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple {...register("image")} onChange={(e) => handleChange(e)} />
      </SelectPhotoBtn>
      <Btn onClick={() => handlerCancel()}>取消</Btn>
      <SubmitBtn onClick={handleSubmit(onSubmit)}>送出</SubmitBtn>
    </BtnBox>
  );
}

export default Footer;
