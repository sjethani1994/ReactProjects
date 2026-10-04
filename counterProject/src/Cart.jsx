import React from "react";

function Cart({ product, addCart, removeCart, addProductToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt="Product" />
      </div>

      <div className="product-details">
        <h2>{product.name}</h2>

        <p className="product-category">{product.category}</p>

        <p className="product-price">{product.price}</p>

        <p className="product-price">{product.quantity}</p>
        <div className="product-actions">
          <button
            className="add-btn"
            onClick={() => {
              addCart();
              addProductToCart(product);
            }}
          >
            Add to Cart
          </button>

          <button className="remove-btn" onClick={removeCart}>
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
