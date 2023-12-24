import { KakaoUserType } from "@app/types/Auth/KakaoUserType";
import { apiClient } from "@app/lib/api/apiClient";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useCase_register_user = () => {
  const router = useRouter();
  return useCallback(
    async (kakaoUserInfo: KakaoUserType) => {
      await apiClient.post("/user/register", {
        name: kakaoUserInfo.kakao_account.profile.nickname,
        profileImage: kakaoUserInfo.kakao_account.profile?.profile_image_url,
        kakaoId: kakaoUserInfo.id,
      });
      router.push("/");
    },
    [router]
  );
};
