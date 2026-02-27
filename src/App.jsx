import { Route, Routes } from "react-router-dom";
import "./App.css";
import BooksPage from "./pages/BooksPage";
import BooksDetail from "./pages/BooksDetail";

import StatsPage from "./pages/StatsPage";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksPage />} />
      <Route path="/books/:bookId" element={<BooksDetail />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
