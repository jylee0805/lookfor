import styled from "styled-components";
import SignUp from "./SignUp";
import { useState } from "react";
import LogIn from "./Login";

const Container = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  height: calc(100vh - 80px);
`;
const Card = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: 32px 56px;
  //background: #b1b1b160;
  //box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  row-gap: 25px;
  margin: 0 auto;
  @media (max-width: 992px) {
    margin: 0 auto;
  }
  @media (max-width: 575px) {
    width: 90%;
    margin: 0 auto;
    padding: 32px 6%;

    row-gap: 10px;
  }
`;
const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
`;
const SelectBtn = styled.button<{ isSelect: boolean }>`
  display: block;
  flex-grow: 1;
  background: ${(props) => (props.isSelect ? "#dc724f" : "#e8e8e8")};
  color: ${(props) => (props.isSelect ? "#fff" : "#000")};
  border-radius: 10px 0 0 10px;
  font-weight: 600;
  border: none;
  @media (max-width: 575px) {
  }
`;
const SignUpBtn = styled(SelectBtn)`
  border-radius: 0 10px 10px 0;
`;

function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <Container>
      <Card>
        <ButtonGroup>
          <SelectBtn onClick={() => setIsLogin(true)} isSelect={isLogin === true}>
            Log In
          </SelectBtn>
          <SignUpBtn onClick={() => setIsLogin(false)} isSelect={isLogin === false}>
            Sign Up
          </SignUpBtn>
        </ButtonGroup>
        {isLogin ? <LogIn isLogin={isLogin} /> : <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />}
      </Card>
    </Container>
  );
}

export default Login;
