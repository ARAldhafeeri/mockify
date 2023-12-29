import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { API_ROUTE } from './config/routes';
import applyServerHardening from './middleware/security';
import policyRouter from './routes/policy';
import morgan from "morgan";

// routes 
import authRouter from "./routes/auth";
import userRouter from './routes/user';
import projectRouter from './routes/project';
import resourceRouter from './routes/resource';
import dataRouter from './routes/data';
import endpointRouter from './routes/endpoint';
import mockRouter from './routes/mock';
import edgeRouter from './routes/edge';

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(morgan('combined'))
app.use(bodyParser.json());

app.use(API_ROUTE, authRouter);

app.use(API_ROUTE, userRouter);

app.use(API_ROUTE, policyRouter)

app.use(API_ROUTE, projectRouter)

app.use(API_ROUTE, resourceRouter)

app.use(API_ROUTE, dataRouter)

app.use(API_ROUTE, endpointRouter)

app.use(API_ROUTE, mockRouter)

app.use(API_ROUTE, edgeRouter)

applyServerHardening(app)

// catch errors 
app.use(function(err : any, req : any, res : any , next : any) {
  console.error(err.stack)
  res.status(500).send({status: false, message: ` error ${err}`})
})

export default app;
