import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/button';
import { Modal } from '../components/modal';

const Header = styled.div`
    display: flex;
    height: 10vh;
    justify-content: space-around;
    align-items: center;
`;

interface DashboardProps {};
interface DashboardState {
    connected: boolean,
    tables: any;
    modal: {show: boolean, title: string, body: any, onClose: any}
};

export class Dashboard extends React.Component<DashboardProps, DashboardState> {
    socket: WebSocket | undefined;

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            connected: false,
            tables: null,
            modal: {show: false, title: '', body: null, onClose: null}
        }
    }

    sendData = (message: any) => {}

    getData(message: any) {
        console.log(message)
        if('connected' in message) {
            this.setState({connected: message.connected}, () => {
                console.log(this.state.connected);
            });
        }
    }

    componentDidMount() {
        this.socket = new WebSocket("ws://localhost:4000");
        this.socket.addEventListener("open", () => {
            if(!!this.socket) {
                this.sendData = (message: any) => {
                    if(!!this.socket){
                        this.socket.send(JSON.stringify(message));
                    }
                }
                this.socket.addEventListener("message", (message) => {this.getData(JSON.parse(message.data))});

            }
        })
        this.getTeamNumber();
        setTimeout( () => {
            this.sendData("status")
        }, 5000)
    }

    getTeamNumber = () => {
        let number = window.localStorage.getItem("teamNumber");
        if(!!number) {
            
        } else {

        }
    }

    addPanel() {
        this.setState({modal: {show: true, title: "add panel", body: null, onClose: () => {}}});
    }

    render() {
        return(
            <div>
                <Header>
                    <h3>WebDashboard</h3>
                    <Button onClick={this.addPanel}>add panel</Button>
                    <ConnectionIndicator connected={this.state.connected}></ConnectionIndicator>
                </Header>
                {this.state.modal.show && <Modal title={this.state.modal.title} body={this.state.modal.body} onClose={this.state.modal.onClose}/>}
            </div>
        );
    }
}

function ConnectionIndicator(props: {connected: DashboardState['connected']}) {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "15px",
                width: "15px",
                margin: "5px",
                borderRadius: '20px',
                backgroundColor: props.connected ? "#00ff00" : "#ff0000"
            }}/>
            {props.connected ? <p>connected</p> : <p>disconnected</p>}
        </div>
    );
}