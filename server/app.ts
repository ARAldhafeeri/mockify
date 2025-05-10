import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  API_ROUTE,
  AUTH_ROUTE,
  CACHE_ROUTE,
  CLIENT_ROUTE,
  DATA_ROUTE,
  EDGE_ROUTE,
  EDGE_ROUTE_WITH_PARAMS,
  ENDPOINT_ROUTE,
  EVENT_ROUTE,
  MOCK_ROUTE,
  POLICY_ROUTE,
  PROJECT_ROUTE,
  RESOURCE_ROUTE,
  USER_ROUTE,
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
import { ManagementEdgeRouter, PublicEdgeRouter } from "./routes/edge";
import cacheRouter from "./routes/cache";
import eventRouter from "./routes/event";
import clientRouter from "./routes/client";

const app = express();

app.use(cors());

app.use(morgan("combined"));
app.use(bodyParser.json());

app.use(AUTH_ROUTE, authRouter);

app.use(USER_ROUTE, userRouter);

app.use(POLICY_ROUTE, policyRouter);

app.use(PROJECT_ROUTE, projectRouter);

app.use(RESOURCE_ROUTE, resourceRouter);

app.use(DATA_ROUTE, dataRouter);

app.use(ENDPOINT_ROUTE, endpointRouter);

app.use(MOCK_ROUTE, mockRouter);

app.use(EDGE_ROUTE, ManagementEdgeRouter);
app.use(EDGE_ROUTE_WITH_PARAMS, PublicEdgeRouter);

app.use(CACHE_ROUTE, cacheRouter);

app.use(EVENT_ROUTE, eventRouter);

app.use(CLIENT_ROUTE, clientRouter);

applyServerHardening(app);

// catch errors
app.use(function (err: any, req: any, res: any, next: any) {
  console.error(err.stack);
  res.status(500).send({ status: false, message: ` error ${err}` });
});

// Display routes on app run
function print(path: any, layer: any) {
  if (layer.route) {
    layer.route.stack.forEach(
      print.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      print.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    console.log(
      "%s /%s",
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join("/")
    );
  }
}

function split(thing: any) {
  if (typeof thing === "string") {
    return thing.split("/");
  } else if (thing.fast_slash) {
    return "";
  } else {
    const match = thing
      .toString()
      .replace("\\/?", "")
      .replace("(?=\\/|$)", "$")
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, "$1").split("/")
      : "<complex:" + thing.toString() + ">";
  }
}

app._router.stack.forEach(print.bind(null, []));

export default app;
