import { DATABASE_URL } from "./getEnv";
import { initDefaultData } from "./defaultData";
import { connect } from "mongoose";
import app from "./app";
import redisClient from "./config/redis";
import EventService from "./services/event";
import { wss } from "./utils/ws";
import { IncomingMessage, createServer } from "http";
import { Socket } from "dgram";
import { readFileSync } from "fs";
import { Duplex } from "stream";

const eventService = new EventService();

const PORT = process.env.PORT || 5000;

// main db connecion
connect(DATABASE_URL)
  .then(async () => {
    console.log("Connected to database");
  })
  .then(async () => {
    app.set("port", PORT);
    // wss server
    const server = createServer(app);

    server.listen(PORT).on("listening", () => {
      console.log(`Listening on port ${PORT}`);
    });

    // handle server upgrade request
    server.on(
      "upgrade",
      function upgrade(request: IncomingMessage, socket: Duplex, head) {
        console.log("upgrade request");
        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit("connection", ws, request);
        });
      }
    );

    // redis database connection
    redisClient.connect();
    redisClient.on("error", (err) => {
      console.log("Redis error: ", err);
    });

    redisClient.on("connect", () => {
      console.log("Redis client connected");
    });
    // init default data
    await initDefaultData();
    // gracefully update runtime with events
    await eventService.dynamicallyAddAllEventsOnRuntime();
  })
  .catch((err) => {
    console.log(err);
  });
