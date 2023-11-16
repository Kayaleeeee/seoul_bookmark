import { BookStatusBadge } from "./BookStatusBadge/BookStatusBadge";
import { Spacer } from "./Spacer";

type Props = {
  isAvailable: boolean;
  title: string;
  author: string;
  onClick?: () => void;
};

export const TextBooktListItem = ({
  isAvailable,
  title,
  author,
  onClick,
}: Props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "inline-flex",
        justifyContent: "space-between",
        padding: "10px 16px",
        boxShadow: "1px 4px 10px 0px rgba(196, 196, 196, 1)",
        borderRadius: "6px",
        marginBottom: "16px",
        minHeight: "90px",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <BookStatusBadge isAvailable={isAvailable} />
        <Spacer space="5px" />
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
    </div>
  );
};
