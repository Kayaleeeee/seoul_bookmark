import { apiClient } from "@app/lib/api/apiClient";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useCase_login_user = () => {
  const router = useRouter();

  return useCallback(
    async (id: number) => {
      try {
        await apiClient.post("/user/login", {
          id,
        });
        router.push("/");
        toast.success("로그인되었습니다");
      } catch {
        toast.error("로그인에 실패했습니다");
      }
    },
    [router]
  );
};
