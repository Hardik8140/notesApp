import React, { useState } from "react";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleNewNote = () => {
    const newNote = { title, content };
    // const token = localStorage.getItem("token");

    fetch("https://cute-gold-dugong-tutu.cyclic.cloud/notes/add", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="content"
        value={content}
        placeholder="content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleNewNote}>Add Note</button>
    </div>
  );
};

export default Notes;
