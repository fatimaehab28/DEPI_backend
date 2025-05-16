
import { Link } from "react-router-dom";

export default function CustomerNavbar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Customer Panel</h2>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/customerlayout" style={styles.link}>Browse Products</Link></li>
          <hr className="nav-separator" />
          <li><Link to="/cart" style={styles.link}>View Cart</Link></li>
          <hr className="nav-separator" />
          <li><Link to="/orders" style={styles.link}>View Orders</Link></li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    background: "#1e293b",
    color: "white",
    height: "100vh",
    padding: "20px",
    position: "fixed",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    display: "block",
    padding: "10px 0",
    color: "#fff",
    textDecoration: "none",
  }
};
