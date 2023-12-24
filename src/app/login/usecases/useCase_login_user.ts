import { apiClient } from "@app/lib/api/apiClient";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useCase_login_user = () => {
  const router = useRouter();

  return useCallback(
    async (id: number) => {
      await apiClient.post("/user/login", {
        id,
      });
      router.push("/");
    },
    [router]
  );
};
