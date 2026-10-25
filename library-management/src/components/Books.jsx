import BookCard from "./BookCard";
import "../styles/Books.css";
import { useLibrary } from "../utils/libraryContext";
import { NavLink } from "react-router-dom";

function Books() {
  const { books } = useLibrary();

  return (
    <div className="books-page">
      <div className="books-heading">
        <div>
          <h1>Library Collection</h1>
          <p>Explore and manage your book collection.</p>
        </div>
        <NavLink to={"/add"}>
          <button className="add-book-btn">+ Add Book</button>
        </NavLink>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Books;
