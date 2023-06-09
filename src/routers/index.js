import express from "express";
import AuthRouter from "./user/auth.router.js"

 

const rootRouter = express.Router();

rootRouter.use("/api/auth", AuthRouter);
rootRouter.use("/api/admin", AuthRouter);




export default rootRouter;



