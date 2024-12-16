import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500 ;
  let message =err.message || 'Something went wrong!';
  

  return res.status(statusCode).json({
    success:false,
    message,
    error : err,
  })
})

export default app;
