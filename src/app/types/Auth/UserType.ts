export type UserType = {
  // id: string;
  name: string;
  profileImage?: string;
  oAuthType: "kakao";
  oAuthId: string;
  accessToken: string;
  refreshToken: string;
  registeredAt: string;
};
