const express = require("express");
const taskInfoModel = require("../Model/taskInfoModel");
const projectUtils = require("../Utils/projectUtils")();
require("dotenv").config();
const userUtils = require("../Utils/userUtils")();

const taskService = () => {
  return {
    createTaskUtil: async (req) => {
      let task = new taskInfoModel();
      task.projectId = req?.body?.projectId?.trim();
      task.assigneedById = req?.body?.assigneedById?.trim();
      task.assigneedBy = req?.body?.assigneedBy?.trim();
      task.stage = req?.body?.stage?.trim();
      task.assigneeId = req?.body?.assigneeId?.trim();
      task.assignee = req?.body?.assignee?.trim();
      task.dueDate = req?.body?.dueDate?.trim();
      task.description = req?.body?.description?.trim();
      task.commentInfo = [];
      task.likeInfo = [];

      //validating assigneedById
      let user = await userUtils.checkUserByUserId(task.assigneedById);

      //validating assigneeId
      user = await userUtils.checkUserByUserId(task.assigneeId);

      // validating projectId
      user = await projectUtils.checkProjectById(task.projectId);

      try {
        let t = await task.save();
      } catch (e) {
        throw new Error("adding task error -->  " + e);
      }

      return { result: "task assigneed" };
    },

    getTasksUtil: async (req) => {
      let projectId = req?.body?.projectId?.trim();
      // validating projectId
      let user = await projectUtils.checkProjectById(projectId);

      let response = {};
      response.backlog = [];
      response.inProgress = [];
      response.done = [];
      response.ready = [];
      try {
        let tasks = await taskInfoModel.find({ projectId: projectId });
        //console.log(tasks);
        if (!tasks) {
          throw new Error("project user id : " + projectId + " not exists.");
        }

        for (const task of tasks) {
          if (task.stage == "In Progress") response.inProgress.push(task);
          else if (task.stage == "Done") response.done.push(task);
          else if (task.stage == "Ready") response.ready.push(task);
          else if (task.stage == "Backlog") response.backlog.push(task);
        }
      } catch (e) {
        console.log(e);
        throw new Error(
          "project user id : " + projectId + " not exists. + error : " + e
        );
      }
      return { result: response };
    },

    changeTaskStageUtil: async (req) => {
      let taskId = req?.body?.taskId?.trim();
      let stage = req?.body?.newStage?.trim();

      try {
        let task = await taskInfoModel.findOne({ _id: taskId });
        if (!task)
          throw new Error("Invalid task Id  : " + taskId + " not exists.");
        task.stage = stage;
        task.save();
      } catch (e) {
        throw new Error(
          "Invalid task Id  : " + taskId + " not exists. + error : " + e
        );
      }
      return { result: "Updated successfully" };
    },

    updateTaskUtil: async (req) => {
      let taskId = req?.body?.taskId?.trim();
      let task = new taskInfoModel();
      task.projectId = req?.body?.projectId?.trim();
      task.assigneedById = req?.body?.assigneedById?.trim();
      task.assigneedBy = req?.body?.assigneedBy?.trim();
      task.stage = req?.body?.stage?.trim();
      task.assigneeId = req?.body?.assigneeId?.trim();
      task.assignee = req?.body?.assignee?.trim();
      task.dueDate = req?.body?.dueDate?.trim();
      task.description = req?.body?.description?.trim();
      task.likeInfo = req?.body?.likeInfo;
      task.commentInfo = req?.body?.commentInfo;

      //validating assigneedById
      let user = await userUtils.checkUserByUserId(task.assigneedById);

      //validating assigneeId
      user = await userUtils.checkUserByUserId(task.assigneeId);

      // validating projectId
      user = await projectUtils.checkProjectById(task.projectId);

      try {
        let oldTask = await taskInfoModel.findOne({ _id: taskId });
        if (!oldTask)
          throw new Error("Invalid task Id  : " + taskId + " not exists.");
        oldTask.projectId = task.projectId;
        oldTask.assigneedById = task.assigneedById;
        oldTask.assigneedBy = task.assigneedBy;
        oldTask.stage = task.stage;
        oldTask.assigneeId = task.assigneeId;
        oldTask.assignee = task.assignee;
        oldTask.dueDate = task.dueDate;
        oldTask.description = task.description;
        oldTask.likeInfo = task.likeInfo;
        oldTask.commentInfo = task.commentInfo;
        oldTask.save();
      } catch (e) {
        throw new Error(
          "Invalid task Id  : " + taskId + " not exists. + error : " + e
        );
      }

      return { result: "task updated" };
    },
  };
};

module.exports = taskService;
