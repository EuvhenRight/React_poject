import logo from './logo.svg';
import './App.css';
// import { Message } from './components/Message';
import { MessageList } from './components/MessageList';
// import { Counter } from './components/Counter';
import { useEffect, useState } from 'react';
// import { Form } from './components/Form';
import { AUTHORS } from './components/utils/constans.js';
import { Formnew } from './components/Formnew';
import { ChatList } from './components/ChatList';



function App() {
  const [messageList, setMessagelist] = useState([]);

  const handleAddMessage = (text) => {
    sendMessage(text, AUTHORS.ME);
  };

  const sendMessage = (text, author) => {
    const newMes = {
      text,
      author,
      id: `mes - ${Date.now()}`,
    };
    setMessagelist((prevMessageList) => [...prevMessageList, newMes]);
  }
  useEffect(() => {
    let timeout;
    if (messageList[messageList.length - 1]?.author === AUTHORS.ME) {
      timeout = setTimeout(() => {
        sendMessage("Hey Human", AUTHORS.BOT);
      }, 1200)
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [messageList]);

  // const hanleMessageClick = () => {
  //   console.log()
  // };

  return (
    <div className="App">
      <header className="App-header">
        <ChatList />
        <img src={logo} className="App-logo" alt="logo" />
        <MessageList messages={messageList} />

        <Formnew onSubmit={handleAddMessage} />
        {/* {/* <Counter /> *
        /} */}
      </header>
    </div>
  );
};

export default App;
