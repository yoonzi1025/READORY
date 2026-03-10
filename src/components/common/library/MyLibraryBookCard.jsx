import StatusBadge from "../status/StatusBadge";
import "./MyLibraryBookCard.css";

const MyLibraryBookCard = ({ filterBooks, onClickBookCard }) => {
  return (
    <div className="library-book-wrapper">
      <div className="library-book">
        {filterBooks.map((book) => (
          <div
            className="library-book-card"
            key={book.id}
            onClick={() => onClickBookCard(book)}
          >
            <div className="library-book-cover">
              <img src={book.cover} alt="책 이미지" />
            </div>

            <div className="library-book-content">
              <h3 className="library-book-title">{book.title}</h3>
              <p className="library-book-author">{book.author}</p>
              <p className="book-info">{book.summary}</p>
            </div>
            <StatusBadge status={book.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLibraryBookCard;
