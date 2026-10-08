import { useState } from "react";
import "./App.css";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 75000,
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 2,
      name: "Shoes",
      category: "Fashion",
      price: 3000,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: 3,
      name: "Headphones",
      category: "Electronics",
      price: 5000,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ]);

  const addProduct = (product) => {
    console.log(product);

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: Math.random(),
        ...product,
      },
    ]);
  };

  const [editedProduct, setEditedProduct] = useState(null);
  const editProduct = (productId) => {
    const product = products.find((product) => product.id === productId);

    setEditedProduct(product);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            editProduct={editProduct}
          />
        ))}
        <AddProduct
          addProduct={addProduct}
          editedProduct={editedProduct}
          updateProduct={updateProduct}
        />
      </div>
    </>
  );
}

export default App;
