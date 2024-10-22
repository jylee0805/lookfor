import { useContext } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import styled from "styled-components";
import { Action, State } from ".";
import { MerchPost } from "../../types";
import { AuthContext } from "../../utils/AuthContextProvider";
import Collect from "./Collect";

const UserName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;
const Container = styled.div``;
const ImportInfo = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  column-gap: 20px;
  row-gap: 5px;
  width: 80%;
  margin-bottom: 10px;
  color: #ffffff;

  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 575px) {
    font-size: 1rem;
    width: 100%;
    grid-template-columns: 60px auto;
  }
`;
const ImportInfoContent = styled.p`
  font-size: 1.1rem;
  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;

const InfoContent = styled.div`
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  position: relative;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fff3e7;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #888888;
  }
`;
const Image = styled.img`
  max-width: 500px;
  max-height: 300px;
  object-fit: cover;
  margin-right: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 2px solid #fff;
  @media (max-width: 768px) {
    max-width: 400px;
    max-height: 200px;
  }
`;

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  item: MerchPost;
}

function PostContent({ state, dispatch, item }: Props) {
  const authContext = useContext(AuthContext);

  return (
    <Container>
      <UserName>{item.userName}</UserName>
      <ImportInfo>
        <ImportInfoContent>應援物品</ImportInfoContent>
        <ImportInfoContent>{`${item.item}`}</ImportInfoContent>
        <ImportInfoContent>時間</ImportInfoContent>
        <ImportInfoContent>{`${item.passDay} ${item.passTime}`}</ImportInfoContent>
        <ImportInfoContent>地點</ImportInfoContent>
        <ImportInfoContent>{item.passPlace}</ImportInfoContent>
        <ImportInfoContent>狀態</ImportInfoContent>
        <ImportInfoContent>{item.passState === "0" ? "未發放" : item.passState === "1" ? "發放中" : "發放完畢"}</ImportInfoContent>
        <ImportInfoContent>領取資格</ImportInfoContent>
        <ImportInfoContent>{item.qualify}</ImportInfoContent>
      </ImportInfo>

      <InfoContent dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />") }}></InfoContent>
      <PhotoProvider maskOpacity={0.8} bannerVisible={false}>
        <ImageContainer>
          {item.image.map((item) => (
            <PhotoView key={item} src={item}>
              <Image src={item} />
            </PhotoView>
          ))}
        </ImageContainer>
      </PhotoProvider>
      {authContext?.loginState && <Collect state={state} dispatch={dispatch} item={item} />}
    </Container>
  );
}

export default PostContent;
