import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespone } from "../interface/error";

const handleCastError = (err : mongoose.Error.CastError) : TGenericErrorRespone=>{

    const errorSources : TErrorSources = [{
        path: err.path,
        message : err.message,
    }] 


    const statusCode = 400;

    return {
      statusCode,
      message: 'Invalid ID',
      errorSources,
    };
};


export default handleCastError;