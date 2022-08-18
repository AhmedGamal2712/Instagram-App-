var jwt = require("jsonwebtoken");
const userModel = require("../DB/models/user.model");
const accessRoles = {
  Admin: "admin",
  User: "user",
  HR: "hr",
};

const auth = (accessRoles) => {
  return async (req, res, next) => {
    console.log("test", accessRoles);
    if (!req.headers["authorization"].startsWith("Bearer ")) {
      res.status(404).json({ message: "invalid authorization key" });
    } else {
      let authToken = req.headers["authorization"];
      let token = authToken.split(" ")[1];
      let verfiedKey = await jwt.verify(token, process.env.verfyTokenKey);
      if (verfiedKey) {
        let user = await userModel.findById(verfiedKey.id);
        if (accessRoles.includes(user.role)) {
          if (user) {
            req.userId = user._id;
            next();
          } else {
            res.status(404).json({ message: "invalid id in token" });
          }
        } else {
          res.status(401).json({ message: "you are not auth" });
        }
      }
    }
  };
};

module.exports = { auth, accessRoles };
