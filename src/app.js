import cookieParser from "cookie-parser";
import express from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routers
import userRouter from "./routes/user.routes.js";

//declaration of router
app.use("/api/v1/users", userRouter);

export default app;
