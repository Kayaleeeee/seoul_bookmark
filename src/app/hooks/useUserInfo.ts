import { UserType } from "@app/types/Auth/UserType";
import { BookType } from "@app/types/Bookmark/BookType";
import {
  getAuthCookie,
  getUserInfoByToken,
  validateAuthCookieStatus,
} from "@app/utils/cookieUtils";

export const useUserInfo = async (): Promise<null | {
  user: UserType;
  bookmark: BookType[];
}> => {
  const authCookie = await getAuthCookie();

  if (!authCookie) return null;
  if (!validateAuthCookieStatus(authCookie)) return null;

  const { data } = await getUserInfoByToken(authCookie);
  return data;
};
