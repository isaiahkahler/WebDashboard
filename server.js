"use strict";
exports.__esModule = true;
var port = 4000;
var websocket = require("ws");
// const ntClient = require('wpilib-nt-client');
var ntClient = require("wpilib-nt-client");
var client = new ntClient.Client();
var sendClient = function (message) { };
var status = { connected: false };
var ws = new websocket.Server({ port: port }, function () {
    console.log("started server on port " + port);
});
ws.addListener("connection", function (socket) {
    console.log("connection to client established");
    sendClient = function (message) {
        socket.send(JSON.stringify(message));
    };
    socket.addEventListener("message", function (msg) {
        var message = JSON.parse(msg.data);
        if (message === "status") {
            sendClient(status);
        }
    });
});
// Connects the client to the server on team 3571's roborio
// client.start((isConnected, err) => {
//     // Displays the error and the state of connection
//     console.log({ isConnected, err });
// }, 'roborio-0001.local');
// // Adds a listener to the client
// client.addListener((key, val, type, id) => {
//     console.log({ key, val, type, id });
// })
