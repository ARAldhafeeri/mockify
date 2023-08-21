import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connect} from "mongoose";
import userRouter from "./routes/user";
import { API_ROUTE } from './config/routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(API_ROUTE, userRouter);

const PORT = process.env.PORT || 5000;

connect(`${process.env.DATABASE_URL}`).then(async () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.log(err);
});

export default app;
