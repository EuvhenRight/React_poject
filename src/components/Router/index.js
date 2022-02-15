import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import App from "../../App";
import { ThemeContext } from "../utils/ThemeContext";
import { Chat } from "../Chat";
import { ChatList } from "../ChatList";
import { Profile } from "../Profile";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/chats/actions";


const Home = () => <h2>HOME PAGE</h2>;

const iniChats = [
    {
        name: 'Chat1',
        id: 'chat1',
    },
    {
        name: 'Chat2',
        id: 'chat2',
    },
    {
        name: 'Chat3',
        id: 'chat3',
    },
];
const iniMessages = iniChats.reduce((acc, el) => {
    acc[el.id] = [];
    return acc;
}, {});

export const Router = () => {
    // const [chatList, setChatList] = useState(iniChats);
    const [messages, setMessages] = useState(iniMessages);
    const [messageColor, setMessageColor] = useState("blue");

    const chatList = useSelector(state => state.chats);
    const dispatch = useDispatch();

    const handleAddMessage = (chatId, newMes) => {
        setMessages((prevMessageList) => ({
            ...prevMessageList,
            [chatId]: [...prevMessageList[chatId], newMes],
        }));
    };
    const handleAddChat = (newChatName) => {
        const newId = `chat-${Date.now()}`;

        // const newChat = {
        //     id: newId,
        //     name: newChatName,
        // };

        dispatch(addChat(newId, newChatName));
        // setChatList((prevChatList) => [...prevChatList, newChat]);
        setMessages((prevMessages) => ({
            ...prevMessages,
            [newId]: [],
        }));
    };
    const handleDeleteChat = (idToDelete) => {

        dispatch(deleteChat(idToDelete));
        // setChatList(prevChatList => prevChatList.filter(chat => chat.id !== idToDelete));
        setMessages((prevMessages) => {
            const newMes = { ...prevMessages };

            delete newMes[idToDelete];
            return newMes;
        });
    };

    const contextValue = {
        messageColor,
        setMessageColor,
    };

    return (
        <ThemeContext.Provider value={{ messageColor, setMessageColor }}>
            <BrowserRouter>
                <div>
                    <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>home</NavLink>
                </div>
                <div>
                    <NavLink to="/chats" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>chats</NavLink>
                </div>
                <div>
                    <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>profile</NavLink>
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/chats" element={<ChatList onDeleteChat={handleDeleteChat} onAddChat={handleAddChat} chats={chatList} />}>
                        <Route path=":chatId" element={<Chat messages={messages} addMessage={handleAddMessage} />} />
                    </Route>
                    <Route path="*" element={<h2>Упс! Что-то не так! 404</h2>} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                </Routes>
            </BrowserRouter >
        </ThemeContext.Provider >
    );
};