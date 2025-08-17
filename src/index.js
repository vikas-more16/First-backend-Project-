import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
console.log(
  "Cloudinary ENV test:",
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

import DBConnection from "./db/index.js";
import app from "./app.js";

DBConnection()
  .then(
    app.listen(process.env.PORT || 3001, () => {
      console.log(`server is running on port:${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });
