import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../utils/api";

const SignUpBox = styled.div<{ isLogin: boolean }>`
  width: 100%;
  flex-direction: column;
  row-gap: 15px;
  display: flex;
  display: ${(props) => (props.isLogin ? "none" : "flex")};
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
const Label = styled.label`
  font-size: 16px;
  line-height: 1.5;
  color: #000;
`;
const Require = styled.span`
  font-size: 16px;
  line-height: 1.5;
  color: #dc3131;
`;
const SignUpBtn = styled(Input)`
  margin-top: 30px;
`;

interface Props {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormInputs {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

function SignUp({ isLogin, setIsLogin }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const userName = await api.findUser(data.name);
    if (userName.length >= 1) {
      alert("用戶名已存在");
      return;
    }
    if (data.password !== data.checkPassword) {
      alert("請再次確認密碼");
      return;
    }
    const response = await api.userSignUp(data.email, data.password);
    console.log(response);
    if (response === "Firebase: Error (auth/email-already-in-use).") {
      alert("電子郵件已被使用");
      return;
    }
    if (response instanceof Object) {
      await api.setUser(data.name, response.user.uid);
      setIsLogin(true);
      alert("註冊成功");
    }
  };

  return (
    <SignUpBox isLogin={isLogin}>
      <Label>
        電子信箱<Require>*</Require>
        <Input type="email" placeholder="請輸入電子信箱" {...register("email", { required: "請輸入電子信箱" })} />
        {errors.email && <span>{errors.email.message}</span>}
      </Label>
      <Label>
        名稱<Require>*</Require>
        <Input type="text" placeholder="請輸入名稱" {...register("name", { required: "請輸入名稱" })} />
        {errors.name && <span>{errors.name.message}</span>}
      </Label>
      <Label>
        設定密碼<Require>*</Require>
        <Input type="password" placeholder="請輸入密碼" {...register("password", { required: "請輸密碼" })} />
        {errors.password && <span>{errors.password.message}</span>}
      </Label>
      <Label>
        確認密碼<Require>*</Require>
        <Input type="password" placeholder="請再次輸入密碼" {...register("checkPassword", { required: "請確認密碼" })} />
        {errors.checkPassword && <span>{errors.checkPassword.message}</span>}
      </Label>

      <SignUpBtn type="button" value="註冊" onClick={handleSubmit(onSubmit)} />
    </SignUpBox>
  );
}

export default SignUp;
