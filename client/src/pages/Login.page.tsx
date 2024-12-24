import { useState } from "react";
import LoginComp from "../components/LoginComp";
import VerifyCodeComp from "../components/VerifyCodeComp";

const Login = () => {
  const [isLogin, setisLogin] = useState<boolean>(false);
  return (
    <div>
      {!isLogin && <LoginComp statusFanc={setisLogin} />}
      {isLogin && <VerifyCodeComp statusFanc={setisLogin} />}
    </div>
  );
};

export default Login;
