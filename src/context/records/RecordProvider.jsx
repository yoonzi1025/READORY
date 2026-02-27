import { createContext, useEffect, useReducer, useRef, useState } from "react";

export const RecordStateContext = createContext();
export const RecordDispatchContext = createContext();

const STORAGE_KEY = "records";

function recordReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE":
      return [action.data, ...state];

    case "UPDATE":
      return state.map((r) =>
        r.id === action.data.id ? { ...r, ...action.data } : r
      );

    case "DELETE":
      return state.filter((r) => r.id !== action.id);

    default:
      return state;
  }
}

export default function RecordProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [records, dispatch] = useReducer(recordReducer, []);
  localStorage.getItem("records");
  const idRef = useRef(1);

  // 로드
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      setIsLoading(false);
      return;
    }

    let parsedData;
    try {
      parsedData = JSON.parse(storedData);
    } catch {
      setIsLoading(false);
      return;
    }

    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    dispatch({ type: "INIT", data: parsedData });
    setIsLoading(false);
  }, []);

  // 저장
  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records, isLoading]);

  const onCreate = ({ bookId, status, rating, memo, createdDate }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        bookId,
        status,
        rating,
        memo,
        createdDate,
      },
    });
  };

  const onUpdate = ({ id, status, rating, memo, createdDate }) => {
    dispatch({
      type: "UPDATE",
      data: { id, status, rating, memo, createdDate },
    });
  };

  const onDelete = (id) => dispatch({ type: "DELETE", id });

  if (isLoading) return <div>데이터 로딩중입니다...</div>;

  return (
    <RecordStateContext.Provider value={records}>
      <RecordDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        {children}
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}
