import Image from "next/image";
import { Header } from "../Header";
import { Spacer } from "../Spacer";
import { BookStatusBadge } from "../BookStatusBadge/BookStatusBadge";

type Props = {
  author: string;
  title: string;
  publisher: string;
  isAvailable: boolean;
  imageUrl: string;
  description: string;
};
export const BookContentDetail = ({
  author,
  title,
  isAvailable,
  publisher,
  imageUrl,
  description,
}: Props) => {
  return (
    <>
      <div className="h-20">
        <Header>
          <Spacer space="40px" />
        </Header>
      </div>
      <div className="flex justify-center relative">
        <div
          className="rounded-lg shadow-md relative"
          style={{
            width: "180px",
            height: "250px",
            zIndex: 2,
          }}
        >
          <Image
            className="rounded-lg"
            fill
            src={imageUrl}
            alt={"book thumbnail"}
            unoptimized
          />
        </div>
        <div className="detailBookContent">
          <div className="text-center text-xl font-medium">{title}</div>
          <Spacer space="1rem" />

          <div className="text-center font-medium">
            <div>{author}</div>
            <div>{publisher}</div>
          </div>
          <Spacer space="1rem" />

          <div className="flex justify-center">
            <BookStatusBadge isAvailable={isAvailable} />
          </div>
          <Spacer space="1rem" />

          <div>{description}</div>
        </div>
      </div>
    </>
  );
};
