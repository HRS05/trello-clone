const express = require("express");
const userDetailsModel = require("../Model/userDetailsModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const projectInfoModel = require("../Model/projectInfoModel");
require('dotenv').config();
const userService = require("../Service/userService")();


const projectService = () => {
    return {

        createProjectUtil : async (req) => {
            let project = new projectInfoModel();   
            project.name = req?.body?.name?.trim();
            project.description = req?.body?.description.trim();
            project.creatorId = req?.body?.creatorId?.trim();
            project.collaborators = req?.body?.collaborators;
            
            //validating user
            let x = await userService.checkUserByUserId(project.creatorId);
            if(x == false) {
                return {status : 400, message : {result : "creator user with id "+ creatorId + " not exists." }} 
            }

            //validating collaborators
            for(const m of project.collaborators){
                console.log(m.memberId);
                let x = await userService.checkUserByUserId(m.memberId);
                if(x == false) {
                    return {status : 400, message : {result : "user with id "+ m.memberId + " not exists." }} 
                }
            }

            // adding project in project table
            try{
                p = await project.save();
            }catch(e)
            {
                return {status : 400, message : {result : "Error in project creation -->  "+ e }}
            }
            //updating users created by array
                let projectDetails={};
                projectDetails.projectId = p._id;
                projectDetails.name = p.name;
                projectDetails.description = p.description;
                
                let c = await userService.updateUserCreatedProject(project.creatorId,projectDetails);
                if(c==false) {
                    try{
                        //deleting project from project table if above operation fails
                        await projectInfoModel.deleteOne({"_id" : p._id });
                    }catch(e){}
                    return {status : 400, message : {result : "Error in updating user creator projects -->  "}}
                }
            

            //updating users profile of collob. members array
            for(const m of project.collaborators){
                let projectDetails={};
                projectDetails.projectId = p._id;
                projectDetails.name = p.name;
                projectDetails.description = p.description;
                let x = await userService.updateUserJoinedProject(m.memberId,projectDetails);
                if(x == false) {
                    return {status : 200, message : {result : "Error in adding collobaration member try to add using inside feature"}}
                }
            }


            return {status : 200, message : {result : "project is created for collaboration" }}


        },
        checkProjectById : async (projectId) => {
            try{
                let user = await projectInfoModel.findOne({"_id" : projectId });
                if (!(user)){
                    return false;
                }
            }catch(e){
                return false;
            }
            return true;
        },

    };
}

module.exports = projectService;