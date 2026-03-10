/* 책 + 기록 합치기 */
export const booksWithRecords = (books, records) => {
  return books
    .map((book) => {
      const record = records.find((record) =>
        String(record.bookId === String(book.id))
      );

      return {
        ...book,
        record,
        status: record.status || "want",
      };
    })
    .filter((book) => book.record);
};
