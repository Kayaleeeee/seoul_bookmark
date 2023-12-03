export type CityHallBookType = {
  title: string;
  detailUrl: string;
  author: string;
  isAvailable: boolean;
  imageUrl: string | null;
};

export type CityHallBookDetailType = {
  author: string;
  title: string;
  publisher: string;
  isAvailable: boolean;
  imageUrl: string;
  description: string;
};

export enum BookStatus {
  unavailable = "대출중",
  avaliable = "대출가능",
}
