import { DATABASE_URL } from './getEnv';
import { initDefaultData } from './defaultData';
import {connect} from "mongoose";
import app from "./app";
import redisClient from './redis';
import EventService from './services/event';
import { wss } from './utils/ws';
import { IncomingMessage, createServer } from 'http';
import { Socket } from 'dgram';
import { readFileSync } from 'fs';
import { Duplex } from 'stream';
import ClientService from './services/client';
import {WEB_SOCKET_PORT} from "./getEnv"

const wssClientService = new ClientService();

const eventService = new EventService();

const PORT = process.env.PORT || 5000;

// main db connecion
connect(DATABASE_URL).then(async () => {
  console.log("Connected to database");
}).then(async () => {
  // wss client credentials verification
  const verifyClient = async (info : any, done : any) => {
    let id = info.req.headers["websocket-clientId"];
    let secret = info.req.headers["websocket-clientSecret"];
    let client = await wssClientService.find({id, secret});
    if (!client) return done(false, 401, "Unauthorized");
    return done(true);
  };

  app.set('port', PORT);
  // wss server
  const server = createServer(app);

  server.listen(PORT).on('listening', () => {
    console.log(`Listening on port ${PORT}`);
  });
  
  // handle server upgrade request
  server.on('upgrade', function upgrade(request : IncomingMessage, socket : Duplex, head) {
    console.log('upgrade request')
    wss.handleUpgrade(request, socket, head, function  done(ws){
      // verify client credentials
      const info = {req: request};

      verifyClient(info, function (verified : boolean, code : number, message : string) {
        if (!verified) {
          ws.send(`HTTP/1.1 ${code} ${message}\r\n\r\n`);
          ws.close();

        }else {
          wss.emit('connection', ws, request);
        }
      });
    })
  });

  // redis database connection
  redisClient.connect();
  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });
  
  redisClient.on('connect', () => {
    console.log('Redis client connected');
  });
  // init default data
  await initDefaultData()
  // gracefully update runtime with events
  await eventService.dynamicallyAddAllEventsOnRuntime();
}).catch((err) => {
  console.log(err);
});