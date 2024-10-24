import styled from "styled-components";

const Mask = styled.div`
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
const Container = styled.div`
  flex-direction: column;
  padding: 20px;
  width: 400px;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, -50%);
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  color: #000;
`;
const Title = styled.p`
  font-size: 1.2rem;
  color: #000;
  margin-bottom: 15px;
  font-weight: 700;
`;
const BtnBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`;
const Btn = styled.button`
  display: block;
  padding: 8px 15px;
  background: #1e1e1e;
  color: #fff;
  font-weight: 700;
`;
const CancelBtn = styled.button`
  display: block;
  padding: 8px 15px;
  background: #f5f5f5;
  color: #090909;
`;

type DialogProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  children: React.ReactNode;
};

const Dialog = ({ isOpen, onCancel, onConfirm, title, confirmText, children }: DialogProps) => {
  if (!isOpen) return null;
  return (
    <>
      <Mask />
      <Container>
        <Title>{title}</Title>
        {children}
        <BtnBox>
          <CancelBtn onClick={onCancel}>取消</CancelBtn>
          <Btn onClick={onConfirm}>{confirmText}</Btn>
        </BtnBox>
      </Container>
    </>
  );
};

export default Dialog;
