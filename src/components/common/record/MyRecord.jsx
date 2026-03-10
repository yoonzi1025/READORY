import "./MyRecord.css";
import StatusBadge from "../status/StatusBadge.jsx";
import Rating from "../rating/Rating.jsx";
import { formatDate } from "../../../constants/formatDate.js";

const MyRecord = ({ currentRecord, onClickUpdate, onClickDelete }) => {
  if (!currentRecord) return null;

  return (
    <div className="record-card">
      <div className="record-card-header">
        <div className="record-title">독서기록</div>
        <div className="record-card-right">
          <span className="record-card-date">
            {formatDate(currentRecord.createdDate)}
          </span>
          <div className="record-card-btn">
            <button className="record-btn" onClick={onClickUpdate}>
              수정
            </button>
            <button className="record-btn btn-delete" onClick={onClickDelete}>
              삭제
            </button>
          </div>
        </div>
      </div>

      <div className="record-card-state">
        <StatusBadge status={currentRecord.status} />

        {currentRecord.status === "reading" ? (
          <span className="record-card-period">
            {currentRecord.startDate} <span className="date-divider">~</span>{" "}
            읽는 중
          </span>
        ) : currentRecord.status === "done" ||
          currentRecord.status === "stopped" ? (
          <span className="record-card-period">
            {currentRecord.startDate} <span className="date-divider">~</span>{" "}
            {currentRecord.endDate}
          </span>
        ) : null}
      </div>

      {currentRecord.status === "done" && (
        <Rating rating={currentRecord.rating} />
      )}

      {(currentRecord.status === "done" ||
        currentRecord.status === "stopped") && (
        <div className="record-card-comment">{currentRecord.comment}</div>
      )}
    </div>
  );
};

export default MyRecord;
