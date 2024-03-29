import { CHANGE_NAME, CHANGE_SHOW_NAME } from "./actions";

const initialState = {
    name: 'Default',
    showName: true,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SHOW_NAME: {
            return {
                ...state,
                showName: !state.showName,
            };
        }
        case CHANGE_NAME: {
            return {
                ...state,
                name: action.name,
            };
        }
        default:
            return state;
    }
};