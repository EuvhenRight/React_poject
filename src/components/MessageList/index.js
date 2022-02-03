import { Message } from "../Message";

export const MessageList = ({ messages }) =>
    messages.map((message) => (
        <Message key={message.id} text={message.text} author={message.author} />
    ));