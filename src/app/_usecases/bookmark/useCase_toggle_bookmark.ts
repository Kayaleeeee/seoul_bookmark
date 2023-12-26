import { apiClient } from "@app/lib/api/apiClient";
import { getIsLoginedFromClient } from "@app/lib/getIsLoginedFromClient";
import { BookMarkType } from "@app/types/Bookmark/BookMarkType";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "react-toastify";

export const useCase_toggle_bookmark = (
  setIsSaved: Dispatch<SetStateAction<boolean>>
) => {
  const router = useRouter();

  return useCallback(
    async (book: BookMarkType, isSaved: boolean) => {
      const isLogined = await getIsLoginedFromClient();

      if (!isLogined) {
        router.push("/login");
        return;
      }

      if (isSaved) {
        try {
          await apiClient.delete(`/user/bookmark/${book.id}`);
          setIsSaved(false);
          toast.success("북마크에서 제거했습니다 ✂️");
        } catch {
          toast.error("북마크 삭제에 실패했습니다 🥺");
        }
      } else {
        try {
          await apiClient.post("/user/bookmark", { book });
          setIsSaved(true);
          toast.success("북마크에 추가되었습니다 📚");
        } catch {
          toast.error("북마크 추가에 실패했습니다 🥺");
        }
      }
    },
    [setIsSaved, router]
  );
};
