import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from "./routes/auth";
import { API_ROUTE } from './config/routes';
import applyServerHardening from './middleware/security';
import userRouter from './routes/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(API_ROUTE, authRouter);

app.use(API_ROUTE, userRouter);

applyServerHardening(app)

// catch errors 
app.use(function(err : any, req : any, res : any , next : any) {
  console.error(err.stack)
  res.status(500).send({status: false, message: `unexpected error ${err}`})
})

export default app;
