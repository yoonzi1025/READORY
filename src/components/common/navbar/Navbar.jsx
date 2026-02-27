import "./Navbar.css";
import search from "../../../assets/search.png";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="top-bar">
        <div className="nav-logo">READORY</div>

        {/* 메인 메뉴 */}
        <nav className="nav-title">
          <button className="nav-item active">홈</button>
          <button className="nav-item">내 서재</button>
          <button className="nav-item">독서기록</button>
        </nav>

        <div className="search">
          <input type="text" placeholder="검색어를 입력해 주세요" />
          <img className="search-icon" src={search} alt="search" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
