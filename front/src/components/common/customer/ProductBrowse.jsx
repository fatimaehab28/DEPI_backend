import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
//import { useCart } from "../customer/CartPage";  // Add this
// import { useCart } from "../../../context/CartContext";
import { useCart } from "../../../context/CartContext";


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Use cart logic

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container" style={{ color: "#fff" }}>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img
              src={`${product.imageUrl}`}
              alt={product.name}
              style={styles.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback.png";
              }}
            />
            <h3 style={{ color: "#fff" }}>{product.name}</h3>
            <p style={{ color: "#ccc" }}>Price: {product.price} EGP</p>
            <p style={{ color: "#999" }}>Category: {product.category?.name || "N/A"}</p>
            <div style={styles.btnRow}>
              <button
                className="primary"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "2px solid #333",
  },
  btnRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
};
