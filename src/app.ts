import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;
