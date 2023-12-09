export type KakaoUserType = {
  id: number;
  connected_at: string;
  kakao_account: {
    profile: {
      nickname: string;
      is_default_image: boolean;
      profile_image_url?: string;
      thumbnail_image?: string;
    };
  };
};
