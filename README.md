# Seoul Bookmark

[**Seoul Bookmark**](https://seoul-bookmark.netlify.app)는 

지하철역에 있는 스마트 도서관 책 저장소를 모아볼 수 있는 곳이다

스마트 도서관에 도착전에 무슨 책을 빌릴지 결정하고 싶은 마음 급한 사람들을 위한 서비스

##
### 주요 기술 스택

- **NextJS**
    - App은 너무 무겁고, web site로 만들고자 함
    - 스마트 도서관 도서목록은 정부에서 따로 API 제공하지 않아 도서관마다 페이지 구성이랑 데이터 구성이 제각각이다. Next Js API에서 cors를 피해서 크롤링 하고자함

- **MongoDB**
    - 간단한 유저 정보와 북마크 정보를 저장하기 위해 몽고디비 사용 

