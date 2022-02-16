export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";

export const addMessage = (chatId, newMes) => ({
    type: ADD_MESSAGE,
    payload: {
        chatId,
        newMes,
    },
});