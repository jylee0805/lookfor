import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import api from "../../utils/api";
import { AuthContext } from "../../utils/AuthContextProvider";

const SignUpBox = styled.div<{ $isLogin: boolean }>`
  width: 100%;
  flex-direction: column;
  row-gap: 15px;
  display: flex;
  display: ${(props) => (props.$isLogin ? "none" : "flex")};
  margin-top: 15px;
`;
const Label = styled.label`
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
`;
const Require = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: #dc3131;
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
`;
const SignUpBtn = styled(Input)`
  margin-top: 30px;
`;
const Error = styled.span`
  color: #ff6262;
  display: block;
  margin-top: 5px;
  font-weight: 600;
`;
const SuccessHint = styled.p`
  position: absolute;
  top: 80px;
  left: 50%;
  line-height: 2;
  transform: translateX(-50%);
  background: #fff;
  color: #000;
  font-weight: 700;
  width: 100px;
  border-radius: 50px;
  text-align: center;
`;

type Props = {
  isLogin: boolean;
};

type FormInputs = {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
};

function SignUp({ isLogin }: Props) {
  const authContext = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
    setFocus,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const userName = await api.findUser(data.name);
    if (userName.length >= 1) {
      setError("name", {
        type: "manual",
        message: "用戶名已存在",
      });
      return;
    }
    if (data.password !== data.checkPassword) {
      setError("checkPassword", {
        type: "manual",
        message: "請再次確認密碼",
      });
      return;
    }
    const response = await api.userSignUp(data.email, data.password);

    if (response === "Firebase: Error (auth/email-already-in-use).") {
      setError("email", {
        type: "manual",
        message: "電子郵件已被使用",
      });
      return;
    }
    if (response instanceof Object) {
      await api.setUser(
        data.name,
        response.user.uid,
        "https://firebasestorage.googleapis.com/v0/b/look-for-18287.appspot.com/o/images%2Fprofile.png?alt=media&token=e5653560-c959-4f42-a741-a30794521275"
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        authContext?.setLoginState(response.user.uid);
      }, 2000);
    }
  };

  const handlerKeyDown = (e: React.KeyboardEvent, nextFieldName: keyof FormInputs | null) => {
    const currentValue = getValues();

    if (e.keyCode === 13) {
      switch (nextFieldName) {
        case "name": {
          const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
          if (!regex.test(currentValue.email)) {
            setError("email", {
              type: "manual",
              message: "請輸入有效的電子郵件",
            });
            return;
          }
          clearErrors("email");
          setFocus(nextFieldName);
          break;
        }
        case "password": {
          if (errors["name"]) {
            return;
          }
          clearErrors("name");
          setFocus(nextFieldName);
          break;
        }
        case "checkPassword": {
          if (errors["password"]) {
            return;
          }

          clearErrors("password");
          setFocus(nextFieldName);
          break;
        }
        case null: {
          if (currentValue.password !== currentValue.checkPassword) {
            setError("checkPassword", {
              type: "manual",
              message: "請再次確認密碼",
            });
            return;
          }
          clearErrors("checkPassword");
          handleSubmit(onSubmit)(e);
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const handleBlur = () => {
    const currentValue = getValues();
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!regex.test(currentValue.email)) {
      setError("email", {
        type: "manual",
        message: "請輸入有效的電子郵件",
      });
      return;
    }
  };
  return (
    <SignUpBox $isLogin={isLogin}>
      {success && <SuccessHint>註冊成功</SuccessHint>}
      <Label>
        電子信箱<Require>*</Require>
        <Input
          type="email"
          placeholder="請輸入電子信箱"
          {...register("email", {
            required: "請輸入電子信箱",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "請輸入有效的電子郵件",
            },
          })}
          onKeyDown={(e) => handlerKeyDown(e, "name")}
          onBlur={() => handleBlur()}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </Label>
      <Label>
        名稱<Require>*</Require>
        <Input
          type="text"
          placeholder="請輸入名稱"
          {...register("name", {
            required: "請輸入名稱",
            maxLength: {
              value: 12,
              message: "名稱最多12字",
            },
          })}
          onKeyDown={(e) => handlerKeyDown(e, "password")}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </Label>
      <Label>
        設定密碼<Require>*</Require>
        <Input
          type="password"
          placeholder="請輸入密碼"
          {...register("password", {
            required: "請輸密碼",
            minLength: {
              value: 6,
              message: "密碼最少六位數",
            },
          })}
          onKeyDown={(e) => handlerKeyDown(e, "checkPassword")}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
      </Label>
      <Label>
        確認密碼<Require>*</Require>
        <Input type="password" placeholder="請再次輸入密碼" {...register("checkPassword", { required: "請確認密碼" })} onKeyDown={(e) => handlerKeyDown(e, null)} />
        {errors.checkPassword && <Error>{errors.checkPassword.message}</Error>}
      </Label>

      <SignUpBtn type="button" value="註冊" onClick={handleSubmit(onSubmit)} />
    </SignUpBox>
  );
}

export default SignUp;
