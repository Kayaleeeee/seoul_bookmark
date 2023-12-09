import Axios, { AxiosInstance } from "axios";

const getBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  } else {
    return "https://steady-conkies-7a74ef.netlify.app/api";
  }
};

export const createAxiosClient = <Response = unknown>(): AxiosInstance => {
  const authorizationHeaderLoader = ():
    | undefined
    | { Authorization: string } => {
    const flag = true;

    if (flag) {
      return { Authorization: `Bearer ${123}` };
    }

    return undefined;
  };

  const axios = Axios.create({
    baseURL: getBaseURL(),
    headers: {
      ...authorizationHeaderLoader,
    },
  });

  return axios;
};

export const apiClient = createAxiosClient();
