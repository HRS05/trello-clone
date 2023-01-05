const { json } = require("express");
const express = require("express");
const router = express.Router();
const userService = require("../Service/userService")();

const userController = () => {
    return {
        registerUser : async (req,res) =>{
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
            
            console.log(user);
            if(!user?.name || user?.name?.length == 0) return res.status(400).json({"message" : "Name required"});
            if(!user?.age || user?.age <18 || user.age > 65) return res.status(400).json({"message" : "age of user must be in between 18 to 85"});
            if(!user?.gender || user?.gender?.length == 0) return res.status(400).json({"message" : "gender required"});
            if(!user?.contactNumber || user?.contactNumber?.length != 10) return res.status(400).json({"message" : "size of mobile number should be 10"});
            if(!user?.emailId || user?.emailId?.length == 0) return res.status(400).json({"message" : "email required"});
            if(!user?.password || user?.password?.length == 0) return res.status(400).json({"message" : "Password required"});
            if(!user?.companyId || user?.companyId?.length == 0) return res.status(400).json({"message" : "companyId required"});
            if(!user?.companyName || user?.companyName?.length == 0) return res.status(400).json({"message" : "companyName required"});
            
            r = await userService.registerUserUtil(req)


            return res.status(r.status).json({"message" : r.message});
        },

        loginUser : async (req,res) =>{
            
            let emailId = req?.body?.emailId?.trim();
            let password = req?.body?.password?.trim();
            if(!emailId || emailId?.trim().length < 11) return res.status(400).json({"message" : "emailId required"});
            if(!password || password?.length == 0) return res.status(400).json({"message" : "Password required"});
            r = await userService.loginUserUtil(req)
            return res.status(r.status).json({"message" : r.message});
        },
    }
}
module.exports = userController;