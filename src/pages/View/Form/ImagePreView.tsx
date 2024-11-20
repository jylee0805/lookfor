import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { ViewAction, ViewState } from "../../../types";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
`;
const ImagePreviewBox = styled.div<{ $show: boolean }>`
  display: ${(props) => (props.$show ? "block" : "none")};
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
interface Props {
  state: ViewState;
  dispatch: React.Dispatch<ViewAction>;
}
function ImagePreView({ state, dispatch }: Props) {
  const handleDeletePreview = () => {
    if (state.selectPhoto) {
      dispatch({ type: "setSelectPhoto", payload: { selectPhoto: null, localPhotoUrl: "" } });
    } else if (state.postEdit?.image) {
      const update = JSON.parse(JSON.stringify(state.postEdit));
      update.image = "";
      dispatch({ type: "updatePostMode", payload: { postEdit: update } });
    }
  };

  return (
    <ImagePreviewBox $show={!!state.selectPhoto || !!state.postEdit?.image}>
      <ImagePreviewDelete onClick={() => handleDeletePreview()}>
        <StyleClose />
      </ImagePreviewDelete>
      {state.selectPhoto && <ImagePreview src={state.localPhotoUrl} />}
      {state.postEdit?.image && <ImagePreview src={state.postEdit?.image} />}
    </ImagePreviewBox>
  );
}

export default ImagePreView;
