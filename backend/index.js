const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { noteRouter } = require("./routes/note.router");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ message: "This is the HomePage" });
});

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log("Server Running on 8080");
  } catch (error) {
    console.log("Error");
  }
});
