import { useNavigate, useParams } from "react-router-dom";
import "./Book.css";

const BookInfo = () => {
  const param = useParams();
  const nav = useNavigate();
  return (
    <section
      className="book-card"
      onClick={() => nav(`../../books/${param.bookId}`)}
    >
      {/* 책 표지 */}
      <div className="book-cover">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80"
          alt="책 이미지"
        />
      </div>
      {/* 정보 */}
      <div className="book-content">
        <h3 className="book-title">모순</h3>
        <p className="book-author">양귀자</p>
        <p className="book-info">책 정보</p>
      </div>
      <div className="book-more">
        <button className="more-btn">더 보기</button>
      </div>
    </section>
  );
};

export default BookInfo;
