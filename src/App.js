import logo from './logo.svg';
import './App.css';
import { Message } from './components/Message';

const myText = "Hi Man, I am React"

function App() {

  const hanleMessageClick = () => {
    console.log("Hi!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Message onMessageClick={hanleMessageClick} myTexttwo="Hello" text={myText} />
      </header>
    </div>
  );
}

export default App;
