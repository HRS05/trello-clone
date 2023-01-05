const express = require("express");
const router = express.Router();
const taskController = require("../Controller/taskController")();
const auth = require("../Middleware/auth")

const taskAPI = () => {
    router.post("/createTask",auth,taskController.createTask);
    router.post("/getTasks",auth,taskController.getTasks);
    router.post("/changeTaskStage",auth,taskController.changeTaskStage);
    return router;
}

module.exports = taskAPI;