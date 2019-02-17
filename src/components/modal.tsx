import React from 'react';
import styled from 'styled-components';

const ModalEl = styled.div`
    position: absolute;
    width: 60vw;
    height: 80vh;
    top: 10vh;
    left: 20vw;
    background-color: #eee;
    border-radius: 25px;
    z-index: 5;
`;

interface ModalProps {
    title: string,
    body: JSX.Element,
    onClose?: () => void
}

export function Modal (props: ModalProps) {
    return(
        <ModalEl>
            <div style={{margin: "2.5vw"}}>
                <div>
                {!!props.onClose ? 
                <svg style={{width: "24px", height: "24px", position: "absolute"}} viewBox="0 0 24 24" onClick={props.onClose}>
                    <path fill="#000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
                </svg> 
                : undefined }
                    <h3 style={{textAlign: "center"}}>{props.title}</h3>
                </div>
                {props.body}
            </div>
        </ModalEl>
    );
}