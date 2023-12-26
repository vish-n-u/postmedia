const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/server.config");

const User = require("../model/user.model");

exports.registration = async (req, res) => {
  console.log("registration", req.user, secretKey);
  try {
    if (req.user) {
      const newUser = {
        userName: req.user.userName,
        email: req.user.email,
      };
      let token = jwt.sign({ email: newUser.email }, secretKey, {
        expiresIn: "10m",
      });
      
      return res.status(201).send({
        message: {
          userName: newUser.userName,
          token,
          
        },
      });
    }
    // const isUserDeleted = await User.findOne({ email: req.body.email });
    const obj = {
      userName: req.body.userName,
      userPic:req.body.pic,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    };
    const newUser = await User.create(obj);

    let token = jwt.sign({ email: newUser.email }, secretKey, {
      expiresIn: "10 minutes",
    });
    
    return res.status(201).send({
      message: {
        userName: newUser.userName,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};

// exports.deleteRegistration = async (req, res) => {
//   try {
//     const newUser = await User.deleteOne({ email: req.body.email });
//     return res.status(200).send({ message: "Successful" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ message: "server err" });
//   }
// };

exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign({ email: req.doesUserExist.email }, secretKey);
    
    return res.status(200).send({
      message: {
        userName: req.doesUserExist.userName,
        usrPic:req.doesUserExist.usrPic,
        token,
        
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};
