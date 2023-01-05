const { json } = require("express");
const express = require("express");
const router = express.Router();
const userService = require("../Service/userService")();

const userController = () => {
    return {
        registerUser : async (req,res) =>{
            try{
            console.log("hhheyyy-->"+req.body.name);
            let user={};
            user.name = req?.body?.name?.trim();
            user.age = req?.body?.age;
            user.gender = req?.body?.gender?.trim();
            user.contactNumber = req?.body?.contactNumber?.trim();
            user.emailId = req?.body?.emailId?.trim();
            user.password = req?.body?.password;
            user.companyId = req?.body?.companyId;
            user.companyName = req?.body?.companyName;
            
            if(!user?.name || user?.name?.length == 0) throw new Error("Name required");
            if(!user?.age || user?.age <18 || user.age > 65) throw new Error("age of user must be in between 18 to 85"); 
            if(!user?.gender || user?.gender?.length == 0) throw new Error("gender required");
            if(!user?.contactNumber || user?.contactNumber?.length != 10) throw new Error("size of mobile number should be 10");
            if(!user?.emailId || user?.emailId?.length < 11) throw new Error("correct email required");
            if(!user?.password || user?.password?.length == 0) throw new Error("Password required");
            if(!user?.companyId || user?.companyId?.length == 0) throw new Error("companyId required");
            if(!user?.companyName || user?.companyName?.length == 0) throw new Error("companyName required");
            
            r = await userService.registerUserUtil(req)
            return res.status(200).json({"message" : r});
            }catch(e){
                return res.status(400).json({"message" : e.message});
            }
        },

        loginUser : async (req,res) =>{
            try{
            let emailId = req?.body?.emailId?.trim();
            let password = req?.body?.password?.trim();
            if(!emailId || emailId?.length < 11) throw new Error("correct email required");
            if(!password || password?.length == 0) throw new Error("Password required");
            r = await userService.loginUserUtil(req)
            return res.status(200).json({"message" : r});
            }catch(e){
                return res.status(400).json({"message" : e.message});
            }
        },
    }
}
module.exports = userController;