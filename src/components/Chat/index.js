import React, { useState, useEffect, useRef } from "react";
import { AUTHORS } from "../utils/constans";
import { MessageList } from "../MessageList";
import { Formnew } from "../Formnew";

import { Navigate, useParams } from "react-router-dom";


export function Chat({ messages, addMessage }) {
    const params = useParams();
    const { chatId } = params;


    const handleAddMessage = (text) => {
        sendMessage(text, AUTHORS.ME);
    };

    const sendMessage = (text, author) => {
        const newMes = {
            text,
            author,
            id: `mes - ${Date.now()}`,
        };
        addMessage(chatId, newMes);
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