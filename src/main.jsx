import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import RecordProvider from "./context/records/RecordProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RecordProvider>
      <App />
    </RecordProvider>
  </BrowserRouter>
);
