export type CityHallBookType = {
  id: string;
  title: string;
  detailUrl: string;
  author: string;
  isAvailable: boolean;
  imageUrl: string | null;
};

export type CityHallBookDetailType = {
  id: string;
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
