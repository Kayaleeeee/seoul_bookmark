import { UserType } from "@app/types/Auth/UserType";
import { BookMarkType } from "@app/types/Bookmark/BookMarkType";
import {
  getAuthCookie,
  getUserInfoByToken,
  validateAuthCookieStatus,
} from "@app/utils/cookieUtils";

export const useUserInfo = async (): Promise<null | {
  user: UserType;
  bookmark: BookMarkType[];
}> => {
  const authCookie = await getAuthCookie();

  if (!authCookie) return null;
  if (!validateAuthCookieStatus(authCookie)) return null;

  const { data } = await getUserInfoByToken(authCookie);
  return data;
};
