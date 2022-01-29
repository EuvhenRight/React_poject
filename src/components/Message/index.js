
import React from "react";
import './style.css';

export class Message extends React.Component {
    const
    render() {
        return (
            <h3 className="header" onClick={this.props.onMessageClick} > TextMessage, {this.props.text}, {this.props.myTexttwo}</h3>)
    }
}