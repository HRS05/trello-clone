const express = require("express");
const router = express.Router();
const projectController = require("../Controller/projectController")();
const auth = require("../Middleware/auth")

const projectAPI = () => {
    router.post("/createProject",auth,projectController.createProject);

    return router;
}

module.exports = projectAPI;