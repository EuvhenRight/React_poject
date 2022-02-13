import React, { useState, useEffect, useRef } from "react";
import { AUTHORS } from "../utils/constans";
import { MessageList } from "../MessageList";
import { Formnew } from "../Formnew";

import { Navigate, useParams } from "react-router-dom";

const chats = [{ id: "chat1" }]
const messages = {
    chat1: [],
};

export function Chat() {
    const params = useParams();
    const { chatId } = params;


    console.log(params);
    const [messageList, setMessagelist] = useState({
        chat1: [],
        chat2: [],
        chat3: [],
    });
    const messageEnd = useRef();

    const handleAddMessage = (text) => {
        sendMessage(text, AUTHORS.ME);
    };

    const sendMessage = (text, author) => {
        const newMes = {
            text,
            author,
            id: `mes - ${Date.now()}`,
        };
        setMessagelist((prevMessageList) => ({
            ...prevMessageList,
            [chatId]: [...prevMessageList[chatId], newMes],
        }));
    };
    useEffect(() => {
        let timeout;
        if (messageList[chatId]?.[messageList[chatId]?.length - 1]?.author === AUTHORS.ME) {
            timeout = setTimeout(() => {
                sendMessage("Hey Human", AUTHORS.BOT);
            }, 1200)
        };
        return () => {
            clearTimeout(timeout);
        };
    }, [messageList]);

    useEffect(() => {
        console.log(messageEnd);
    }, []);
    if (!messageList[chatId]) {
        return <Navigate to="/chats" replace />;
    };

    return (
        <div className="App">
            {/* <ChatList /> */}
            <div>
                <div className="App-header">
                    <MessageList messages={messageList[chatId]} />
                </div>
                <Formnew onSubmit={handleAddMessage} />
            </div>
        </div>
    );
};