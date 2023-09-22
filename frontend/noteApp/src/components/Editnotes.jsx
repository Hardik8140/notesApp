import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Editnotes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editedNote, setEditedNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (location.state && location.state.noteToEdit) {
      const { title, content } = location.state.noteToEdit;
      setEditedNote({ title, content });
    }
  }, [location.state]);

  const handleEdit = () => {
    const { title, content } = editedNote;
    const noteId = location.state.noteId;

    fetch(`http://localhost:8080/notes/update/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Note updated:", res);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating note:", err);
      });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <input
        type="text"
        name="title"
        value={editedNote.title}
        onChange={(e) =>
          setEditedNote({
            ...editedNote,
            title: e.target.value,
          })
        }
      />
      <input
        type="text"
        name="content"
        value={editedNote.content}
        onChange={(e) =>
          setEditedNote({
            ...editedNote,
            content: e.target.value,
          })
        }
      />
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Editnotes;
