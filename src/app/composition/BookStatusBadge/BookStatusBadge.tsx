import "./bookStatusBadge.css";

type Props = {
  isAvailable: boolean;
};

export const BookStatusBadge = ({ isAvailable }: Props) => {
  return (
    <div
      className={`bookStatusBadge ${isAvailable ? "available" : "unAvailable"}`}
    >
      {isAvailable ? "대출가능" : "대출불가"}
    </div>
  );
};
