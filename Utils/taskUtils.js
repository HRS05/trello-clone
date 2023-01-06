const express = require("express");
const taskInfoModel = require("../Model/taskInfoModel");
require("dotenv").config();

const taskUtils = () => {
  return {
    checkTaskById: async (taskId) => {
      try {
        let task = await taskInfoModel.findOne({ _id: taskId });
        if (!user) {
          throw new Error("task having Id : " + taskId + " not Exists");
        }
        return task;
      } catch (e) {
        throw new Error("task having Id : " + taskId + " not Exists");
      }
    },
  };
};

module.exports = taskUtils;
