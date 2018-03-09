const express = require('express');
const app = express();
const port = 8080;
const expressWs = require('express-ws')(app);
const ntClient = require('wpilib-nt-client');
const client = new ntClient.Client();


app.use(express.static('public'));
// app.get('/', (req, res) => {
// });

let websock;

app.ws('/socket', (ws, req) => {
    ws.on('message', (msg) => {
        switch (msg) {
            case "start":
                websock.sendJSON({
                    type: 'status',
                    status: 'connecting'
                });
                start();
                break;
            case "stop":
                stop();
                break;
            case "test":
                let test = {
                    type: "test",
                    text: "bruh this is a test"
                };
                ws.send(JSON.stringify(test));
                break;
            default:
                console.log(`unknown command ${msg}`);

        }
    });
    websock = ws;
    websock.sendJSON = function (json) {
        websock.send(JSON.stringify(json));
    }
});

app.listen(port, () => console.log(`started server on port: ${port}`));


function start() {


    // Connects the client to the server on team 3571's roborio
    client.start((isConnected, err) => {
        // Displays the error and the state of connection
        console.log({ isConnected, err });
        let status = "disconnected";
        if(isConnected){
            status = "connected";
        } 
        websock.sendJSON({
            type: 'status',
            text: "connection status",
            status: status,
            error: err
        });
    }, 'roborio-5263-frc.local'); //roborio-5263-frc.local

    // Adds a listener to the client
    client.addListener((key, val, type, id) => {
        // console.log({ key, val, type, id });
        
        websock.sendJSON({
            type: 'nt-data',
            text: `key: ${key} val: ${val} type: ${type} id: ${id}`
        });
    })
    console.log('ran start function');

}

function stop() {
    console.log("ran stop function");
    websock.sendJSON({
        type: 'status',
        status: 'disconnected'
    });
    client.stop();

}