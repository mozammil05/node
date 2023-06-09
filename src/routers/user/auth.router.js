import express from "express";
import { userMiddleware } from "../../middlewares/user.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

import {
  register,
  login,
  logout,
} from "../../controller/auth.js";

import { deletedUser } from "../../controller/admin.access.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/deletedUser", adminMiddleware, deletedUser);

// adminMiddleware, AuthRouter.post("/logout", logout);

export default AuthRouter;
