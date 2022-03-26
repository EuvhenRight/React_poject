import { Outlet } from "react-router-dom";
import { List } from "@mui/material";
import { Formnew } from "../Formnew";
import { ChatItem } from "./ChatItem";
import { useSelector } from "react-redux";
import { selectChats } from "../../store/chats/selector";
import { useDispatch } from "react-redux";
import { addChat } from "../../store/chats/actions";
import { useEffect, useState } from "react";
import { chatsRef, getChatsRefById, getMessageRefById, getMessagesRefByChatId } from "../servises/firebase";
import { onValue, set } from "firebase/database";


export const ChatList = () => {
    // const chats = useSelector(selectChats);
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;
        // dispatch(addChat(newId, newChatName))
        set(getChatsRefById(newId), { id: newId, name: newChatName });
        set(getMessagesRefByChatId(newId), { empty: true });
    };

    useEffect(() => {
        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const newChats = [];
            snapshot.forEach((child) => {
                newChats.push(child.val());
            });

            setChats(newChats);
        });

        // useEffect(() => {
        //     const unsubscribe = onChildAdded(chatsRef, (snapshot) => {
        //         setChats((prevChats) => [...prevChats, snapshot.Val()]);
        //     });

        //     setChats(newChats);
        // });

        return unsubscribe;
    }, []);

    return (
        <>
            <List>
                {chats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </List >
            <Formnew onSubmit={handleAddChat} />
            <Outlet />
        </>
    );
};