/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';

import express, { Request, Response } from 'express';
import globalErrorHandler from './app/maddwares/globalErrorHandlers';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import notFound from './app/maddwares/notFound';
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send({ value: a });
};

app.get('/', getAController);

console.log(process.cwd());

app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
