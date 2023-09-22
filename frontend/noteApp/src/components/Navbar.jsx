import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const Navbar = () => {
  const tokeLength = localStorage.length;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/newNote">Add Note</Link>
      <Link to="/signup">Signup</Link>
      {tokeLength > 0 ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default Navbar;
