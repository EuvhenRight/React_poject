import { List, ListItem } from "@mui/material";

const chats = [
    {
        name: 'Chat1',
        id: 'Chat1',
    },
    {
        name: 'Chat2',
        id: 'Chat2',
    },
    {
        name: 'Chat3',
        id: 'Chat3',
    },
];
export const ChatList = () => (
    <List>
        {chats.map((chat) => (
            <ListItem key={chat.id}>{chat.name}</ListItem>
        ))}
    </List >
);