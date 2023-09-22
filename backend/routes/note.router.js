const express = require("express");
const { NoteModel } = require("../model/notes.model");
const { auth } = require("../middlewares/auth");

const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(200).json({ message: "New note created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    const note = await NoteModel.find({ username: req.body.username });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateNote = req.body;
  const username = req.body.username;

  try {
    const updatesNote = await NoteModel.findByIdAndUpdate(
      { _id: id, username },
      updateNote,
      { new: true }
    );

    if (!updatesNote) {
      res.status(404).json({ error: "Note not Found" });
    }

    res.status(200).json({ message: "Note update successfully!!" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const username = req.body.username;

  try {
    const deleteNote = await NoteModel.findByIdAndDelete({
      _id: id,
      username,
    });

    if (!deleteNote) {
      res.status(404).json({ error: "Note not deleted" });
    }

    res.status(200).json({ message: "Note deleted successfully!!" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = { noteRouter };
