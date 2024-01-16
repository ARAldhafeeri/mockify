import { DATABASE_URL } from './getEnv';
import { initDefaultData } from './defaultData';
import {connect} from "mongoose";
import app from "./app";
import redisClient from './redis';

const PORT = process.env.PORT || 5000;


connect(DATABASE_URL).then(async () => {
  console.log("Connected to database");
}).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  redisClient.connect();
  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });
  
  redisClient.on('connect', () => {
    console.log('Redis client connected');
  });
  await initDefaultData()
}).catch((err) => {
  console.log(err);
});

