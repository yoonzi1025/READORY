import { useContext, useState } from "react";
import "./Book.css";
import "./Record.css";
import { FaPlus } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import Modal from "../modal/Modal";
import {
  RecordDispatchContext,
  RecordStateContext,
} from "../../../context/records/RecordProvider";
import Rating from "../rating/Rating";
import StatusBadge from "../status/StatusBadge";
import { useNavigate } from "react-router-dom";

const BookContentInfo = ({ book }) => {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  // 현재 기록넣기
  const [editingRecord, setEditingRecord] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const records = useContext(RecordStateContext);
  const currentRecord = records.find((record) => record.bookId === book.id);

  const { onCreate, onUpdate, onDelete } = useContext(RecordDispatchContext);
  const onSubmit = (recordData) => {
    if (editingRecord) {
      // 수정
      onUpdate({
        id: editingRecord.id,
        bookId: book.id,
        status: recordData.status,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
      });
    } else {
      // 새기록
      onCreate({
        bookId: book.id,
        status: recordData.status,
        rating: recordData.rating,
        comment: recordData.comment,
        startDate: recordData.startDate,
        endDate: recordData.endDate,
      });
    }

    handleClose();
  };

  const onClickCreate = () => {
    setEditingRecord(null);
    handleOpen();
  };

  const onClickUpdate = () => {
    setEditingRecord(currentRecord);
    handleOpen();
  };

  const onClickDelete = () => {
    if (window.confirm("독서 기록을 정말 삭제할까요? 다시 복구되지 않아요")) {
      onDelete(currentRecord.id);
      nav("/books");
    }
  };

  if (!book) return null;

  return (
    <section className="book-contentInfo-wrapper">
      <div className="book-content-info">
        <div className="book-content-section">
          <div className="cover-img">
            <img src={book.cover} alt="" />
          </div>
          <div className="content-info">
            <div className="btn-container">
              <button className="btn-info">
                <FaPlus />
                보고싶어요
              </button>
              <button className="btn-info" onClick={onClickCreate}>
                <FaCommentDots />
                코멘트
              </button>

              <button className="btn-info">
                <GoEye />
                보는 중
              </button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              onSubmit={onSubmit}
              initData={editingRecord}
            />
            <div className="book-summary">
              <div className="summary-title">{book.title}</div>
              <div className="summary-author">{book.author}</div>
              <div className="summary-summary"> {book.summary}</div>
            </div>
          </div>
        </div>
        {currentRecord ? (
          <div className="record-wrapper">
            <div className="record-section">
              <div className="record-title">독서기록</div>

              <div className="record-card">
                <div className="record-card-header">
                  <span className="record-card-date">
                    {new Date(currentRecord.createdDate).toLocaleDateString()}
                  </span>
                  <div className="record-card-btn">
                    <button className="record-btn" onClick={onClickUpdate}>
                      수정
                    </button>
                    <button
                      className="record-btn btn-delete"
                      onClick={onClickDelete}
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <div className="record-card-state">
                  <StatusBadge status={currentRecord.status} />
                  <span className="record-card-period">
                    {currentRecord.startDate} ~ {currentRecord.endDate}
                  </span>
                </div>

                <Rating rating={currentRecord.rating} />

                <div className="record-card-comment">
                  {currentRecord.comment}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="record-empty">아직 기록이 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default BookContentInfo;
