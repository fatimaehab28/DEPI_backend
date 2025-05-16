
import React from "react";

export default function ProductCard({ product, onView, onAddToCart }) {
  return (
    <div className="card">
      <img src={`http://localhost:7130/${product.imageUrl}`} alt={product.name} className="card-img" />
      <h3>{product.name}</h3>
      <p>{product.price} EGP</p>
      <p>Category: {product.category?.name}</p>
      <button onClick={() => onView(product)}>View</button>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}
