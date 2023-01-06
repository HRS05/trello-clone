const { json } = require("express");
const express = require("express");
const router = express.Router();
const taskService = require("../Service/taskService")();

const taskController = () => {
  return {
    createTask: async (req, res) => {
      try {
        let task = {};
        task.projectId = req?.body?.projectId?.trim();
        task.assigneedById = req?.body?.assigneedById?.trim();
        task.assigneedBy = req?.body?.assigneedBy?.trim();
        task.stage = req?.body?.stage?.trim();
        task.assigneeId = req?.body?.assigneeId?.trim();
        task.assignee = req?.body?.assignee?.trim();
        task.dueDate = req?.body?.dueDate?.trim();
        task.description = req?.body?.description?.trim();

        if (!task?.projectId || task?.projectId?.length == 0)
          throw new Error("projectId required");
        if (!task?.assigneedById || task?.assigneedById?.length == 0)
          throw new Error("assigneedById required");
        if (!task?.assigneedBy || task?.assigneedBy?.length == 0)
          throw new Error("assigneedBy required");
        if (!task?.stage || task?.stage?.length == 0)
          throw new Error("stage required");
        if (
          task.stage != "In Progress" &&
          task.stage != "Done" &&
          task.stage != "Backlog" &&
          task.stage != "Ready"
        )
          throw new Error("please select correct stage");
        if (!task?.assigneeId || task?.assigneeId?.length == 0)
          throw new Error("assigneeId required");
        if (!task?.assignee || task?.assignee?.length == 0)
          throw new Error("assignee required");
        if (!task?.dueDate || task?.dueDate?.length == 0)
          throw new Error("dueDate required");
        if (!task?.description || task?.description?.length == 0)
          throw new Error("description required");

        r = await taskService.createTaskUtil(req);
        return res.status(200).json({ message: r });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    },

    getTasks: async (req, res) => {
      try {
        let projectId = req?.body?.projectId?.trim();
        if (!projectId || projectId?.length == 0)
          throw new Error("projectId required");
        r = await taskService.getTasksUtil(req);
        return res.status(200).json({ message: r });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    },

    changeTaskStage: async (req, res) => {
      try {
        let taskId = req?.body?.taskId?.trim();
        let stage = req?.body?.newStage?.trim();

        if (!taskId || taskId?.length == 0) throw new Error("taskId required");
        if (!stage || stage?.length == 0) throw new Error("stage required");
        if (
          stage != "In Progress" &&
          stage != "Done" &&
          stage != "Backlog" &&
          stage != "Ready"
        )
          throw new Error("please select correct stage");

        r = await taskService.changeTaskStageUtil(req);
        return res.status(200).json({ message: r });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    },

    updateTask: async (req, res) => {
      try {
        let task = {};
        task.taskId = req?.body?.taskId?.trim();
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

        if (!task?.taskId || task?.taskId?.length == 0)
          throw new Error("taskId required");
        if (!task?.projectId || task?.projectId?.length == 0)
          throw new Error("projectId required");
        if (!task?.assigneedById || task?.assigneedById?.length == 0)
          throw new Error("assigneedById required");
        if (!task?.assigneedBy || task?.assigneedBy?.length == 0)
          throw new Error("assigneedBy required");
        if (!task?.stage || task?.stage?.length == 0)
          throw new Error("stage required");
        if (
          task.stage != "In Progress" &&
          task.stage != "Done" &&
          task.stage != "Backlog" &&
          task.stage != "Ready"
        )
          throw new Error("please select correct stage");
        if (!task?.assigneeId || task?.assigneeId?.length == 0)
          throw new Error("assigneeId required");
        if (!task?.assignee || task?.assignee?.length == 0)
          throw new Error("assignee required");
        if (!task?.dueDate || task?.dueDate?.length == 0)
          throw new Error("dueDate required");
        if (!task?.description || task?.description?.length == 0)
          throw new Error("description required");
        if (!task?.likeInfo) throw new Error("Like Info array required");
        if (!task?.commentInfo) throw new Error("Comment Info array required");

        r = await taskService.updateTaskUtil(req);

        return res.status(200).json({ message: r });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    },
  };
};
module.exports = taskController;
