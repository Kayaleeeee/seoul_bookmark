export const getBaseRequestUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/api";
  } else {
    return "https://seoul-bookmark.netlify.app/api";
  }
};
