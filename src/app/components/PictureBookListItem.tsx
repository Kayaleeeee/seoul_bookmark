import Image from "next/image";

type Props = {
  title: string;
  author: string;
  imageUrl: string | undefined | null;
  isAvailable: boolean;
};

export const PictureBookListItem = ({
  imageUrl,
  title,
  author,
  isAvailable,
}: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: "100%",
        aspectRatio: "0.7",
        boxShadow: "1px 4px 15px 0px rgba(196, 196, 196, 1)",
        borderRadius: 8,
      }}
    >
      {!isAvailable && (
        <div
          style={{
            width: "100%",
            aspectRatio: "0.7",
            position: "absolute",
            top: 0,
            borderRadius: 8,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: "13px",
              color: "white",
              fontWeight: 500,
              background: "black",
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            대출불가
          </span>
        </div>
      )}

      {imageUrl ? (
        <Image
          fill
          src={imageUrl}
          style={{
            borderRadius: 8,
          }}
          alt={"book thumbnail"}
        />
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
