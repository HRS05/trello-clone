const express = require("express");
const router = express.Router();
const taskController = require("../Controller/taskController")();
const auth = require("../Middleware/auth")

const taskAPI = () => {
    router.post("/createTask",taskController.createTask);

    return router;
}

module.exports = taskAPI;