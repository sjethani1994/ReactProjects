import { NavLink } from "react-router-dom";
import "../styles/BookCard.css";

function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.coverImage} alt="Book cover" />

        <span className="book-status">{book.status}</span>
      </div>

      <div className="book-info">
        <span className="book-category">{book.category}</span>

        <h3 className="book-title">{book.title}</h3>

        <p className="book-author">By {book.author}</p>

        <p className="book-description">{book.description}</p>

        <div className="book-meta">
          <span>ISBN: {book.isbn}</span>
          <span>{book.publishedYear}</span>
        </div>

        <div className="book-actions">
          <NavLink to={`/view/${book.id}`} className="btn-action btn-view">
            View
          </NavLink>

          <NavLink to={`/edit/${book.id}`} className="btn-action btn-edit">
            Edit
          </NavLink>

          <button
            type="button"
            className="btn-action btn-delete"
            onClick={() => console.log("Delete book:", book.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
