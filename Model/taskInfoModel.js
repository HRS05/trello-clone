var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var taskSchema = new mongoose.Schema(
  {
    projectId: String,
    assigneedById: String,
    assigneedBy: String,
    stage: String,
    commentInfo: Array,
    likeInfo: Array,
    assigneeId: String,
    assignee: String,
    dueDate: Date,
    description: String,
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.taskInfoModel || mongoose.model("taskInfoModel", taskSchema);
