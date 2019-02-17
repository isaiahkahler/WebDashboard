const port = 4000;

import * as websocket from 'ws';

// const ntClient = require('wpilib-nt-client');

import * as ntClient from 'wpilib-nt-client';
const client = new ntClient.Client();

let sendClient = (message: any) => {};
let connectToRobot = (teamNumber: string) => {
    // Connects the client to the server on team 3571's roborio
    client.start((isConnected, err) => {
        // Displays the error and the state of connection
        console.log({ isConnected, err });
    }, `roborio-${teamNumber}.local`);
    
    // Adds a listener to the client
    client.addListener((key, val, type, id) => {
        console.log({ key, val, type, id });
    })
};

let status = {connected: false};

let ws = new websocket.Server({ port: port }, () => {
    console.log("started server on port " + port);
});

ws.addListener("connection", (socket) => {
    console.log("connection to client established");
    sendClient = (message) => {
        socket.send(JSON.stringify(message));
    };
    socket.addEventListener("message", (msg) => {
        var message = JSON.parse(msg.data);
        if(message === "status"){
            sendClient(status);
        }
        if("teamNumber" in message){

        }
    });
});




