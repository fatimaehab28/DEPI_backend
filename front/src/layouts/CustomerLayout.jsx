

import CustomerNavbar from "../components/common/customer/CustomerNavbar";

export default function CustomerLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <CustomerNavbar />
      <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
