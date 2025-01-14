import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorRespone } from '../interface/error';
import config from '../config';

const handleZodError = (err: ZodError): TGenericErrorRespone => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error ',
    errorSources,
    //stack : config.NODE_ENV === "development" ? err?.stack : null,
  };
};

export default handleZodError;
