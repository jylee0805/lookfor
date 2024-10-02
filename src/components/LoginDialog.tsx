import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ComponentContext } from "../utils/ComponentContextProvider";
import { useContext } from "react";

const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;

  width: 360px;
  height: 140px;
  background: #fff;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
  transform: translate(-50%, -50%);
  border: 1px solid #d2d2d2;
  border-radius: 15px;
`;
const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 20px;
  color: #000;
`;
const BtnBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
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

function LoginDialog() {
  const navigate = useNavigate();
  const componentContext = useContext(ComponentContext);
  const handleBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.value === "cancel") {
      componentContext?.setIsDialogOpen(false);
      document.body.style.overflow = "scroll";
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <Container isOpen={componentContext?.isDialogOpen ?? false}>
        <Title>您尚未登入</Title>
        <BtnBox>
          <CancelBtn onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleBtn(e)} value="cancel">
            暫時不要
          </CancelBtn>
          <Btn onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleBtn(e)} value="toLogin">
            前往登入
          </Btn>
        </BtnBox>
      </Container>
    </>
  );
}

export default LoginDialog;
