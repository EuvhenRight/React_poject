
import React from "react";
import './style.css';




export class Message extends React.Component {
    render() {
        const { text, onMessageClick, author } = this.props;
        return (
            <span className="header" onClick={onMessageClick}> {author}: {text} </span>)
    };
};
