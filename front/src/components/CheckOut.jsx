import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/confirmation');
  };

  return (
    <div className="auth-container">
      <h2>Checkout</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Shipping Address" required />
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
