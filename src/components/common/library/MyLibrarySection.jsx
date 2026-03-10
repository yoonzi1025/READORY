import MyLibraryBookCard from "./MyLibraryBookCard";
import "./MyLibrarySection.css";

const MyLibrarySection = ({ filterBooks, onClickBookCard }) => {
  return (
    <div>
      <MyLibraryBookCard
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
      />
    </div>
  );
};

export default MyLibrarySection;
