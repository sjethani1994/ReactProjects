import BookCard from "./BookCard";
import "../styles/Books.css";
import { useLibrary } from "../utils/libraryContext";

function Books() {
  const { books } = useLibrary();

  return (
    <div className="books-page">
      <div className="books-heading">
        <div>
          <h1>Library Collection</h1>
          <p>Explore and manage your book collection.</p>
        </div>

        <button className="add-book-btn">+ Add Book</button>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <BookCard book={book}/>
        ))}
      </div>
    </div>
  );
}

export default Books;
