import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import axios from "axios";
import ProductOperations from "./ProductOperations";
function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    console.log(response.data);
    setProducts(response.data);
  };

  const getProductDetails = async (id) => {
    console.log("1. Edit/View clicked");

    const response = await axios.get(`http://localhost:3000/products/${id}`);

    console.log("2. Product received:", response.data);

    setCurrentProduct(response.data);
    setShowModal(true);

    console.log("3. Requested modal to open");
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      await getProducts();

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Our Products</h1>
          <p>Manage and explore your product collection.</p>
        </div>

        <button className="add-product-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.title} />
              <span className="product-category">{product.category}</span>
            </div>

            <div className="product-content">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>

              <div className="product-details">
                <span className="product-price">₹ {product.price}</span>
                <span className="product-stock">{product.stock} in stock</span>
              </div>

              <div className="product-actions">
                <button
                  className="view-btn"
                  onClick={() => {
                    (getProductDetails(product.id), setIsEdit(false));
                  }}
                >
                  View
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    (getProductDetails(product.id), setIsEdit(true));
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <ProductOperations
              setShowModal={setShowModal}
              currentProduct={currentProduct}
              isEdit={isEdit}
              getProducts={getProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
