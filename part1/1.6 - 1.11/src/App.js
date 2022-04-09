import React, { useState } from "react";

const Button = props => <button onClick={props.action}>{props.text}</button>;

const Statistic = (props) => {
  if(props.text === "good"){
    return (
        <tr>
          <td>{props.text}</td><td>{props.opt.all.good}</td>
        </tr>
    )
  }
  if(props.text === "neutral"){
    return (
      <tr>
      <td>{props.text}</td><td>{props.opt.all.neutral}</td>
    </tr>
    )
  }
  if(props.text === "bad"){
    return (
      <tr>
      <td>{props.text}</td><td>{props.opt.all.bad}</td>
    </tr>
    )
  }
  
}

const Statistics = props => {
  if(props.all.good + props.all.neutral + props.all.bad === 0){
    return "No feedback given";
  }else{
  return (
    <div>
        <table>
          <tbody>
            <Statistic text={"good"} opt={props}/>
            <Statistic text={"neutral"} opt={props}/>
            <Statistic text={"bad"} opt={props}/>
          
            <tr><td>all</td><td>{props.all.good + props.all.neutral + props.all.bad}</td></tr>
            <tr><td>average</td><td>{
              ((props.all.good / (props.all.good + props.all.neutral + props.all.bad)) * 1)
              +
              ((props.all.bad / (props.all.good + props.all.neutral + props.all.bad)) * -1)
            }</td></tr>
            <tr><td>positive</td><td>{(props.all.good / (props.all.good + props.all.neutral + props.all.bad)) * 100} %</td></tr>
          </tbody>
        </table>
    </div>
  )
}
}

function App() {

  const [options, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleClick = (opt) => {
    const plus = () => {
      if(opt === "good"){
        setState({...options, good: options.good + 1});
      }else if(opt === "neutral"){
        setState({...options, neutral: options.neutral + 1});
      }else if(opt === "bad"){
        setState({...options, bad: options.bad + 1});
      }
    };
    return plus;
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button action={handleClick("good")} text="good"/>
      <Button action={handleClick("neutral")} text="neutral"/>
      <Button action={handleClick("bad")} text="bad"/>
      <h1>statistics</h1>
      <Statistics all={options}/>
    </div>
  );
}

export default App;
