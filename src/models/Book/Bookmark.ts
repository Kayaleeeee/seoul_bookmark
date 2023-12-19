import mongoose from "mongoose";

export interface Bookmark extends mongoose.Document {
  id: string;
  title: string;
  author: string;
  imageUrl: string | undefined;
  location: string;
  userId: string;
  isAvailable?: boolean;
}

const Bookmark = new mongoose.Schema<Bookmark>(
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
    userId: { type: String, required: [true, "UserId is required"] },
  },
  {
    collection: "bookmark",
  }
);

export default mongoose.models.Bookmark ||
  mongoose.model<Bookmark>("Bookmark", Bookmark);
