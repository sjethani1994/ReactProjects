import { useEffect } from "react";

function ProductCard({ product, editProduct }) {
  return (
    <div className="w-80 overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="flex h-48 items-center justify-center bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {product.category}
          </span>
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-800">{product.name}</h2>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {product.price}
          </span>

          <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700" onClick={() => editProduct(product.id)}>
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
