import React from 'react';

interface ButtonProps {
    children?: any,
    onClick: () => void 
}

export function Button (props: ButtonProps){
    return(
        <button style={{
            backgroundColor: "#209cee",
            padding: '0 0.5em',
            borderRadius: "500px",
            border: '0px',
            fontSize: "inherit"
        }}
        type="button"
        onClick={props.onClick}>
            <p style={{color: "#fff", margin: '0.5em'}}>{props.children}</p>
        </button>
    );
}