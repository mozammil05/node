import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import rootRouter from "./routers/index.js";

import connectDB from "./database/db.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev")); // use only in dev

dotenv.config();


// middleware

app.use(cookieParser());
app.use(express.json());

app.use(rootRouter);
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
