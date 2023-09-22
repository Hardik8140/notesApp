import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    fetch("http://localhost:8080/notes/", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setNotes(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json)
      .then((res) => {
        console.log(res);
        getNotes();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((el) => el._id === id);
    navigate(`/edit/${id}`, { state: { noteId: id, noteToEdit } });
  };

  return (
    <div>
      <h2>All the Notes are in console</h2>
      {Array.isArray(notes) &&
        notes.map((el) => (
          <PRODUCTCARD key={el._id}>
            <h1>{el.title}</h1>
            <p>{el.content}</p>
            <button onClick={() => handleEdit(el._id)}>Edit</button>
            <button onClick={() => handleDelete(el._id)}>Delete</button>
          </PRODUCTCARD>
        ))}
    </div>
  );
};

export default HomePage;

const PRODUCTCARD = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 20px;
  margin: 40px;

  button {
    margin-left: 5px;
  }
`;
