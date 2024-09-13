import styled from "styled-components";
import SignUp from "./SignUp";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";

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
const LoginBox = styled.div<{ isLogin: boolean }>`
  width: 100%;
  display: ${(props) => (props.isLogin ? "flex" : "none")};
  flex-direction: column;
  row-gap: 25px;
  margin-top: 68px;
`;

const Input = styled.input`
  border-radius: 30px;
  background: #ededed;
  border: none;
  padding: 10px 20px;
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
`;

const LoginBtn = styled(Input)`
  margin-top: 20px;
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

interface FormInputs {
  email: string;
  password: string;
}

function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <Container>
      <Card>
        <ButtonGroup>
          <SelectBtn onClick={() => setIsLogin(true)}>Log In</SelectBtn>
          <SelectBtn onClick={() => setIsLogin(false)}>Sign Up</SelectBtn>
        </ButtonGroup>
        <LoginBox isLogin={isLogin}>
          <Input type="email" placeholder="請輸入電子信箱" defaultValue="" {...register("email", { required: "請輸入電子信箱" })} />
          {errors.email && <span>{errors.email.message}</span>}
          <Input type="password" placeholder="請輸入密碼" defaultValue="" {...register("password", { required: "請輸入密碼" })} />
          <LoginBtn type="button" value="登入" onClick={handleSubmit(onSubmit)} />
          {errors.password && <span>{errors.password.message}</span>}
        </LoginBox>
        <SignUp isLogin={isLogin} />
        <OrBox>
          <Line />
          <Or>or</Or>
          <Line />
        </OrBox>
        <GoogleBtn>Login with Google</GoogleBtn>
      </Card>
    </Container>
  );
}

export default Login;
