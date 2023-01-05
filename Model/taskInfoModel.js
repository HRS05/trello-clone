var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    mongoose.Promise = global.Promise;
    
var taskSchema = new mongoose.Schema(
    {
        projectId : String,
        assigneedById : String,
        assigneedBy : String,
        stage : String,
        commentInfo : Array,//[{userId : String,comment : String}],
        likeInfo : Array,//[{userId : String,like : {type : Boolean, default : false}}],
        assigneeId : String,
        assigneeName : String,
        dueDate : Date,
        description : String,
    },
    { timestamps: true }
);
module.exports = mongoose.models.taskInfoModel || mongoose.model('taskInfoModel', taskSchema);
