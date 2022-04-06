import logo from './logo.svg';
import './App.css';

const NewComponent = (props) => {
  return (
    <div>
      <p>Welcome {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

function App() {
  console.log("Hello from component.");
  const now = Date();
  const a = 10;
  const b = 20;
  const age = 38;
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
        
        <p>Hello world, it is {now}</p>
        <p>
          {a} plus {b} is {a + b}
        </p>
        <NewComponent name="Marco Baldissone" age={age}/>
      </header>
    </div>
  );
}

export default App;
