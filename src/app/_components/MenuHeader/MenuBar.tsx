import Link from "next/link";
import "./menubar.css";
import { useRouter } from "next/navigation";

type Props = {
  closeMenu: () => void;
};

export const MenuBar = ({ closeMenu }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div className="overlay" onClick={closeMenu} />
      <div className="menubar">
        <div className="row" onClick={() => router.push("/mypage")}>
          마이페이지
        </div>
      </div>
    </div>
  );
};
