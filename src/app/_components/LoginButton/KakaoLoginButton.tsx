"use client";

import { useCase_request_kakao_login } from "@app/login/usecases/useCase_request_kakao_login";
import Image from "next/image";

export const KakaoLoginButton = () => {
  const request_kakao_login = useCase_request_kakao_login();

  return (
    <div className="loginButtonWrapper">
      <Image
        onClick={request_kakao_login}
        src={"/img/kakao_login_large_wide.png"}
        fill
        alt="카카오 로그인"
      />
    </div>
  );
};
