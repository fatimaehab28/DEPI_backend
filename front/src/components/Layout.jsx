// components/Layout.jsx
import React from "react";
import "./Layout.css";

export default function Layout({ children, onNavigate }) {
    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>Admin Panel</h2>

                <nav>
                    <button onClick={() => onNavigate("list")}>All Products</button>
                    <hr className="nav-separator" />
                    <button onClick={() => onNavigate("create")}>Add Product</button>
                </nav>



            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
