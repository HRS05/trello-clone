const { json } = require("express");
const express = require("express");
const router = express.Router();
const taskService = require("../Service/taskService")();

const taskController = () => {
    return {
        createTask : async (req,res) =>{
            console.log("hhheyyy-->"+req.body.name);
            let task={};
            task.projectId = req?.body?.projectId?.trim();
            task.assigneedById = req?.body?.assigneedById?.trim();
            task.assigneedBy = req?.body?.assigneedBy?.trim();
            task.stage = req?.body?.stage?.trim();
            task.assigneeId = req?.body?.assigneeId?.trim();
            task.assignee = req?.body?.assignee?.trim();
            task.dueDate = req?.body?.dueDate?.trim();
            task.description = req?.body?.description?.trim();

            
            if(!task?.projectId || task?.projectId?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.assigneedById || task?.assigneedById?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.assigneedBy || task?.assigneedBy?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.stage || task?.stage?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.assigneeId || task?.assigneeId?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.assignee || task?.assignee?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.dueDate || task?.dueDate?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!task?.description || task?.description?.length == 0) return res.status(400).json({"message" : "Name required"});


            
            r = await taskService.createTaskUtil(req)


            return res.status(r.status).json({"message" : r.message});
        },
    }
}
module.exports = taskController;