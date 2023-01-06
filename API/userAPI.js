const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController")();
const auth = require("../Middleware/auth");

const userAPI = () => {
  router.post("/registerUser", userController.registerUser);
  router.post("/loginUser", userController.loginUser);

  return router;
};

module.exports = userAPI;
