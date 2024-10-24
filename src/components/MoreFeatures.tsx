import { MdOutlineMoreVert } from "react-icons/md";
import styled from "styled-components";
import { useMoreFeatures } from "../hooks/useMoreFeatures";
const FeatureBox = styled.div<{ show: boolean }>`
  margin-left: auto;
  position: relative;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 5;
`;

const FeatureBtn = styled.button`
  padding: 0;
  color: #fff;
  background: none;
  border: none;
`;

const FeatureList = styled.ul<{ $open: boolean }>`
  display: ${(props) => (props.$open ? "block" : "none")};
  position: absolute;
  background: #fff;
  width: 70px;
  right: 0;
  border-radius: 8px;
`;
const FeatureItem = styled.li`
  padding: 0;
`;
const FeatureInnerBtn = styled(FeatureBtn)`
  display: block;
  margin: 0 auto;
  padding: 10px 18px;
  color: #000;
`;
const MoreBtn = styled(FeatureBtn)`
  margin-right: 10px;
`;
const StyleMore = styled(MdOutlineMoreVert)`
  font-size: 1.5rem;
`;
type MoreFeatures = {
  itemID: string;
  onEdit: () => void;
  onDelete: () => void;
  itemUID: string;
};

const MoreFeatures = ({ itemID, onEdit, onDelete, itemUID }: MoreFeatures) => {
  const { show, isMoreClick, toggleMoreClick, handleEdit, handleDelete } = useMoreFeatures(
    itemUID,
    () => {
      onEdit();
      toggleMoreClick(itemID);
    },
    () => {
      onDelete();
      toggleMoreClick(itemID);
    }
  );
  return (
    <FeatureBox show={show}>
      <MoreBtn onClick={() => toggleMoreClick(itemID)}>
        <StyleMore />
      </MoreBtn>
      <FeatureList $open={isMoreClick === itemID}>
        <FeatureItem>
          <FeatureInnerBtn onClick={handleEdit}>編輯</FeatureInnerBtn>
        </FeatureItem>
        <FeatureItem>
          <FeatureInnerBtn onClick={handleDelete}>刪除</FeatureInnerBtn>
        </FeatureItem>
      </FeatureList>
    </FeatureBox>
  );
};

export default MoreFeatures;
