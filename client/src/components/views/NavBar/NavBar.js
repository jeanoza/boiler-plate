import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/">Landing</Link>
      <Link to="/login">LoginPage</Link>
      <Link to="/register">RegisterPage</Link>
    </div>
  );
}

export default NavBar;
