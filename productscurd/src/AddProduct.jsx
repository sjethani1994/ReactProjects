import React from "react";
import "./AddProduct.css";
import { useState } from "react";
import { useEffect } from "react";

function AddProduct({ addProduct, editedProduct, updateProduct }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const productObject = {
      name,
      category,
      price,
    };

    addProduct(productObject);

    setName("");
    setCategory("");
    setPrice("");
  };

  useEffect(() => {
    if (editedProduct) {
      setName(editedProduct.name);
      setCategory(editedProduct.category);
      setPrice(editedProduct.price);
    }
  }, [editedProduct]);

  const updatedProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      ...editedProduct,
      name,
      category,
      price,
    };

    updateProduct(newProduct);

    setName("");
    setCategory("");
    setPrice("");
  };
  return (
    <div className="add-product-container">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

      <form
        className="space-y-5"
        onSubmit={editedProduct ? updatedProduct : handleSubmit}
      >
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Product Name
          </label>

          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <input
            type="text"
            id="category"
            placeholder="Enter category"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <input
            type="number"
            id="price"
            placeholder="Enter price"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg 
                     font-medium hover:bg-blue-700 transition"
        >
          {editedProduct ? "Edit Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
