import { MenuHeader } from "@app/_components/MenuHeader/MenuHeader";
import { KakaoLoginButton } from "@app/_components/LoginButton/KakaoLoginButton";

const LoginPage = () => {
  return (
    <div className="p-4 w-full h-screen flex flex-col justify-between">
      <MenuHeader />
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="appTitle">SEOUL BOOKMARK</h1>
        <div className="text-2xl m-1">로그인하고 계속하기</div>
      </div>
      <KakaoLoginButton />
    </div>
  );
};

export default LoginPage;
