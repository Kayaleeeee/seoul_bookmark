import mongoose from "mongoose";

export interface User extends mongoose.Document {
  name: string;
  profileImage: string;
  oAuthType: "kakao";
  oAuthId: string;
  accessToken: string;
  refreshToken: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the user"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    profileImage: {
      type: String,
    },
    oAuthId: {
      type: String,
      required: [true, "Please provide a oAuthId for the user"],
    },
    oAuthType: {
      type: String,
      required: [true, "Please provide a oAuthType for the user"],
    },
    accessToken: {
      type: String,
      required: [true, "Please provide a accessToken for the user"],
    },
    refreshToken: {
      type: String,
      required: [true, "Please provide a refreshToken for the user"],
    },
  },
  {
    collection: "user",
  }
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
