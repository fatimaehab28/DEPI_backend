import { useEffect, useState } from "react";
import { api } from "../api/axios";

export default function ProductDetails({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", categoryId: "", image: null });
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await api.get(`/products/${productId}`);
      const categoryRes = await api.get("/categories");

      setProduct(productRes.data);
      setForm({
        name: productRes.data.name,
        price: productRes.data.price,
        categoryId: productRes.data.categoryId,
        image: null,
        
      });

      setCategories(categoryRes.data);
    };

    fetchData();
  }, [productId]);

  

  const handleUpdate = async () => {
    try {
      const fd = new FormData();
      fd.append("Name", form.name);
      fd.append("Price", form.price);
      fd.append("CategoryId", form.categoryId);
      if (form.image) fd.append("Image", form.image);  // Only add if selected
  
      await api.put(`/products/${productId}`, fd);
      alert("Product updated.");
      onBack();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Update failed: " + (err.response?.data?.title || "Unknown error"));
    }
  };
  
  
  if (!product) return <p>Loading...</p>;

 
    
  const imageSrc = preview
  ? preview
  : product.imageUrl.startsWith("http")
    ? product.imageUrl
    : `https://localhost:7130/Resources\\products\\${product.imageUrl}`;


  return (
    <div className="container">
      <h2>Edit Product</h2>

      <img
        src={imageSrc}
        alt={form.name}
        style={{
          width: "200px",
          height: "auto",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />

      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="input"
      />
      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        className="input"
      />

      <select
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        className="input"
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setForm({ ...form, image: file });
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="input"
      />

      <div style={{ marginTop: "15px" }}>
        <button className="primary" onClick={handleUpdate}>Update</button>
        <button className="secondary" onClick={onBack} style={{ marginLeft: "10px" }}>
          Back
        </button>
      </div>
    </div>
  );
}
