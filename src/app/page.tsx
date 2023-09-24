import Link from "next/link";

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
          <Link
            className="libraryLinkButton"
            href={"/cityhall"}
            style={{
              background: "#ffe438",
            }}
          >
            시청역 스마트 도서관
          </Link>
          <Link
            className="libraryLinkButton"
            href={"/dapsimni"}
            style={{
              background: "#1cd06d",
            }}
          >
            답십리 스마트 도서관
          </Link>
          <Link
            className="libraryLinkButton"
            href={"/hapjeong"}
            style={{
              background: "#ee803f",
            }}
          >
            합정역 스마트 도서관
          </Link>
          <Link
            className="libraryLinkButton"
            href={"/yongdu"}
            style={{
              background: "#7386fc",
            }}
          >
            용두역 스마트 도서관
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
