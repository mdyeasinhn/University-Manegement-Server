import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorRespone } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorRespone => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
