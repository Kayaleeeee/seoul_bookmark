import Link from "next/link";
import { libraryList } from "./contants";
import { MenuHeader } from "./_components/MenuHeader/MenuHeader";

const Home = () => {
  return (
    <div className="flex flex-col p-4 h-full">
      <MenuHeader hasGoBack={false} />
      <div className="flex flex-col grow mb-4 flex-1">
        <h1 className="appTitle my-16">SEOUL BOOKMARK</h1>
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
      </div>
      <footer className="flex justify-center">
        문의:
        <a className="ml-1" href="mailTo:gayeon71057@gmail.com">
          gayeon71057@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Home;
