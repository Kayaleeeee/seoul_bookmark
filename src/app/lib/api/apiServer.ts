"use server";

import Axios, { AxiosInstance } from "axios";
import { getBaseRequestUrl } from "./getBaseRequestUrl";
import { getAuthCookie } from "@app/utils/cookieUtils";

export const createAxiosInstance = <Response = unknown>(): AxiosInstance => {
  const axios = Axios.create({
    baseURL: getBaseRequestUrl(),

    withCredentials: true,
  });

  axios.interceptors.request.use(
    (config) => {
      const cookie = getAuthCookie();

      if (cookie) {
        config.headers["Cookie"] = `accessToken=${cookie}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axios;
};

export const apiServer = createAxiosInstance();
