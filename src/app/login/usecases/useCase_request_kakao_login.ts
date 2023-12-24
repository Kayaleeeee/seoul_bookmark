import axios from "axios";
import { useCallback } from "react";
import { useCase_find_user_information } from "./useCase_find_user_information";
import { useCase_login_user } from "./useCase_login_user";
import { KakaoUserType } from "@app/types/Auth/KakaoUserType";
import { useCase_register_user } from "./useCase_register_user";

const KAKAO_WEB_REST_API_KEY = "dc83b359b94b05fa64e46621aded4a0a";
const KAKAO_WEB_CALLBACK_URL = `${process.env.domain}/login/kakaoOauthCallback`;

const loginWithKakao = (code: string) => {
  return axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_WEB_REST_API_KEY}&redirect_uri=${KAKAO_WEB_CALLBACK_URL}&code=${code}`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const getUserInformation = (
  accessToken: string
): Promise<{
  data: KakaoUserType;
}> => {
  return axios.post(`https://kapi.kakao.com/v2/user/me`, undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
};

const getKakaoOAuthCode = () => {
  return new Promise<string>((resolve, reject) => {
    const childWindow = window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_WEB_REST_API_KEY}&redirect_uri=${KAKAO_WEB_CALLBACK_URL}&response_type=code&prompt=login`
    );

    const handleOnMessage = (
      event: MessageEvent<{ source: string; payload: string }>
    ) => {
      if (!("source" in event.data)) return;
      if (event.data.source !== "LoginKakaoOAuthCallback") return;
      window.removeEventListener("message", handleOnMessage);
      window.clearInterval(intervalId);
      resolve(event.data.payload);
    };

    const checkChildWindowClosed = () => {
      if (childWindow && !childWindow.closed) return;
      window.removeEventListener("message", handleOnMessage);
      window.clearInterval(intervalId);
      reject();
    };

    window.addEventListener("message", handleOnMessage);
    const intervalId = window.setInterval(checkChildWindowClosed, 500);
  });
};

export const useCase_request_kakao_login = () => {
  const findUserInformation = useCase_find_user_information();
  const loginUser = useCase_login_user();
  const registerUser = useCase_register_user();

  return useCallback(async () => {
    const accessToken = await getKakaoOAuthCode();

    if (!accessToken) return;

    const { data } = await loginWithKakao(accessToken);
    const userInfo = await getUserInformation(data.access_token);

    try {
      if (!userInfo) return;

      await findUserInformation(userInfo.data.id);
      loginUser(userInfo.data.id);
    } catch (e) {
      //회원가입
      registerUser(userInfo.data);
    }
  }, [findUserInformation, loginUser, registerUser]);
};
