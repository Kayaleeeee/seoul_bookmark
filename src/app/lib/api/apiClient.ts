import Axios, { AxiosInstance } from "axios";
import { getBaseRequestUrl } from "./getBaseRequestUrl";

export const createAxiosInstance = <Response = unknown>(): AxiosInstance => {
  const axios = Axios.create({
    baseURL: getBaseRequestUrl(),
    withCredentials: true,
  });

  return axios;
};

export const apiClient = createAxiosInstance();
