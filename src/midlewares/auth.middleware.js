import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const rawHeader = req.header("Authorization");
    console.log("Raw Auth Header:", rawHeader);
    console.log("Cookie accessToken:", req.cookies?.accessToken);

    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : rawHeader && rawHeader.startsWith("Bearer ")
        ? rawHeader.split(" ")[1]
        : null;

    console.log("Extracted Token:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
