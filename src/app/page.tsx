import axios from "axios";
import Image from "next/image";

const Home = async () => {
  const list = await axios
    .post(
      "https://smartlib.mapo.go.kr:9525/api/book/getBookList?pageIdx=1&pageSize=15&smartlib=1&"
    )
    .then(({ data }) => {
      console.log(data);
      return data.SemaPsgudInfoEngInfo.row;
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <>
      <div
        style={{
          marginBottom: "16px",
        }}
      >
        <h1 className="appTitle">서울 북마크</h1>
        {/* {list.map((item: any) => {
          return (
            <Image
              key={item.prdct_nm_korean}
              src={item.thumb_image}
              width={"100"}
              height={"100"}
              alt={item.prdct_nm_korean}
            />
          );
        })} */}
      </div>
    </>
  );
};

export default Home;
