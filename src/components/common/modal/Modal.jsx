import "./Modal.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "../../../constants/statusOption";
import { STATUS_ICONS } from "../../../constants/statusIcon";
import Rating from "../rating/Rating";

const Modal = ({ open, onClose, onSubmit, initData }) => {
  const [status, setStatus] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (initData) {
      setStatus(initData.status || "");
      setStartDate(initData.startDate || "");
      setEndDate(initData.endDate || "");
      setRating(initData.rating || 0);
      setComment(initData.comment || "");
    } else {
      setStatus("");
      setStartDate("");
      setEndDate("");
      setRating(0);
      setComment("");
    }
  }, [open, initData]);

  if (!open) return null;

  const getStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const getEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const onClickStar = (star) => {
    setRating(star);
  };

  const onChangComment = (e) => {
    setComment(e.target.value);
  };

  const onClickSubmitBtn = () => {
    onSubmit({
      status,
      rating,
      comment,
      startDate,
      endDate,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">어떤 책인가요?</div>
          <div
            className="btn-close"
            style={{ display: "flex", cursor: "pointer" }}
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline size={34} />
          </div>
        </div>
        <div className="modal-section">
          <div className="section-label">독서 상태</div>
          <div className="status-section">
            {STATUS_OPTIONS.map((option) => {
              const Icon = STATUS_ICONS[option.key];
              return (
                <div
                  className={`btn-status ${
                    status === option.key ? "active" : ""
                  }`}
                  key={option.key}
                  onClick={() => setStatus(option.key)}
                >
                  <div className="btn-status-icon">
                    <Icon />
                  </div>
                  <div className="btn-status-label">{option.label}</div>
                  <div className="btn-status-sub">{option.sub}</div>
                </div>
              );
            })}
          </div>
          <div className="divider" />
          <div className="datd-section">독서 기간</div>
          <div className="date">
            <div className="date-field">
              <label>시작일</label>
              <input type="date" value={startDate} onChange={getStartDate} />
            </div>
            <div className="date-field">
              <label>종료일</label>
              <input type="date" value={endDate} onChange={getEndDate} />
            </div>
          </div>
          <div className="rating-section">
            <div className="rating-label">평점</div>
            <Rating rating={rating} onChange={onClickStar} />
          </div>
          <div className="comment-header">
            <div className="section-label" style={{ marginBottom: 0 }}>
              한줄평
            </div>
            <textarea
              value={comment}
              className="textarea"
              onChange={onChangComment}
              placeholder="짧은 감상평을 남겨보세요."
              maxLength={500}
              rows={3}
            />
          </div>
          <div className="btn-section">
            <button className="btn-close" onClick={onClose}>
              취소하기
            </button>
            <button className="btn-save" onClick={onClickSubmitBtn}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
