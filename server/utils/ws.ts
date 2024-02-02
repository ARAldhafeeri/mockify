import { Server as WebSocketServer, WebSocket } from 'ws';

import { WEB_SOCKET_PORT } from "../getEnv"
// Define the type for the WebSocket server
const wss: WebSocketServer = new WebSocketServer({  port : WEB_SOCKET_PORT});

// Define the type for the callback function used in sendMessage
type CallbackFunction = (error?: Error) => void;

// Define the type for the message sending function
type SendMessageFunction = (msg: string, callback?: CallbackFunction) => void;

// Define the interface for the module to be exported
interface WebSocketModule {
    sendMessage: SendMessageFunction;
    wss: WebSocketServer;
}

// Attach event listener for connection
wss.on('connection', function connection(ws: WebSocket) {
    console.log("websocket server connected on port:", WEB_SOCKET_PORT);

    ws.on('message', function message(data: string) {
        console.log('received: %s', data);
    });
});

// echo message back 
wss.on('message', function incoming(data: string) {
    wss.clients.forEach(function each(client: WebSocket) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
});

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
    wss: wss
};

export = WebSocketModule;
