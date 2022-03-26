import { remove } from "firebase/database";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteMessage, editMessage } from "../../store/messages/actions";
import { Message } from "../Message";
import { getChatsRefById, getMessageRefById } from "../servises/firebase";

export const MessageList = ({ messages }) => {
    const { chatId } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        // dispatch(deleteMessage(chatId, id));
        remove(getMessageRefById(chatId, id));
    };
    const handleEdit = (id) => {
        dispatch(editMessage(chatId, id, "изменено"));
    };

    return messages.map((message) => (
        <div key={message.id}>
            <Message text={message.text} author={message.author} />
            <button onClick={() => handleDelete(message.id)}>Удалить</button>
            <button onClick={() => handleEdit(message.id)}>Изменить</button>
        </div>
    ));
};