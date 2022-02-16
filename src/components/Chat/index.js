import React, { useEffect } from "react";
import { AUTHORS } from "../utils/constans";
import { MessageList } from "../MessageList";
import { Formnew } from "../Formnew";

import { Navigate, useParams } from "react-router-dom";
import { selectMessages } from "../../store/messages/selector";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messages/actions";


export function Chat() {
    const { chatId } = useParams();
    // const { chatId } = params;

    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();

    // const messagesEnd = useRef();


    const handleAddMessage = (text) => {
        sendMessage(text, AUTHORS.ME);
    };

    const sendMessage = (text, author) => {
        const newMes = {
            text,
            author,
            id: `mes - ${Date.now()}`,
        };
        dispatch(addMessage(chatId, newMes));
    };

    useEffect(() => {
        let timeout;
        if (messages[chatId]?.[messages[chatId]?.length - 1]?.author === AUTHORS.ME) {
            timeout = setTimeout(() => {
                sendMessage("Hey Human", AUTHORS.BOT);
            }, 1200)
        };
        return () => clearTimeout(timeout);
    }, [messages]);

    if (!messages[chatId]) {
        return <Navigate to="/chats" replace />;
    };

    return (
        <div className="App">
            <div>
                <div className="App-header">
                    <MessageList messages={messages[chatId]} />
                </div>
                <Formnew onSubmit={handleAddMessage} />
            </div>
        </div>
    );
};