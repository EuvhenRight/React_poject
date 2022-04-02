
import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import './style.css';

export const Message = ({ text, author }) => {
    // const { messageColor } = useContext(ThemeContext);
    return (
        <div>
            <span>
                {author}: {text}
            </span>
        </div>
    );
};


// export class Message extends React.Component {
//     render() {
//         const { text, onMessageClick, author } = this.props;
//         return (
//             <span className="header" onClick={onMessageClick}> {author}: {text} </span>)
//     };
// };
