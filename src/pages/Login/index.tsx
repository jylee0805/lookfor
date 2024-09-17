import styled from "styled-components";
import SignUp from "./SignUp";
import { useState } from "react";
import LogIn from "./Login";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 40px 80px;
`;
const Card = styled.div`
  width: 530px;
  height: 670px;
  display: flex;
  flex-direction: column;
  padding: 32px 56px;
  background: #fff;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  border-radius: 20px;
  row-gap: 25px;
`;
const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
`;
const SelectBtn = styled.button`
  display: block;
  flex-grow: 1;
`;
const OrBox = styled.div`
  display: flex;
  align-items: center;
`;
const Or = styled.p`
  font-size: 20px;
  line-height: 1.5;
  color: #767676;
  margin: 0 8px;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #d2d2d2;
  flex-grow: 1;
`;
const GoogleBtn = styled.button``;

function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();
  const handlerGoogleLogin = async () => {
    const response = await api.userLogInGoogle();
    if (response?.user) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Card>
        <ButtonGroup>
          <SelectBtn onClick={() => setIsLogin(true)}>Log In</SelectBtn>
          <SelectBtn onClick={() => setIsLogin(false)}>Sign Up</SelectBtn>
        </ButtonGroup>
        <LogIn isLogin={isLogin} />
        <SignUp isLogin={isLogin} />
        <OrBox>
          <Line />
          <Or>or</Or>
          <Line />
        </OrBox>
        <GoogleBtn onClick={handlerGoogleLogin}>Login with Google</GoogleBtn>
      </Card>
    </Container>
  );
}

export default Login;
