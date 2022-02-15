import { Link, Outlet } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { Formnew } from "../Formnew";
import { ChatItem } from "./ChatItem";


export const ChatList = ({ chats, onAddChat, onDeleteChat }) => (
    <>
        <List>
            {chats.map((chat) => (
                <ChatItem chat={chat} onDeleteChat={onDeleteChat} />
            ))}
        </List >
        <Formnew onSubmit={onAddChat} />
        <Outlet />
    </>
);