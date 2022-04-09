import React, { useState } from 'react';
import './index.css';
import BornYear from './BornYear';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import StateComponent from './StateComponent';

const Display = ({counter}) => <div> {counter} </div>;

const Reset = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const [ counter, setState ] = useState(0);
  /* 
  setTimeout(() => {
    setState(counter + 1);
  }, 1000);
 */
  const increasesByOne = () => {
    setState(counter + 1);
    console.log(counter + ' clicked');
  }

  const setToZero = () => {
    setState(0)
  }
  return (
    <div>
      <button onClick={increasesByOne}> +1 </button>
      <button onClick={() => setState(counter - 1)}> -1 </button>
      <button onClick={() => setState(counter - counter)}> Reset </button>
      <button onClick={setToZero}> Reset </button>
      <br />
      <Display counter={counter}/>
      <Reset
        text="Reset"
        handleClick={setToZero}
      />
      <Reset
        text="+1"
        handleClick={increasesByOne}
      />
    </div>
  );
  
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BornYear born={38} name="Marco"/>
    <App />
    <hr />
    <StateComponent />
  </React.StrictMode>
  );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
