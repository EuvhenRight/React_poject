import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
// import App from "../../App";
import { onAuthStateChanged } from "@firebase/auth";
import { ThemeContext } from "../utils/ThemeContext";
import { Chat } from "../Chat";
import { ChatList } from "../ChatList";
// import { Profile } from "../Profile";
// import { useDispatch, useSelector } from "react-redux";
// import { addChat, deleteChat } from "../../store/chats/actions";
// import { selectMessages } from "../../store/messages/selector";
// import { addMessage } from "../../store/messages/actions";
import { Articles } from "../Articles/Articles";
import { PublicRoute } from "../PublicRoute/PublicRoute";
import ConnectedProfile from "../Profile";
import { PrivatRoute } from "../PrivatRoute/PrivatRoute";
import { Home } from "../Home/Home";
import { auth } from "../servises/firebase";


// const Home = () => <h2>HOME PAGE</h2>;

// const iniChats = [
//     {
//         name: 'Chat1',
//         id: 'chat1',
//     },
//     {
//         name: 'Chat2',
//         id: 'chat2',
//     },
//     {
//         name: 'Chat3',
//         id: 'chat3',
//     },
// ];
// const iniMessages = iniChats.reduce((acc, el) => {
//     acc[el.id] = [];
//     return acc;
// }, {});

export const Router = () => {
    const [messageColor, setMessageColor] = useState("blue");
    const [authed, setAuthed] = useState(false);
    const authorize = () => {
        setAuthed(true);
    };
    const unauthorize = () => {
        setAuthed(false);
    };


    const contextValue = {
        messageColor,
        setMessageColor,
    };

    useEffect(() => {
        const unsunscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthed(true);
            } else {
                setAuthed(false);
            }
        });
        return unsunscribe;
    }, []);

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
                    <Route path="/" element={<PublicRoute authed={authed} />}>
                        <Route path="" element={<Home />} />
                        <Route path="/signup" element={<Home isSignUp />} />
                    </Route>
                    <Route path="/profile" element={<PrivatRoute authed={authed} />}>
                        <Route path="" element={<ConnectedProfile onLogout={unauthorize} />} />
                    </Route>
                    <Route path="/chats" element={<ChatList />}>
                        <Route path=":chatId" element={<Chat />} />
                    </Route>
                    <Route path="articles" element={<Articles />} />
                    <Route path="*" element={<h2>Упс! Что-то не так! 404</h2>} />
                </Routes>
            </BrowserRouter >
        </ThemeContext.Provider >
    );
};