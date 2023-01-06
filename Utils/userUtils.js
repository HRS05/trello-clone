const express = require("express");
const userDetailsModel = require("../Model/userDetailsModel");
require("dotenv").config();

const userUtils = () => {
  return {
    checkUserByUserId: async (userId) => {
      try {
        let user = await userDetailsModel.findOne({ _id: userId });
        if (!user) {
          throw new Error("User having Id : " + userId + " not Exists");
        }
        return user;
      } catch (e) {
        throw new Error("User having Id : " + userId + " not Exists");
      }
    },

    updateUserCreatedProject: async (userId, projectDetails) => {
      try {
        await userDetailsModel.updateOne(
          { _id: userId },
          { $push: { createdProject: projectDetails } }
        );
        return true;
      } catch (e) {
        console.log(e);
        throw new Error(
          "User having Id : " +
            userId +
            " is not updated in user's created project profile"
        );
      }
    },
    updateUserJoinedProject: async (userId, projectDetails) => {
      try {
        await userDetailsModel.updateOne(
          { _id: userId },
          { $push: { joinedProject: projectDetails } }
        );
        return true;
      } catch (e) {
        console.log(e);
        throw new Error(
          "User having Id : " +
            userId +
            " is not updated in user's joined project profile"
        );
      }
    },
  };
};

module.exports = userUtils;
