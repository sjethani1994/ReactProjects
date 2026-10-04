import React from "react";

function ProductCard({ product, addProductToCart, removeProductToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt="Product" />
      </div>

      <div className="product-details">
        <h2>{product.name}</h2>

        <p className="product-category">{product.category}</p>

        <p className="product-price">{product.price}</p>

        <div className="product-actions">
          <button
            className="add-btn"
            onClick={() => {
              addProductToCart(product);
            }}
          >
            Add to Cart
          </button>

          <button
            className="remove-btn"
            onClick={() => {
              removeProductToCart(product);
            }}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
