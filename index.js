const express = require("express");
const app = express();
var http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userAPI = require("./API/userAPI")();
const projectAPI = require("./API/projectAPI")();
const taskAPI = require("./API/taskAPI")();

require('dotenv').config();

const dbConnection = require("./DBConnection/db");
const { API_PORT } = process.env;

console.log("API_port ---> "+process.env.API_PORT);

let portNumber = process.env.API_PORT || 3000;
server.listen(portNumber, async function () {
    console.log("Server is running on " + portNumber);
    await dbConnection();
    app.use(bodyParser.json());
    app.use("/api/user/",userAPI);
    app.use("/api/project/",projectAPI);
    app.use("/api/task/",taskAPI);

});

