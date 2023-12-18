import Image from "next/image";
import { BookStatusBadge } from "./BookStatusBadge/BookStatusBadge";

type Props = {
  title: string;
  author: string;
  imageUrl: string | undefined | null;
  isAvailable: boolean;
  onClick?: () => void;
};

export const PictureBookListItem = ({
  imageUrl,
  title,
  author,
  isAvailable,
  onClick,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        aspectRatio: "0.7",
        background: "#fff",
        border: "1px solid black",
      }}
      onClick={onClick}
    >
      {!isAvailable && (
        <div
          style={{
            width: "100%",
            aspectRatio: "0.7",
            position: "absolute",
            top: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
            }}
          >
            <BookStatusBadge isAvailable={false} />
          </div>
        </div>
      )}

      {imageUrl ? (
        <Image fill src={imageUrl} alt={"book thumbnail"} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: "5px",
            }}
          >
            {title}
          </div>
          <div>{author}</div>
        </div>
      )}
    </div>
  );
};
