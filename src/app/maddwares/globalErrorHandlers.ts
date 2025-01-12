/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

 

  let errorSources: TErrorSources = [{
    path: '',
    message: "Something went wrong!"
  }];

  

  if(err instanceof ZodError){
    const simplifiedError  = handleZodError(err)
    statusCode =  simplifiedError?.statusCode;
    message =simplifiedError?.message;
    errorSources : simplifiedError?.errorSources;
  }else if(err?.name === "ValidationError"){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message =simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  }else if(err?.name === "CastError"){
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message =simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  }else if(err?.code === 1000){
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message =simplifiedError?.message;
    errorSources = simplifiedError.errorSources;
  }

  //ultimate return
 res.status(statusCode).json({
    success: false,
    message,
    errorSources,
   
  });
};

export default globalErrorHandler;
