export type HapjeongBookListItemType = {
  book_no: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  rfid: string;
  class_no: string;
  book_code: string;
  loan_count: string;
  insert_date: string;
  state: string;
  state_nm: "대출가능" | "대출중";
  user_key: string;
  loan_date: string;
  return_plan_date: string;
};

export type HapjeongBookDetailType = {
  book_no: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  rfid: string;
  class_no: string;
  book_code: string;
  state: BookStatus;
  state_nm: string;
  user_key: string;
  image_url: string;
  description: string;
  publication_date: string;
};

export enum BookStatus {
  unavailable = 0,
  avaliable = 1,
}
