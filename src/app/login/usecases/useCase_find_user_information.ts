import { apiClient } from "@app/lib/api/apiClient";
import { useCallback } from "react";

export const useCase_find_user_information = () => {
  return useCallback(async (id: number) => {
    await apiClient.get(`/user/${id}`);
  }, []);
};
