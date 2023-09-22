import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Signup from "./Signup";
import Login from "./Login";
import Editnotes from "./Editnotes";
import Notes from "./Notes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit/:id" element={<Editnotes />} />
      <Route path="/newNote" element={<Notes />} />
    </Routes>
  );
};

export default AllRoutes;
