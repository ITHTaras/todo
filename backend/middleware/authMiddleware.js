const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get JWT from headers
      token = req.headers.authorization.split(" ")[1];

      // Decode JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user by their ID from decoded body
      const user = await User.findById(decoded.id).select("-password");

      // Store user in request(req variable) to access it in other requests
      req.user = user;

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
