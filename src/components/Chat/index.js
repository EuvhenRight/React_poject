import React, { useEffect, useRef, useState } from "react";
import { AUTHORS } from "../utils/constans";
import { MessageList } from "../MessageList";
import { Formnew } from "../Formnew";

import { Navigate, useParams } from "react-router-dom";
import { selectMessages } from "../../store/messages/selector";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, AddMessageWithThunk } from "../../store/messages/actions";
import { onChildAdded, onChildRemoved, onValue, push, set } from "firebase/database";
import { getMessageListRefByChatId, getMessageRefById, getMessagesRefByChatId } from "../servises/firebase";


export function Chat() {
    const { chatId } = useParams();
    // const { chatId } = params;

    // const messages = useSelector(selectMessages);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();

    const messagesEnd = useRef();


    const handleAddMessage = (text) => {
        sendMessage(text, AUTHORS.ME);
    };

    const sendMessage = (text, author) => {
        const newMes = {
            text,
            author,
            id: `mes - ${Date.now()}`,
        };
        // dispatch(AddMessageWithThunk(chatId, newMes));
        set(getMessageRefById(chatId, newMes.id), newMes);

    };
    useEffect(() => {
        const unsubscribe = onValue(getMessagesRefByChatId(chatId), (snapshot) => {
            if (!snapshot.val()?.empty) {
                setMessages(null);
            }
        });

        return unsubscribe;
    }, [chatId]);

    useEffect(() => {
        const unsubscribe = onChildAdded(
            getMessageListRefByChatId(chatId),
            (snapshot) => {
                setMessages((prevMessages) =>
                    [...prevMessages, snapshot.val()]);
            }
        );
        return unsubscribe;
    }, [chatId]);

    useEffect(() => {
        const unsubscribe = onChildRemoved(
            getMessageListRefByChatId(chatId),
            (snapshot) => {
                setMessages((prevMessages) => prevMessages.filter(({ id }) => id !== snapshot.val()?.id));
            }
        );
        return unsubscribe;
    }, [chatId]);


    useEffect(() => {
        messagesEnd.current?.scrollIntoView();
    }, [messages]);

    if (!messages) {
        return <Navigate to="/chats" replace />;
    };

    return (
        <div className="App">
            <div>
                <div className="App-header">
                    <MessageList messages={messages} />
                </div>
                <Formnew onSubmit={handleAddMessage} />
            </div>
        </div>
    );
};