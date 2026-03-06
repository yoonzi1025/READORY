import "./StatusBadge.css";
import { STATUS_OPTIONS } from "../../../constants/statusOption";

const StatusBadge = ({ status }) => {
  const currentStatus = STATUS_OPTIONS.find((option) => option.key === status);
  if (!currentStatus) return null;
  return (
    <span className={`status-badge  status--${status}`}>
      {currentStatus.label}
    </span>
  );
};

export default StatusBadge;
