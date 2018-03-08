/**
 * 
 * @param {string} selector 
 */
function $(selector) {      //jquery-like dollar sign query selector
    return document.querySelector(selector);
};

let conStatus = false;

let socket = new WebSocket("ws:localhost:8080/socket");
socket.onopen = function (event) {

    let functionElements = document.getElementsByClassName("function");

    for (const element of functionElements) {
        let fxName = element.classList[1];
        element.addEventListener("click", (event) => {
            sendData(fxName);
        });
    }

};

function sendData(data) {
    socket.send(data);
}

socket.addEventListener('message', event => {
    let data = JSON.parse(event.data);
    console.log(data);
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

/**
 * 
 * @param {JSON} data 
 */
function updateStatus(data){
    if(data.status == "connected"){
        conStatus = true;
        $('.robot-con-status').innerHTML = "Robot is connected";
        $('.robot-con-color').style.color = "#00ff00";
    } else if(data.status == 'disconnected'){
        conStatus = false;
        $('.robot-con-status').innerHTML = "Robot is not connected";
        $('.robot-con-color').style.color = "#ff0000";
        if(data.hasOwnProperty("error")){
            tellUser("ERROR CONNECTING TO ROBOT", JSON.stringify(data.error));
        }
    } else if(data.status == "connecting"){
        $('.robot-con-status').innerHTML = "Connecting to robot...";
        $('.robot-con-color').style.color = "#eeee00";
    }
}

function tellUser(title, body){
    $('.tell-user').style.display = "block";
    $('.tell-user-title').innerHTML = title;
    $('.tell-user-body').innerHTML = body;
    $('.tell-user-close').addEventListener("click", event => {
        $('.tell-user').style.display = "none";
    });
}

