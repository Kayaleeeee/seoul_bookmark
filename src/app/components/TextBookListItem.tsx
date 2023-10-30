type Props = {
  isAvailable: boolean;
  title: string;
  author: string;
};

export const TextBooktListItem = ({ isAvailable, title, author }: Props) => {
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
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "white",
            fontWeight: 500,
            background: isAvailable ? "#1cd06d" : "black",
            padding: "3px 10px",
            borderRadius: 20,
            marginBottom: "5px",
          }}
        >
          {isAvailable ? "대출가능" : "대출불가"}
        </span>
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
