import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {  // Added missing parenthesis and arrow

  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: result,
  });

});
const changePassword = catchAsync(async (req, res) => {  // Added missing parenthesis and arrow


  const {...passwordData} = req.body;
   const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is updated successfully!",
    data: result,
  });

});

export const AuthControllers = {
  loginUser,
  changePassword
};