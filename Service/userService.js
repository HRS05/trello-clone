const express = require("express");
const userDetailsModel = require("../Model/userDetailsModel");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userService = () => {
    return {
        registerUserUtil : async (req) =>{
            //add user to db
            //create transaction of user using payment id 
            
            let user = new userDetailsModel(); 
            user.name = req?.body?.name?.trim();
            user.age = req?.body?.age;
            user.gender = req?.body?.gender?.trim();
            user.contactNumber = req?.body?.contactNumber?.trim();
            user.emailId = req?.body?.emailId?.trim();
            user.password = req?.body?.password?.trim();
            user.companyId = req?.body?.companyId?.trim();
            user.companyName = req?.body?.companyName?.trim();
            
            let email=user.emailId;
            user.password = await bcrypt.hash(user.password, 10);
            try{
                u = await user.save();
            }catch(e)
            {
                return {status : 400, message : {result : "adding user error -->  "+ e }}
            }
            
            const token = jwt.sign(
                { user_id: u._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
              // save user token
              u.token = token;
              return {status : 200, message : {result : "User created ", data : u}};
              //console.log("return after adding "+ p);

        },


        loginUserUtil : async (req) =>{
            
            let emailId = req?.body?.emailId?.trim();
            let password = req?.body?.password?.trim();
            const user = await userDetailsModel.findOne({ emailId });

            if (!(user && (await bcrypt.compare(password, user.password)))){
                return {status : 400, message : {result : "Invalid User "+emailId+"  "+password}};
            }
                // Create token
                console.log("User ::--->>> " + user);
                const token = jwt.sign(
                { user_id: user._id, emailId },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
                );
                // save user token
                let response={};
                response.createdProject = user.createdProject;
                response.joinedProject = user.joinedProject;
                response.token = token;
                return {status : 200, message : {result : "logged IN", data : response}};

        },

        checkUserByUserId : async (userID) => {
            try{
                let user = await userDetailsModel.findOne({"_id" : userID });
                if (!(user)){
                    return false;
                }
            }catch(e){
                return false;
            }
            return true;
        },

        updateUserCreatedProject : async (userId,projectDetails) => {
            try{
                let user = await userDetailsModel.updateOne(
                    { _id: userId },
                    { $push: { createdProject : projectDetails } }
                 );
                if (!(user)){
                    return false;
                }
            }catch(e){
                console.log(e);
                return false;
            }
            return true;
        },
        updateUserJoinedProject : async (userId,projectDetails) => {
            try{
                let user = await userDetailsModel.updateOne(
                    { _id: userId },
                    { $push: { joinedProject : projectDetails } }
                 );
                if (!(user)){
                    return false;
                }
            }catch(e){
                console.log(e);
                return false;
            }
            return true;
        }

    };
}

module.exports = userService;