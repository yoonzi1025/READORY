import { useEffect, useReducer, useRef, useState } from "react";

const STORAGE_KEY = "records";

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    default:
      return state;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [records, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(() => {
    const storedData = localStorage.getItem("records");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
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

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

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

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  if (isLoading) return <div>데이터 로딩중입니다...</div>;

  return (
    <RecordStateContext.Provider value={records}>
      <RecordDispatchContext.Provider
        value={{ onCreate, onUpdate, onDelete }}
      ></RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
}
