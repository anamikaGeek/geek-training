const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.userData;
checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log("----------", req.body)
    // Username
    User.findOne({
      userName: req.body.username
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log("hereeeeee", user)
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
        next();
      });
    });
  };

  verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log("-------------", token)
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  const authJwt = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    verifyToken: verifyToken,
  };
  module.exports = authJwt;