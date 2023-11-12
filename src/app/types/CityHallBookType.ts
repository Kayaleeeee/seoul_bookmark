export type CityHallBookType = {
  title: string;
  detailurl: string;
  author: string;
  isAvailable: boolean;
  imageUrl: string | null;
};

export enum BookStatus {
  unavailable = "대출중",
  avaliable = "대출가능",
}
