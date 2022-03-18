import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import App from "../../App";
import { ThemeContext } from "../utils/ThemeContext";
import { Chat } from "../Chat";
import { ChatList } from "../ChatList";
import { Profile } from "../Profile";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/chats/actions";
import { selectMessages } from "../../store/messages/selector";
import { addMessage } from "../../store/messages/actions";
import { Articles } from "../Articles/Articles";


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

    const [messageColor, setMessageColor] = useState("blue");

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
                    <NavLink to="/articles" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>articles</NavLink>
                </div>
                <div>
                    <NavLink to="/chats" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>chats</NavLink>
                </div>
                <div>
                    <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>profile</NavLink>
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/chats" element={<ChatList />}>
                        <Route path=":chatId" element={<Chat />} />
                    </Route>
                    <Route path="*" element={<h2>Упс! Что-то не так! 404</h2>} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                </Routes>
            </BrowserRouter >
        </ThemeContext.Provider >
    );
};