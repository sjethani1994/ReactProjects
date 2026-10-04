import { useState } from "react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";

function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: 69999,
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 74999,
      category: "Mobile",
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Sony Headphones",
      price: 12999,
      category: "Audio",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Apple Watch",
      price: 39999,
      category: "Wearable",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Dell Laptop",
      price: 65999,
      category: "Laptop",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const [cart, setCart] = useState([]);
  const addProductToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.id === product.id);

      if (productExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeProductToCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  return (
    <div className="shop-container">
      {/* Products */}
      <div className="products-section">
        <h1>Products</h1>

        <div className="products-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addProductToCart={addProductToCart}
              removeProductToCart={removeProductToCart}
            />
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="cart-section">
        <h1>Cart</h1>

        <div className="cart-list">
          {cart.map((product) => (
            <Cart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
