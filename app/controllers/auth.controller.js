const config = require("../config/auth.config");
const db = require("../models");
const User = db.userData;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async(req, res) => {
    const user = new User({
      userName: req.body.username,
      email: req.body.email,
      firstName: req.body.username,
      lastFame: req.body.email,
      addres: req.body.address,
      phone: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
        res.send({userData: user,  message: "User was registered successfully!" });

    });
  };
  exports.signin = (req, res) => {
    User.findOne({
      username: req.body.username
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        const userSession = {
            id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        }
        res.cookie('auth', userSession).status(200).send(userSession);
      });
};
exports.logoutUserSession = async (req, res) => {
    let user_session = req.cookies.userSession;
    // console.log(user_session)
    if (user_session)
      res.clearCookie("user_session", {
      });
    res.status(200).send({ message: "Logged out successfully" });
  };
