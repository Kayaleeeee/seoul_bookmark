import {
  getAuthCookie,
  validateAuthCookieStatus,
} from "@app/utils/cookieUtils";

export const getIsLogined = () => {
  const authCookie = getAuthCookie();

  if (!authCookie) return false;
  if (!validateAuthCookieStatus(authCookie)) return false;

  return true;
};
