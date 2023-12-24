import { apiClient } from "./api/apiClient";

export const getIsLoginedFromClient = async () => {
  const { data } = await apiClient.get("/user/auth");
  return data.isLogined;
};
