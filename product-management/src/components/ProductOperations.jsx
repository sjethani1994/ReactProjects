import React, { useEffect, useState } from "react";
import "../styles/ProductOperations.css";
import axios from "axios";

function ProductOperations({
  setShowModal,
  currentProduct,
  isEdit,
  getProducts,
}) {
  const isEditMode = isEdit;
  const [formData, setFormData] = useState(currentProduct);

  useEffect(() => {
    setFormData(currentProduct);
  }, [currentProduct]);

  const updateProduct = async (e) => {
    e.preventDefault();

    console.log("1. Submit triggered");
    console.log("2. Before API call");

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${formData.id}`,
        formData,
      );

      await getProducts();

      setShowModal(false);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <form className="product-form" onSubmit={updateProduct}>
      <div className="form-header">
        <div>
          <h2>{isEditMode ? "Edit Product" : "Product Details"}</h2>
          <p>
            {isEditMode
              ? "Update your product information"
              : "View product information"}
          </p>
        </div>

        <span className="product-status">In Stock</span>
      </div>

      <div className="product-form-body">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={formData.title || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              value={formData.price || ""}
              disabled={!isEditMode}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              value={formData.stock || ""}
              disabled={!isEditMode}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={formData.category || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="form-group">
          <label>Product Image URL</label>
          <input
            type="text"
            value={formData.image || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={formData.description || ""}
            disabled={!isEditMode}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-footer">
        <button
          type="button"
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>

        {isEditMode && (
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductOperations;
