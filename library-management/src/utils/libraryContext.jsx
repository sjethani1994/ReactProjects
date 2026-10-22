import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

export const LibraryContext = createContext(null);

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);

  if (!ctx) {
    throw new Error("useLibrary must be used inside LibraryContextProvider");
  }

  return ctx;
};

export const LibraryProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

useEffect(() => {
  console.log("LibraryProvider effect executed");

  const getBook = async () => {
    const response = await axios.get(
      "http://localhost:3000/books"
    );

    setBooks(response.data);
  };

  getBook();
}, []);

  return (
    <LibraryContext.Provider
      value={{
        books,
        // addBook,
        // fetchBookById,
        // updateBook,
        // deleteBook,
        // toggleBookStatus,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
