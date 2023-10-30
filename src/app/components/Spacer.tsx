type Props = {
  space: string;
};

export const Spacer = ({ space }: Props) => {
  return (
    <div
      style={{
        width: space,
        height: space,
      }}
    />
  );
};
