var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const User = require("../models/User");

const checkAuth = require('../middlewares/UserPolicy');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('API FOR USERS');
});

/* POST users login. */
router.post('/login', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).exec((err, user) => {
    console.log(user);

    if (user.password !== password) {
      return res.status(500).json({
        error: "Wrong Email or Password"
      });
    }

    let token = jwt.sign(
      {
        email: user.email,
        username: user.username
      },
      "This is very secret key",
      {
        expiresIn: "1h"
      }
    );

    let returnObj = {
      message: "Login Success",
      token,
      username: user.username
    };

    return res.status(200).json(returnObj);

  })
});

/* POST users signup. */
router.post('/signup', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  console.log(email)
  console.log(password)
  console.log(username)

  const user = new User({
    email: req.body.email,
    password,
    username
  });

  console.log(user)

  user
    .save()
    .then(result => {
      console.log(result);

      // return token
      let token = jwt.sign(
        {
          email,
          username
        },
        "This is very secret key"
      )

      console.log(token)

      let returnObj = {
        message: "User Created Successfully",
        token,
        username
      };

      return res.status(201).json(returnObj);
    })
    .catch(err => {
      console.log("Error ", err);
      res.status(500).json({
        error: err
      });
    });

});

router.get('/checkUser', checkAuth, (req, res, next) => {
  const token = req.body.token;
  console.log("user data", req.userData);
  res.send(req.userData);
});

module.exports = router;
