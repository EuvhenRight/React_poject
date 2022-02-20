import { AUTHORS } from "../../components/utils/constans";


export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";

export const addMessage = (chatId, newMes) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        newMes,
    },
});


let timeout;

export const AddMessageWithThunk = (chatId, newMes) => (dispatch) => {
    clearTimeout(timeout);
    dispatch(addMessage(chatId, newMes));

    if (newMes.author !== AUTHORS.BOT) {
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