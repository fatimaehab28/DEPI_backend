import { useEffect, useState } from "react";
import { api } from "../../../api/axios";

export default function ProductList({ onSelect, onDelete }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="container" style={{ color: "#fff" }}>
      {/* <h2>All Products</h2> */}
      
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
              <button className="primary" onClick={() => onSelect(product.id)}>View</button>
              <button className="danger" onClick={() => onDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#111", // Dark card background
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  },
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
