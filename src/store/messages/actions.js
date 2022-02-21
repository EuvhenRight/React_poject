import { AUTHORS } from "../../components/utils/constans";


export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const EDIT_MESSAGE = "MESSAGES::EDIT_MESSAGE";


export const addMessage = (chatId, newMes) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        newMes,
    },
});

export const deleteMessage = (chatId, idToDelete) => ({
    type: DELETE_MESSAGE,
    payload: {
        chatId,
        idToDelete,
    },
});


export const editMessage = (chatId, idToEdit, newText) => ({
    type: EDIT_MESSAGE,
    payload: {
        chatId,
        idToEdit,
        newText,
    },
});

let timeout;

export const AddMessageWithThunk = (chatId, newMes) => (dispatch) => {
    dispatch(addMessage(chatId, newMes));

    if (newMes.author !== AUTHORS.BOT) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const msgBot = {
                text: "Hey Human",
                author: AUTHORS.BOT,
                id: `mes - ${Date.now()}`,
            };
            dispatch(addMessage(chatId, msgBot));
        }, 1500);
    }
};