const { json } = require("express");
const express = require("express");
const router = express.Router();
const projectService = require("../Service/projectService")();

const projectController = () => {
    return {
        createProject : async (req,res) =>{
            console.log("hhheyyy-->"+req.body.name);
            let project={};
            project.name = req?.body?.name?.trim();
            project.creatorId = req?.body?.creatorId?.trim();
            project.description = req?.body?.description;
            
            if(!project?.name || project?.name?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!project?.creatorId || project?.creatorId?.length == 0) return res.status(400).json({"message" : "creator Id required"});
            
            r = await projectService.createProjectUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },
    }
}
module.exports = projectController;