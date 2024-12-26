import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //validation
    // if everything allright next() ->
    try {
      await schema.parseAsync({
        body: req.body,

      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
