const express = require('express');
const app = express();
const port = 8080;
const expressWs = require('express-ws')(app);
const ntClient = require('wpilib-nt-client');
const client = new ntClient.Client();

let connection_state = 'disconnected';

app.use(express.static('public'));
// app.get('/', (req, res) => {
// });

let websock;

app.ws('/socket', (ws, req) => {
    ws.on('message', (msg) => {
        switch (msg) {
            case "start":
                sendStatus('connecting');
                start();
                break;
            case "stop":
                stop();
                break;
            case "getstatus":
                sendStatus(connection_state);
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

    console.log('ran start function');

    client.start((isConnected, err) => {    //called every time start or stop is called on client OR connection is physically lost to robot
        console.log({ isConnected, err });
        let status = "disconnected";
        if (isConnected) {
            status = "connected";
        }
        sendStatus(status, err);
    }, 'roborio-5263-frc.local'); //roborio-5263-frc.local

    // listen for incoming data from robot
    client.addListener((key, val, type, id) => {
        websock.sendJSON({
            type: 'nt-data',
            key: key,
            val: val,
            nttype: type,
            id: id
        });
    })

}

function stop() {
    console.log("ran stop function");
    client.removeListener();
    client.stop();

}

function sendStatus(status, err = null){
    websock.sendJSON({
        type: 'status',
        status: status,
        error: err
    });
    connection_state = status;
    console.log(`connection state: ${connection_state}`);
}