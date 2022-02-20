import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { profileReducer } from "./profile/reducer";
import storage from 'redux-persist/lib/storage';
import { chatsReducer } from "./chats/reducer";
import { messagesReducer } from "./messages/reducer";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//     combineReducers({
//         profile: profileReducer,
//         chats: chatsReducer,
//         messages: messagesReducer,
//     }),
//     composeEnhancers(applyMiddleware(thunk))
// );

const persistConfig = {
    key: 'gbMesseger',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistReducer, composeEnhancers(applyMiddleware(thunk)));


export const persistor = persistStore(store);