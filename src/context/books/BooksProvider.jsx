import { createContext, useState } from "react";

export const BookStateContext = createContext();

const MOCK_BOOKS = [
  {
    id: "1",
    title: "모순",
    author: "양귀자",
    cover:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&q=80",
    summary:
      "어느 날 아침 문득, 정말이지 맹세코 아무런 계시나 암시도 없었는데 불현듯, 잠에서 깨어나는 순간 나는 이렇게 부르짖었다.",
    status: "reading",
  },
  {
    id: "2",
    title: "구원에게",
    author: "정영욱",
    cover:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&q=80",
    summary: "스테디셀러 에세이스트 정영욱이 마주한어두운 사랑의 민낯",
    status: "done",
  },
];

export default function BookProvider({ children }) {
  const [books, setBooks] = useState(MOCK_BOOKS);

  return (
    <BookStateContext.Provider value={books}>
      {children}
    </BookStateContext.Provider>
  );
}
