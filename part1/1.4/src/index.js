import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

/* 
I am use React v18
 */

import { createRoot } from 'react-dom/client';

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    {
    name: 'Fundamentals of React',
    exercises: 10
    },
    {
    name: 'Using props to pass data',
    exercises: 7
    },
    {
    name: 'State of a component',
    exercises: 14
    }
  ];
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total total={parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part parts={props.parts}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      {props.parts.map(prop => (
        <p key={prop.exercises.toString()}>{prop.name} {prop.exercises}</p>
        ))}
    </div>
  );
}

const Total = (props) => {
  let sum = 0;
  props.total.map(prop => (
    sum = sum + prop.exercises
    ))
  return (
    <div>
      Number of exercises {sum}
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
