/* eslint-disable no-restricted-globals */
import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "../../ProductDetails";
import ProductForm from "./ProductForm";
import { api } from "../../../api/axios";

import Layout from "../../Layout"; 


function App() {
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await api.delete(`/products/${id}`);
      window.location.reload();
    }
  };

  if (view === "create") return <ProductForm onBack={() => setView("list")} />;
  if (view === "details") return <ProductDetails productId={selectedId} onBack={() => setView("list")} />;

  
  return (
    <Layout onNavigate={setView}>
      {view === "create" && <ProductForm onBack={() => setView("list")} />}
      {view === "details" && <ProductDetails productId={selectedId} onBack={() => setView("list")} />}
      {view === "list" && (
        <>
          <h1>Products</h1>
          <ProductList
            onSelect={(id) => {
              setSelectedId(id);
              setView("details");
            }}
            onDelete={handleDelete}
          />
        </>
      )}
    </Layout>
  );
}

export default App;
