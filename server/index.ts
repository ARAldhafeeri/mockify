import { DATABASE_URL } from './getEnv';
import { DefaultData } from './defaultData';
import {connect} from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

console.log('index.ts: ', DATABASE_URL)

connect(DATABASE_URL).then(async () => {
  console.log("Connected to database");
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  console.log("DefaultData", DefaultData)
}).catch((err) => {
  console.log(err);
});