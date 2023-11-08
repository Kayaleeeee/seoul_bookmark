import Link from "next/link";
import { libraryList } from "./contants";

const Home = async () => {
  return (
    <div>
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <h1 className="appTitle">SEOUL BOOKMARK</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Object.entries(libraryList).map(([key, value]) => {
            return (
              <Link
                key={key}
                className="libraryLinkButton"
                href={value.path}
                style={{
                  background: value.color,
                }}
              >
                {value.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
