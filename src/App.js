import logo from './logo.svg';
import './App.css';
import { Message } from './components/Message';
// import { Counter } from './components/Counter';
import { useEffect, useState } from 'react';
import { Form } from './components/Form';
import { AUTHORS } from './components/utils/constans.js';

function App() {
  const [messageList, setMessagelist] = useState([]);

  const handleAddMessage = (text) => {
    const newMes = {
      text,
      author: AUTHORS.ME,
    };
    setMessagelist((prevMessageList) => [...prevMessageList, newMes]);
  };

  useEffect(() => {
    let timeout;
    if (messageList[messageList.length - 1]?.author === AUTHORS.ME) {
      timeout = setTimeout(() => {
        const newMes = {
          text: "Hey Human",
          author: AUTHORS.BOT,
        };
        setMessagelist((prevMessageList) => [...prevMessageList, newMes]);
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [messageList]);

  const hanleMessageClick = () => {
    console.log()
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {messageList.map((message) => (
          <Message
            text={message.text}
            author={message.author}
            onMessageClick={hanleMessageClick} />
        ))}
        <Form onSubmit={handleAddMessage} />
        {/* {/* <Counter /> *
        /} */}
      </header>
    </div>
  );
};

export default App;
