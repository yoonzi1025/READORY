import { useEffect, useState } from "react";
import "./Book.css";
import BookInfo from "./BookInfo";
import { RecordStateContext } from "../../context/records/RecordProvider";

const BookList = ({ bookId }) => {
  // 책 정보 기준
  const [books, setBooks] = useState([]);
  const [sortType, setSortType] = useState("oldest");

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  useEffect(() => {
    // ✅ 지금은 임시 데이터(나중에 API로 교체)
    setBooks([
      {
        bookId: "1",
        title: "모순",
        author: "양귀자",
        cover:
          "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80",
        publishedAt: "1998",
      },
      {
        bookId: "2",
        title: "구원에게",
        author: "정영욱",
        cover:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&q=80",
        publishedAt: "2020",
      },
    ]);
  }, []);

  const getSortedDate = () => {
    return books.toSorted((a, b) => {
      if (sortType === "oldest")
        return Number(a.createdDate) - Number(b.createdDate);
      if (sortType === "latest")
        return Number(b.createdDate) - Number(a.createdDate);
      if (sortType === "rating") return Number(b.rating) - Number(a.rating);
      if (sortType === "title") return a.title.localeCompare(b.title);
    });
  };

  const sortedData = getSortedDate();

  return (
    <section className="book-list">
      <div className="menu-bar">
        <select
          className="sort-select"
          value={sortType}
          onChange={onChangeSortType}
        >
          <option value="oldest">오래된순</option>
          <option value="latest">최신순</option>
          <option value="rating">평점순</option>
          <option value="title">제목순</option>
        </select>
      </div>
      <div className="list-wrapper">
        {sortedData.map((book) => (
          <BookInfo key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
