const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blackList.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const blackList = await BlackListModel.findOne({ token });
    if (blackList) {
      res.status(400).send("Please login Again");
    }
    jwt.verify(token, "hardik", (err, decoded) => {
      if (decoded) {
        (req.body.userID = decoded.userID),
          (req.body.username = decoded.username);
        next();
      } else {
        res.send({ err: "please login" });
      }
    });
  } else {
    res.send({ message: "please login" });
  }
};

module.exports = { auth };
