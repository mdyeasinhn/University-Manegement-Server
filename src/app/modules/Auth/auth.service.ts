import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {

  // checking if the user is exist
  const user = await User.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user is not found !")
  };

  // checking if user isdeleted 

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "The user is not deleted ! ")
  }

  // // checking if user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "The user is Blocked ! ")
  };

  // // checking if the password correct

  if (! await (User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched !");

  //create token and sent to the client 

  const jwtPayload = {
    userId  : user.id,
    role : user.role
  }
  const accessToken = jwt.sign( jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

  return {
    accessToken,
    needsPasswordChange : user?.needsPasswordChange
  }
};

export const AuthServices = {
  loginUser,
};