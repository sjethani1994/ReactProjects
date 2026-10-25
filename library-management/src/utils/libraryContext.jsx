import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

const addBook = async (data) => {
  const req = {
    ...data,
    id: Date.now().toString(),
  }
  const response = await axios.post("http://localhost:3000/books", req);
  console.log(response.data)

  setBooks((prevBooks) => [...prevBooks, response.data]);

  navigate("/");
}

const fetchBookById = async (id) => {
  const response = await axios.get(`http://localhost:3000/books/${id}`);
  return response.data;
}

  return (
    <LibraryContext.Provider
      value={{
        books,
        addBook,
        fetchBookById,
        // updateBook,
        // deleteBook,
        // toggleBookStatus,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
