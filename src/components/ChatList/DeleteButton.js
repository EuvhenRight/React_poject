// import { useCallback } from "react";
import { set } from "firebase/database";
import { useDispatch } from "react-redux";
import { deleteChat } from "../../store/chats/actions";
import { getChatsRefById } from "../servises/firebase";



export const DeleteButton = ({ id }) => {
    const dispatch = useDispatch();

    const handleDeleteChat = () => {
        // dispatch(deleteChat(id));
        set(getChatsRefById(id), null);

    };

    return <button onClick={handleDeleteChat}>Удалить</button>;
};
