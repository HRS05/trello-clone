const { json } = require("express");
const express = require("express");
const router = express.Router();
const projectService = require("../Service/projectService")();

const projectController = () => {
  return {
    createProject: async (req, res) => {
      try {
        let project = {};
        project.name = req?.body?.name?.trim();
        project.creatorId = req?.body?.creatorId?.trim();
        project.description = req?.body?.description;

        if (!project?.name || project?.name?.length == 0)
          throw new Error("project Name required");
        if (!project?.creatorId || project?.creatorId?.length == 0)
          throw new Error("creator Id required for project creation");

        r = await projectService.createProjectUtil(req);
        return res.status(200).json({ message: r });
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }
    },
  };
};
module.exports = projectController;
