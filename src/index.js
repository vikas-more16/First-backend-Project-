import dotenv from "dotenv";
import DBConnection from "./db/index.js";
import app from "./app.js";

dotenv.config({
  Path: "./.env",
});

DBConnection()
  .then(
    app.listen(process.env.PORT || 3001, () => {
      console.log(`server is running on port:${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });
