import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        width: "30%",
        justifyContent: "space-between",
      }}
    >
      <Link to="/login">LoginPage</Link>
      <Link to="/register">RegisterPage</Link>
    </div>
  );
}

export default NavBar;
