import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/common/auth/Login";
import SignUp from "../src/components/common/auth/SignUp";
import ProductDashboard from "../src/components/common/admin/ProductDashboard";
import ProductBrowse from "../src/components/common/customer/ProductBrowse";
import CustomerNavbar from "./components/common/customer/CustomerNavbar";
import CustomerLayout from "./layouts/CustomerLayout"; 
import CartPage from "./components/common/customer/CartPage";
import CheckoutPage from "./components/common/customer/CheckoutPage";
import ConfirmationPage from "./components/common/customer/ConfirmationPage";
import "./App.css";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/browse" element={
            <CustomerLayout>
              <ProductBrowse />
            </CustomerLayout>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<ProductDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/customernavbar" element={<ProductDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
