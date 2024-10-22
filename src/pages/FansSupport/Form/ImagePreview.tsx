import { useContext } from "react";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { Action, State } from "..";
import { SupportFormContext } from "../../../utils/SupportFormContextProvider";

const StyleClose = styled(MdOutlineClose)`
  font-size: 24px;
  margin-right: 4px;
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

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function ImagePreview({ state, dispatch }: Props) {
  const { selectPhotos, localPhotoUrl, setLocalPhotoUrl, setSelectPhotos } = useContext(SupportFormContext);

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
  );
}

export default ImagePreview;
