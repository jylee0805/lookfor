import styled from "styled-components";

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
}

function SignUp({ isLogin }: Props) {
  return (
    <SignUpBox isLogin={isLogin}>
      <Label>
        名稱<Require>*</Require>
        <Input type="text" placeholder="請輸入名稱" />
      </Label>
      <Label>
        電子信箱<Require>*</Require>
        <Input type="email" placeholder="請輸入電子信箱" />
      </Label>
      <Label>
        設定密碼<Require>*</Require>
        <Input type="password" placeholder="請輸入密碼" />
      </Label>
      <Label>
        確認密碼<Require>*</Require>
        <Input type="password" placeholder="請再次輸入密碼" />
      </Label>

      <SignUpBtn type="button" value="註冊" />
    </SignUpBox>
  );
}

export default SignUp;
