import { useContext, useState } from "react";
import Navbar from "../components/common/navbar/Navbar";
import MyLibrarySection from "../components/common/library/MyLibrarySection";
import StatusTap from "../components/common/library/StatusTap";
import Modal from "../components/common/modal/Modal";
import { RecordStateContext } from "../context/records/RecordProvider";
import { BookStateContext } from "../context/books/BooksProvider";
import { booksWithRecords } from "../util/BooksWithRecords";

const MyPage = () => {
  const books = useContext(BookStateContext);
  const records = useContext(RecordStateContext);

  const [activeTab, setActiveTab] = useState("all");
  const [open, setOpen] = useState(false);
  // 현재 기록넣기
  const [editingRecord, setEditingRecord] = useState(null);
  const bookRecordList = booksWithRecords(books, records);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  /* 탭 필터 */
  const filterBooks =
    activeTab === "all"
      ? bookRecordList
      : bookRecordList.filter((book) => book.status === activeTab);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const onClickBookCard = (book) => {
    setEditingRecord(book.record || null);
    handleOpen();
  };

  return (
    <div>
      <Navbar />
      <StatusTap activeTab={activeTab} onTabChange={onTabChange} />
      <MyLibrarySection
        filterBooks={filterBooks}
        onClickBookCard={onClickBookCard}
      />
      <Modal
        open={open}
        onClose={handleClose}
        initData={editingRecord}
        mode="view"
      />
    </div>
  );
};

export default MyPage;
