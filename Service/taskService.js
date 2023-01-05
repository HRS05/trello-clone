const express = require("express");
const userDetailsModel = require("../Model/userDetailsModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const projectInfoModel = require("../Model/projectInfoModel");
const taskInfoModel = require("../Model/taskInfoModel");
const projectService = require("./projectService")();
require('dotenv').config();
const userService = require("../Service/userService")();


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

            
            //validating assigneedById
            let x = await userService.checkUserByUserId(task.assigneedById);
            if(x == false) {
                return {status : 400, message : {result : "creator user with assigneedById "+ task.assigneedById + " not exists." }} 
            }

            //validating assigneeId
            x = await userService.checkUserByUserId(task.assigneeId);
            if(x == false) {
                return {status : 400, message : {result : "creator user with assigneeId "+ task.assigneeId + " not exists." }} 
            }

            // validating projectId
            x = await projectService.checkProjectById(task.projectId);
            if(x == false) {
                return {status : 400, message : {result : "project user id : "+ task.projectId + " not exists." }} 
            }

            try{
                let t = await task.save();
            }catch(e)
            {
                return {status : 400, message : {result : "adding user error -->  "+ e }}
            }



           


            return {status : 200, message : {result : "task assigneed" }}


        },

    };
}

module.exports = taskService;