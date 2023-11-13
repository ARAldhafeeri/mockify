import { DATABASE_URL } from './getEnv';
import { initDefaultData } from './defaultData';
import {connect} from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;


connect(DATABASE_URL).then(async () => {
  console.log("Connected to database");
}).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  await initDefaultData()
}).catch((err) => {
  console.log(err);
});