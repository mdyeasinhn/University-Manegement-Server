import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {

  // checking if the user is exist
  const isUserExist = await User.findOne({ id: payload?.id });
  console.log(isUserExist);



  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "The user is not found ! ")
  };

  // checking if user isdeleted 

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "The user is not deleted ! ")
  }

  // checking if user is blocked
  const userStatus = isUserExist?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user is Blocked ! ")
  };

  // checking if the password correct

  const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExist?.password);
  console.log("password-->", isPasswordMatched);
  return {}
};

export const AuthServices = {
  loginUser,
};