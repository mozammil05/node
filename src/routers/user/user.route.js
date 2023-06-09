import express from "express";
import {createTelegram} from '../../controller/telegramDetails.js'
// import  {userMiddleware} from '../../middlewares/user.middleware.js'
import {
  updatedUser,
  deletedUser,
  getUser,
  getAllUser,
  uploadProfile,
} from "./../../controller/user.js";
import { createProfile, updateProfile } from "../../controller/profile.js";
import { userMiddleware } from "./../../middlewares/user.middleware.js";
import upload from "./../../middlewares/uploadSingle.js";

const UserRouter = express.Router();


UserRouter.post(
  "/create-profile",
  userMiddleware,
  // upload.single("image"),
  upload.array('image',1),
  createProfile
); // this route for addional info

UserRouter.put(
  "/update",
  userMiddleware,
  // upload.single("image"),
  upload.array('image',1),
  updateProfile
); //update




// UserRouter.post( "/upload", userMiddleware,upload.single("image"),uploadProfile); //update exiting user

export default UserRouter;
