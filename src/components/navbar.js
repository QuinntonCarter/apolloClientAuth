import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "right",
      }}
    >
      <>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          To homepage
        </Link>
      </>
      <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
        Login
      </Link>
      <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
        Register
      </Link>
    </div>
  );
}
