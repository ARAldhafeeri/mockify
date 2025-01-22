import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  API_ROUTE,
  CACHE_ROUTE,
  CLIENT_ROUTE,
  DATA_ROUTE,
  EDGE_ROUTE,
  ENDPOINT_ROUTE,
  EVENT_ROUTE,
  MOCK_ROUTE,
  POLICY_ROUTE,
  PROJECT_ROUTE,
  RESOURCE_ROUTE,
} from "./config/routes";
import applyServerHardening from "./middleware/security";
import policyRouter from "./routes/policy";
import morgan from "morgan";

// routes
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import projectRouter from "./routes/project";
import resourceRouter from "./routes/resource";
import dataRouter from "./routes/data";
import endpointRouter from "./routes/endpoint";
import mockRouter from "./routes/mock";
import edgeRouter from "./routes/edge";
import cacheRouter from "./routes/cache";
import eventRouter from "./routes/event";
import clientRouter from "./routes/client";

const app = express();

app.use(cors());
// mockify will be communicated with variable origins, currently we will disable it
// in the future we can implement dynamic plocies for cors and origins managaments
app.use(async (req, res, next) => {
  try {
    await res.set({
      "Access-Control-Allow-Headers":
        "content-type, api-key, uid, id, redirect_uri",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Expose-Headers": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin":
        req.get("origin") || req.get("referer") || req.get("Host"),
    });

    next();
  } catch (err) {
    return next(err);
  }
});
app.use(morgan("combined"));
app.use(bodyParser.json());

app.use(API_ROUTE, authRouter);

app.use(API_ROUTE, userRouter);

app.use(POLICY_ROUTE, policyRouter);

app.use(PROJECT_ROUTE, projectRouter);

app.use(RESOURCE_ROUTE, resourceRouter);

app.use(DATA_ROUTE, dataRouter);

app.use(ENDPOINT_ROUTE, endpointRouter);

app.use(MOCK_ROUTE, mockRouter);

app.use(EDGE_ROUTE, edgeRouter);

app.use(CACHE_ROUTE, cacheRouter);

app.use(EVENT_ROUTE, eventRouter);

app.use(CLIENT_ROUTE, clientRouter);

applyServerHardening(app);

// catch errors
app.use(function (err: any, req: any, res: any, next: any) {
  console.error(err.stack);
  res.status(500).send({ status: false, message: ` error ${err}` });
});

export default app;
