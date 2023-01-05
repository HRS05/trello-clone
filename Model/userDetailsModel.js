var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;
    
var userSchema = new mongoose.Schema(
    {
       name : String,
       gender : String,
       age : Number,
       createdProject: Array,//[{projectId:String, projectName:String, projectDescription:String}],
       joinedProject: Array,//[{projectId:String, projectName:String, projectDescription:String,monitoringPrivileges : {type : Boolean,default : false}}],
       contactNumber : { type: String, unique: true },
       emailId : { type: String, unique: true },
       password : String,
       companyId : String,
       companyName : String,
       token : String,
    },
    { timestamps: true }
);
module.exports = mongoose.models.userDetailsModel || mongoose.model('userDetailsModel', userSchema);
