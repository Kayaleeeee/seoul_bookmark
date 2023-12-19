import mongoose from "mongoose";

export interface Book extends mongoose.Document {
  id: string;
  title: string;
  author: string;
  imageUrl: string | undefined;
  location: string;
  isAvailable?: boolean;
}

const BookScheme = new mongoose.Schema<Book>(
  {
    id: {
      type: String,
      required: [true, "Book id is required"],
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Book authore is required"],
    },
    location: {
      type: String,
      required: [true, "Location is requried"],
    },
    imageUrl: {
      type: String,
      required: [false],
    },
    isAvailable: {
      type: Boolean,
      required: [false],
    },
  },
  {
    collection: "bookmark",
  }
);

export default mongoose.models.Book || mongoose.model<Book>("Book", BookScheme);
