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
  font-size: 1rem;
  line-height: 1.5;
  @media (max-width: 575px) {
  }
`;

const LoginBtn = styled(Input)`
  margin-top: 20px;
`;
const Error = styled.span`
  margin-top: -20px;
  color: #ff6262;
`;

const OrBox = styled.div`
  display: flex;
  align-items: center;
`;
const Or = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #ffffff;
  margin: 0 8px;
  @media (max-width: 575px) {
  }
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #d2d2d2;
  flex-grow: 1;
`;
const GoogleBtn = styled.button`
  display: block;
  width: 100%;
  background: #ffffff;
  @media (max-width: 575px) {
  }
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
    setFocus,
    formState: { errors },
    setError,
    getValues,
    clearErrors,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const response = await api.userLogIn(data.email, data.password);
    console.log(response);
    if (response === "Firebase: Error (auth/invalid-credential).") {
      setError("password", {
        type: "manual",
        message: "帳號或密碼有誤",
      });
      return;
    } else if (response === "Firebase: Error (auth/invalid-email).") {
      setError("email", {
        type: "manual",
        message: "無效的 mail",
      });
      return;
    }

    if (typeof response !== "string" && response.uid) {
      authContext?.setLoginState(response.uid);
    }
    navigate("/");
  };

  const handlerKeyDown = (e: React.KeyboardEvent, nextFieldName: keyof FormInputs | null) => {
    const currentValue = getValues();
    console.log(e.currentTarget);

    if (e.keyCode === 13) {
      if (nextFieldName) {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!regex.test(currentValue.email)) {
          setError("email", {
            type: "manual",
            message: "請輸入正確的電子郵件",
          });
          return; // Exit if validation fails
        }
        clearErrors();
        setFocus(nextFieldName);
      } else {
        handleSubmit(onSubmit)(e);
      }
    }
  };
  const handlerGoogleLogin = async () => {
    const response = await api.userLogInGoogle();

    if (response) {
      authContext?.setLoginState(response as string);
      navigate("/");
    }
  };
  return (
    <LoginBox isLogin={isLogin}>
      <Input
        type="email"
        placeholder="請輸入電子信箱"
        defaultValue=""
        {...register("email", {
          required: "請輸入電子信箱",
          pattern: {
            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            message: "請輸入正確的電子郵件",
          },
        })}
        onKeyDown={(e) => handlerKeyDown(e, "password")}
      />
      {errors.email && <Error>{errors.email.message}</Error>}
      <Input type="password" placeholder="請輸入密碼" defaultValue="" {...register("password", { required: "請輸入密碼" })} onKeyDown={(e) => handlerKeyDown(e, null)} />
      {errors.password && <Error>{errors.password.message}</Error>}
      <LoginBtn type="button" value="登入" onClick={handleSubmit(onSubmit)} />

      <OrBox>
        <Line />
        <Or>or</Or>
        <Line />
      </OrBox>
      <GoogleBtn onClick={handlerGoogleLogin}>Login with Google</GoogleBtn>
    </LoginBox>
  );
}

export default LogIn;
