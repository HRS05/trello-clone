const express = require("express");
const projectInfoModel = require("../Model/projectInfoModel");
require('dotenv').config();


const projectUtils = () => {
    return {
        checkProjectById : async (projectId) => {
            try{
                let project = await projectInfoModel.findOne({"_id" : projectId });
                if (!(project)){
                    throw new Error("project having Id : "+projectId+" not Exists");
                }
                return project;
            }catch(e){
                throw new Error("project having Id : "+projectId+" not Exists");

            }
        },

    };
}

module.exports = projectUtils;