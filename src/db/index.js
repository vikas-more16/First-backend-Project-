import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DBConnection = async () => {
  try {
    console.log(`${process.env.MONGO_URI}/${DB_NAME}`);
    const Connectioninstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      "Database is connected sucessfully !! at host : ",
      Connectioninstance.connection.host
    );
  } catch (error) {
    console.error("Error in Database Connection.", error);
    process.exit(1);
  }
};

export default DBConnection;
