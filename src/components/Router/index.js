import { Routes, Route, BrowserRouter, Link, NavLink } from "react-router-dom";
import { Chat } from "../Chat";
import { ChatList } from "../ChatList";
// import { Profile } from "../Profile";

const Home = () => <h2>HOME PAGE</h2>;



export const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <NavLink to="/" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>home</NavLink>
            </div>
            <div>
                <NavLink to="/chats" style={({ isActive }) => ({ color: isActive ? "red" : "black" })}>chats</NavLink>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chats" element={<ChatList />}>
                    <Route path=":chatId" element={<Chat />} />
                </Route>
                <Route path="*" element={<h2>Упс! Что-то не так! 404</h2>} />
                {/* <Route path="/profile" element={<Profile />} /> */}
            </Routes>
        </BrowserRouter >
    );
};