import { ListModeType } from "../../types/ListTypeMode";

type Props = {
  currentMode: ListModeType;
  onChangeMode: (mode: ListModeType) => void;
};

export const ListModeFilter = ({ currentMode, onChangeMode }: Props) => {
  const listModeList: { title: string; key: ListModeType }[] = [
    {
      title: "줄글",
      key: "text",
    },
    { title: "사진", key: "picture" },
  ];

  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: "20px",
        border: "1px solid black",
        overflow: "hidden",
      }}
    >
      {listModeList.map((item) => {
        return (
          <div
            key={item.key}
            onClick={() => onChangeMode(item.key)}
            style={{
              width: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              backgroundColor:
                currentMode === item.key ? "black" : "transparent",
              color: currentMode === item.key ? "white" : "black",
            }}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};
