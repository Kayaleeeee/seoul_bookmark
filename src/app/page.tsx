import Link from "next/link";
import { libraryList } from "./contants";

const Home = () => {
  return (
    <div className="h-full p-4">
      <div className="flex flex-col grow h-full mb-4">
        <h1 className="appTitle">SEOUL BOOKMARK</h1>
        <div className="flex flex-col basis-full">
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
        <footer className="flex justify-center">
          문의:
          <a className="ml-1" href="mailTo:gayeon71057@gmail.com">
            gayeon71057@gmail.com
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Home;
