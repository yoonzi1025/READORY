import "./StatusTap.css";
import { STATUS_OPTIONS } from "../../../constants/statusOption";

const StatusTap = ({ activeTab, onTabChange }) => {
  const TABS = [{ key: "all", label: "전체" }, ...STATUS_OPTIONS];

  return (
    <div className="tab-wrapper">
      <div className="tab">
        {TABS.map((tab) => (
          <button
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTap;
