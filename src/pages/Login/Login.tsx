import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContextProvider";

const LoginBox = styled.div<{ isLogin: boolean }>`
  width: 100%;
  display: ${(props) => (props.isLogin ? "flex" : "none")};
  flex-direction: column;
  row-gap: 25px;
  margin-top: 50px;
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
  @media (max-width: 575px) {
    font-size: 14px;
  }
`;

const LoginBtn = styled(Input)`
  margin-top: 20px;
`;

interface Props {
  isLogin: boolean;
}

interface FormInputs {
  email: string;
  password: string;
}

function LogIn({ isLogin }: Props) {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const response = await api.userLogIn(data.email, data.password);
    console.log(response);
    if (response === "Firebase: Error (auth/invalid-credential).") {
      alert("帳號或密碼有誤");
      return;
    } else if (response === "Firebase: Error (auth/invalid-email).") {
      alert("無效的 mail");
      return;
    }

    authContext?.setLoginState(response.uid as string);
    navigate("/");
  };

  return (
    <LoginBox isLogin={isLogin}>
      <Input type="email" placeholder="請輸入電子信箱" defaultValue="" {...register("email", { required: "請輸入電子信箱" })} />
      {errors.email && <span>{errors.email.message}</span>}
      <Input type="password" placeholder="請輸入密碼" defaultValue="" {...register("password", { required: "請輸入密碼" })} />
      <LoginBtn type="button" value="登入" onClick={handleSubmit(onSubmit)} />
      {errors.password && <span>{errors.password.message}</span>}
    </LoginBox>
  );
}

export default LogIn;
