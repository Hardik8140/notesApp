const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blackList.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, pass } = req.body;

  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ username, email, pass: hash });
      await user.save();
      res.status(200).json({ message: "User registration successful" });
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username },
            "hardik",
            { expiresIn: "7m" }
          );
          const refToken = jwt.sign(
            { userID: user._id, username: user.username },
            "hardik",
            { expiresIn: "14m" }
          );
          res.status(200).json({
            message: "Login Successful!!",
            token: token,
            refToken: refToken,
          });
        } else {
          res.status(401).json({ error: "invalid credentials" });
        }
      });
    } else {
      res.status(200).json({ error: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decode = jwt.verify(token, "hardik");
    const blackListToken = new BlackListModel({
      token,
      expiresIn: new Date(decode.exp * 1000),
    });

    await blackListToken.save();
    res.status(200).json({ msg: "User has been logout" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
module.exports = { userRouter };
