const express = require("express");
const projectInfoModel = require("../Model/projectInfoModel");
const userUtils = require("../Utils/userUtils")();
require('dotenv').config();


const projectService = () => {
    return {

        createProjectUtil : async (req) => {
            let project = new projectInfoModel();   
            project.name = req?.body?.name?.trim();
            project.description = req?.body?.description.trim();
            project.creatorId = req?.body?.creatorId?.trim();
            project.collaborators = req?.body?.collaborators;
            
            //validating user
            let x = await userUtils.checkUserByUserId(project.creatorId);

            //validating collaborators
            for(const m of project.collaborators){
                console.log(m.memberId);
                let x = await userUtils.checkUserByUserId(m.memberId);
            }

            // adding project in project table
            try{
                p = await project.save();
            }catch(e)
            {
                throw new Error("Error in project creation -->  "+ e);
            }
            //updating users created by array
                let projectDetails={};
                projectDetails.projectId = p._id;
                projectDetails.name = p.name;
                projectDetails.description = p.description;
                
                try{
                await userUtils.updateUserCreatedProject(project.creatorId,projectDetails);
                }catch(e){
                    //deleting project from project table if above operation fails
                    await projectInfoModel.deleteOne({"_id" : p._id });
                    throw new Error("Error in updating user creator projects -->  "+e.message);
                }
                
            

            //updating users profile of collob. members array
            for(const m of project.collaborators){
                let projectDetails={};
                projectDetails.projectId = p._id;
                projectDetails.name = p.name;
                projectDetails.description = p.description;
                await userUtils.updateUserJoinedProject(m.memberId,projectDetails);
            }


            return {result : "project is created for collaboration" }


        },

    };
}

module.exports = projectService;