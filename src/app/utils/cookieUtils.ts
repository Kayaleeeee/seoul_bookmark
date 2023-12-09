import { verifyJwt } from "@app/lib/jwtAuth";
import { cookies } from "next/headers";
import { apiClient } from "./apiUtils";

export const getAuthCookie = () => {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("accessToken")?.value;
  return authCookie;
};

export const validateAuthCookieStatus = (accessToken: string) => {
  if (!verifyJwt(accessToken)) return false;

  return true;
};

export const getUserInfoByToken = async (accessToken: string) => {
  const decodedUserInfo = verifyJwt(accessToken);

  if (!decodedUserInfo) return null;

  const { data } = await apiClient.get(`/user/${decodedUserInfo.id}`);
  return data;
};
