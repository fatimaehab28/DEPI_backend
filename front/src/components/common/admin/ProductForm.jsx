import { useState, useEffect } from "react";
import { api } from "../../../api/axios";

export default function ProductForm({ onBack }) {
  const [form, setForm] = useState({ name: "", price: "", categoryId: "", image: null });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  const handleCreate = async () => {
    const fd = new FormData();
    fd.append("Name", form.name);
    fd.append("Price", form.price);
    fd.append("CategoryId", form.categoryId);
    fd.append("Image", form.image);

    await api.post("/products/create", fd);
    alert("Product created.");
    onBack();
  };

  return (
    <div className="container">
      <h2>Create Product</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <select
        value={form.categoryId}
        onChange={e => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">-- Select Category --</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input type="file" onChange={e => setForm({ ...form, image: e.target.files[0] })} />

      <button className="primary" onClick={handleCreate}>Create</button>
      <button className="secondary" onClick={onBack}>Back</button>
    </div>
  );
}
