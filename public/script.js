/**
 * 
 * @param {string} selector 
 */
function $(selector) {      //jquery-like dollar sign query selector
    return document.querySelector(selector);
};

let connection_state = false;
let connection_retried = 0;

const socket = new WebSocket("ws:localhost:8080/socket");

//establish connection to client server
socket.addEventListener('open', event => {
console.log("connected to websocket");
let functionElements = document.getElementsByClassName("function");
    
for (const element of functionElements) {
    let fxName = element.classList[1];
    element.addEventListener("click", (event) => {
        sendData(fxName);
    });
}
sendData("start");
});

//listen for incoming messages from the client server, from type call function
socket.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    switch (data.type) {
        case "status":
            updateStatus(data);
            break;
        case "alert":
            break;
        case "info":
            break;
        case "nt-data":
            console.log(data);
            break;
        default:

    }
});

function sendData(data) {
    socket.send(data);
}

//change page based on connection status
/**
 * 
 * @param {JSON} data 
 */
function updateStatus(data) {
    if (data.status == "connected") {
        connection_state = true;
        $('.robot-con-status').innerHTML = "Robot is connected";
        $('.robot-con-color').style.color = "#00ff00";
    } else if (data.status == 'disconnected') {
        connection_state = false;
        $('.robot-con-status').innerHTML = "Robot is not connected";
        $('.robot-con-color').style.color = "#ff0000";
        if (data.hasOwnProperty("error")) {
            if(data.error != null){
                tellUser("ERROR CONNECTING TO ROBOT", JSON.stringify(data.error));
            } 
        }
    } else if (data.status == "connecting") {
        $('.robot-con-status').innerHTML = "Connecting to robot...";
        $('.robot-con-color').style.color = "#eeee00";
    }
}

//alert the user of some problem
function tellUser(title, body) {
    $('.tell-user').style.display = "block";
    $('.tell-user-title').innerHTML = title;
    $('.tell-user-body').innerHTML = body;
    $('.tell-user-close').addEventListener("click", event => {
        $('.tell-user').style.display = "none";
    });
}


function findData(){
}

//UI

let panels = [];

$('.add-panel').addEventListener('click', event => {
    $('.panel-menu').style.display = 'block';
    $('.panel-menu-close').addEventListener('click', event => {
        $('.panel-menu').style.display = 'none';
    });
});

// $('.addcamera').addEventListener('click', event => {
//     let camera = document.createElement('iframe');
//     camera.setAttribute('src', 'https://www.w3schools.com');
//     $('.body').appendChild(camera);
// });

/*CAMERA 
need link 

CONTROLLER
needs boolean turned on during RECORD AUTON in java
needs to send data to NT

INFO 
list SmartDashboard keys and allow user to pick or select multiple



*/