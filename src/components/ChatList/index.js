import { Outlet } from "react-router-dom";
import { List } from "@mui/material";
import { Formnew } from "../Formnew";
import { ChatItem } from "./ChatItem";
import { useSelector } from "react-redux";
import { selectChats } from "../../store/chats/selector";
import { useDispatch } from "react-redux";
import { addChat } from "../../store/chats/actions";


export const ChatList = () => {
    const chats = useSelector(selectChats);
    const dispatch = useDispatch();

    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;

        dispatch(addChat(newId, newChatName))
    };

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