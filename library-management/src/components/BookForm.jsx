import { useEffect } from "react";
import "../styles/BookForm.css";
import { useLibrary } from "../utils/libraryContext";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function BookForm() {
  const { addBook } = useLibrary();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      isbn: "",
      publishedYear: "",
      status: "Available",
      coverImage: "",
      description: "",
    },
  });

  const add = async (data) => {
    try {
      await addBook(data);
      reset();
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const { mode, id } = useParams();
  const { fetchBookById } = useLibrary();
  useEffect(() => {
    const viewBook = async () => {
      try {
        const book = await fetchBookById(id);

        if (book) {
          reset(book);
        }
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };

    viewBook();
  }, [id, fetchBookById, reset]);
  
  return (
    <div className="book-form-page">
      <div className="book-form-card">
        <div className="book-form-header">
          <h2>
            {mode === "view"
              ? "View Book"
              : mode === "add"
                ? "Add New Book"
                : "Edit Book"}
          </h2>
          <p>Enter the book details to add it to your library.</p>
        </div>

        <form className="book-form" onSubmit={handleSubmit(add)} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input
                type="text"
                id="title"
                placeholder="Enter book title"
                aria-invalid={!!errors.title}
                {...register("title", {
                  required: "Please enter the book title.",
                  minLength: {
                    value: 3,
                    message: "Book title must contain at least 3 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Book title cannot exceed 50 characters.",
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                placeholder="Enter author name"
                aria-invalid={!!errors.author}
                {...register("author", {
                  required: "Please enter the author's name.",
                  minLength: {
                    value: 3,
                    message: "Author name must contain at least 3 characters.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Author name cannot exceed 50 characters.",
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.author && (
                <span className="error-message">{errors.author.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                aria-invalid={!!errors.category}
                {...register("category", {
                  required: "Please select a book category.",
                })}
                disabled={mode === "view"}
              >
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Fiction">Fiction</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Finance">Finance</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
              {errors.category && (
                <span className="error-message">{errors.category.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN *</label>
              <input
                type="text"
                id="isbn"
                placeholder="Enter ISBN number"
                aria-invalid={!!errors.isbn}
                {...register("isbn", {
                  required: "Please enter the ISBN number.",
                  pattern: {
                    value: /^(?:\d{9}[\dXx]|\d{13})$/,
                    message: "Enter a valid 10-digit or 13-digit ISBN.",
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.isbn && (
                <span className="error-message">{errors.isbn.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="publishedYear">Published Year</label>
              <input
                type="number"
                id="publishedYear"
                placeholder="e.g. 2024"
                aria-invalid={!!errors.publishedYear}
                {...register("publishedYear", {
                  validate: (value) => {
                    if (value === "" || value == null) return true;

                    const year = Number(value);
                    const currentYear = new Date().getFullYear();

                    if (!Number.isInteger(year)) {
                      return "Please enter a valid year.";
                    }

                    if (year < 1000) {
                      return "Published year must be 1000 or later.";
                    }

                    if (year > currentYear) {
                      return `Published year cannot exceed ${currentYear}.`;
                    }

                    return true;
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.publishedYear && (
                <span className="error-message">
                  {errors.publishedYear.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">Availability *</label>
              <select
                id="status"
                aria-invalid={!!errors.status}
                {...register("status", {
                  required: "Please select the book's availability.",
                })}
                disabled={mode === "view"}
              >
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
              </select>
              {errors.status && (
                <span className="error-message">{errors.status.message}</span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="coverImage">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                placeholder="https://example.com/book-cover.jpg"
                aria-invalid={!!errors.coverImage}
                {...register("coverImage", {
                  validate: (value) => {
                    if (!value) return true;

                    try {
                      const url = new URL(value);

                      return (
                        ["http:", "https:"].includes(url.protocol) ||
                        "Image URL must use HTTP or HTTPS."
                      );
                    } catch {
                      return "Please enter a valid image URL.";
                    }
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.coverImage && (
                <span className="error-message">
                  {errors.coverImage.message}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                rows="4"
                placeholder="Enter a short description of the book"
                aria-invalid={!!errors.description}
                {...register("description", {
                  required: "Please enter a book description.",
                  minLength: {
                    value: 10,
                    message: "Description must contain at least 10 characters.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Description cannot exceed 100 characters.",
                  },
                })}
                disabled={mode === "view"}
              />
              {errors.description && (
                <span className="error-message">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="book-form-actions">
            <button
              type="button"
              className="form-btn cancel-btn"
              onClick={() => reset()}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="form-btn submit-btn"
              disabled={mode === "view"}
            >
              {mode === "add" ? "Add Book" : "Edit Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
