const express = require("express");
const taskInfoModel = require("../Model/taskInfoModel");
const projectUtils = require("../Utils/projectUtils")();
require('dotenv').config();
const userUtils = require("../Utils/userUtils")();


const taskService = () => {
    return {

        createTaskUtil : async (req) => {
            let task=new taskInfoModel();
            task.projectId = req?.body?.projectId?.trim();
            task.assigneedById = req?.body?.assigneedById?.trim();
            task.assigneedBy = req?.body?.assigneedBy?.trim();
            task.stage = req?.body?.stage?.trim();
            task.assigneeId = req?.body?.assigneeId?.trim();
            task.assignee = req?.body?.assignee?.trim();
            task.dueDate = req?.body?.dueDate?.trim();
            task.description = req?.body?.description?.trim();
            task.commentInfo = [];
            task.likeInfo = [];

            
            //validating assigneedById
            let x = await userUtils.checkUserByUserId(task.assigneedById);

            //validating assigneeId
            x = await userUtils.checkUserByUserId(task.assigneeId);
            
            // validating projectId
            x = await projectUtils.checkProjectById(task.projectId);
            

            try{
                let t = await task.save();
            }catch(e)
            {
                throw new Error("adding task error -->  "+ e);
            }

            return{result : "task assigneed" };

        },

        getTasksUtil : async (req) => {
            let projectId = req?.body?.projectId?.trim();
             // validating projectId
             x = await projectUtils.checkProjectById(projectId);
             
             let response={};
             response.backlog=[];
             response.inProgress=[];
             response.done=[];
             response.ready=[];
             try{
                let tasks = await taskInfoModel.find({"projectId" : projectId });
                //console.log(tasks);
                if (!(tasks)){
                    throw new Error("project user id : "+ projectId + " not exists."); 
                }

                for(const task of tasks){
                    if(task.stage == "In Progress")  response.inProgress.push(task);
                    else if(task.stage == "Done")  response.done.push(task);
                    else if(task.stage == "Ready")  response.ready.push(task);
                    else if(task.stage == "Backlog")  response.backlog.push(task);
                }

            }catch(e){
                console.log(e);
                throw new Error("project user id : "+ projectId + " not exists. + error : "+e);
            }
            return {result : response };
        },

        changeTaskStageUtil : async (req) => {
            let taskId = req?.body?.taskId?.trim();
            let stage = req?.body?.newStage?.trim();

             try{
                let task = await taskInfoModel.findOne({"_id" : taskId });
                if(!task) throw new Error("Invalid task Id  : "+ taskId + " not exists.");
                task.stage = stage;
                task.save();
             }catch(e){
                throw new Error("Invalid task Id  : "+ taskId + " not exists. + error : "+e);
             }
             return {result : "Updated successfully" }
        }

    };
}

module.exports = taskService;