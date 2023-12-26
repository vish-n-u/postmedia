const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const { secretKey, refreshKey } = require("../config/server.config");
exports.verifyJwt = async (req, res, next) => {
  // console.log("reached.....second", req.body);
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "token" });
    }

    try {
        console.log("req.headers.authorization",req.headers.authorization)
      // console.log("reached.....second2");
      const isValidJwt = await jwt.verify(req.headers.authorization, secretKey);
       console.log(isValidJwt);
      // If the JWT is valid, set the user in the request and continue
      let { email } = jwt.decode(req.headers.authorization);
       console.log(email);
      let user = await User.findOne({ email });
      req.user = user;
      // console.log(user);
      next();
    } catch (jwtError) {
      
      if (jwtError.name === "TokenExpiredError") {
        if (req.body.refreshToken) {
          try {
            const isValidRefreshToken = jwt.verify(
              req.body.refreshToken,
              refreshKey
            );
            
            let { email } = jwt.decode(req.body.refreshToken);
            let doesUserExist = await User.findOne({ email: email });
            if (!doesUserExist) {
              return res.status(401).send({ message: "logout" });
            }
            req.user = doesUserExist;
            next();
          } catch (refreshError) {
            console.log("REFRESHTOKEN ERROR", refreshError);
            // If the refresh token is invalid, return an error
            return res.status(401).send({ message: "logout" });
          }
        } else {
          // If no refresh token is provided, return an error
          return res.status(401).send({ message: "logout" });
        }
      } else {
        // If the JWT error is not related to expiration, return an error
        return res.status(401).send({ message: { token: "Invalid token" } });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal Server err" });
  }
};