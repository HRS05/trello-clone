var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    creatorId: String,
    collaborators: Array, //[{memberId : String}],
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.projectInfoModel ||
  mongoose.model("projectInfoModel", projectSchema);
