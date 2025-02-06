/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';

import express, { Request, Response } from 'express';
import globalErrorHandler from './app/maddwares/globalErrorHandlers';
import notFound from './app/maddwares/notFound';
import router from './app/routes';
import cookieParser  from 'cookie-parser';
const app = express();

// parsers
app.use(express.json());
app.use(cors({origin : ["http://localhost:5173/api/v1"]}));

// Application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  const a = 10;
  res.send({ value: a });
};

app.get('/', test);

console.log(process.cwd());

app.use(globalErrorHandler);

// not found
//app.use(notFound);

export default app;
