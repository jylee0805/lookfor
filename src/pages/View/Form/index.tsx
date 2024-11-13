import { useContext, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import imageLoading from "../../../assets/imageLoading.gif";
import { ViewAction, ViewPost, ViewState } from "../../../types";
import { ViewContext } from "../../../utils/ViewContextProvider";
import Footer from "./Footer";
import ImagePreView from "./ImagePreView";
import MainInput from "./MainInput";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;
const PostContainer = styled.div<{ $show: boolean }>`
  position: fixed;
  width: 60%;
  max-height: 80vh;
  background: #ffffff;
  color: #000;
  z-index: 20;
  padding: 20px 5px 20px 30px;
  display: ${(props) => (props.$show ? "block" : "none")};
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

const Mask = styled.div<{ $postClick: boolean }>`
  display: ${(props) => (props.$postClick ? "block" : "none")};
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
function Form({ state, dispatch }: Props) {
  const { reset } = useContext(ViewContext);

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

  const handlerCancel = () => {
    reset(resetValue);

    dispatch({ type: "cancelPost", payload: { postEdit: {} as ViewPost, isPostClick: false, isShowMask: false, selectPhoto: null, localPhotoUrl: "" } });

    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Mask $postClick={state.isShowMask} />
      <PostContainer $show={state.isPostClick}>
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
          <MainInput state={state} />
          <ImagePreView state={state} dispatch={dispatch} />
        </ContentContainer>
        <Footer state={state} dispatch={dispatch} />
      </PostContainer>
    </>
  );
}

export default Form;
