import WebSocket, { Server as WebSocketServer } from "ws";
import ClientService from "../services/client";

import { WEB_SOCKET_PORT } from "../getEnv";
import { IncomingMessage } from "http";
import { clientService } from "../services";
// Define the type for the WebSocket server
const wss: WebSocketServer = new WebSocketServer({ port: WEB_SOCKET_PORT });

// Define the type for the callback function used in sendMessage
type CallbackFunction = (error?: Error) => void;

// Define the type for the message sending function
type SendMessageFunction = (msg: string, callback?: CallbackFunction) => void;

type broadcastFunction = (
  data: string,
  clientId: string | string[] | undefined
) => void;

// Define the interface for the module to be exported
interface WebSocketModule {
  sendMessage: SendMessageFunction;
  wss: WebSocketServer;
  broadcast: broadcastFunction;
}

const clients = new Map();

// broadcast to all clients
const broadcast = function broadcast(
  data: string,
  clientId: string | string[] | undefined
) {
  const client = clients.get(clientId);
  console.log("broadcasting to:", clientId, data);
  if (client) {
    client.forEach(function each(ws: WebSocket) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });
  }
};

// client credentials verification
const verifyClient = async (req: IncomingMessage) => {
  let id = req.headers["id"];
  let secret = req.headers["secret"];
  let client = await clientService.findOne({ id, secret });
  console.log("client:", client, id, secret);
  if (!client) return false;
  return true;
};

// Attach event listener for connection
wss.on(
  "connection",
  async function connection(ws: WebSocket, req: IncomingMessage) {
    // verify client
    let verified = await verifyClient(req);
    if (!verified) {
      ws.send("unauthorized");
      ws.close();
      return;
    }
    let id = req.headers["id"];

    if (clients.has(id)) {
      clients.get(id).push(ws);
    } else {
      clients.set(id, [ws]);
    }

    ws.on("message", function message(data: string) {
      if (ws.readyState === WebSocket.OPEN) {
        broadcast(data, id);
      }
    });
  }
);

// Define the module to be exported
const WebSocketModule: WebSocketModule = {
  sendMessage: function (msg: string, callback?: CallbackFunction): void {
    wss.on("connection", function (ws: WebSocket) {
      ws.send(msg, callback);

      ws.on("close", function () {
        console.log("websocket connection close");
      });
    });
  },
  broadcast: broadcast,
  wss: wss,
};

export = WebSocketModule;
