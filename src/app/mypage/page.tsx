import { Header } from "@app/_components/Header";
import { useUserInfo } from "@app/hooks/useUserInfo";
import Image from "next/image";
import { MyPageMenu } from "./MyPageMenu";

const MyPage = async () => {
  const userInfo = await useUserInfo();

  if (!userInfo) return null;

  return (
    <div className="w-full h-screen flex flex-col justify-between ">
      <Header />
      <div className="flex flex-col justify-center items-center mt-20">
        {userInfo.user.profileImage && (
          <div
            style={{
              width: 250,
              height: 250,
              position: "relative",
              borderRadius: "100%",
              overflow: "hidden",
            }}
          >
            <Image
              src={userInfo.user.profileImage}
              fill
              objectFit="cover"
              alt="profile image"
            />
          </div>
        )}

        <div className="mt-5 text-xl font-extrabold">{userInfo.user.name}</div>
        <div className="mt-1 mb-5 text-md">
          {new Date(userInfo.user.registeredAt).toLocaleDateString()} 가입
        </div>
      </div>
      <MyPageMenu userInfo={userInfo} />
    </div>
  );
};

export default MyPage;
