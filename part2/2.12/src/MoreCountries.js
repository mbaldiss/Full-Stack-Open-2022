import { useState } from "react";
import OneCountrie from './OneCountrie';

const MoreCountries = (props) => {
    const [ more, setMore] = useState(props.filtered);
    if(more.length === 1){
        return (
            <div>
                {props.filtered.map((countrie) => {
                  return <div key={countrie.name.common}>{countrie.name.common} <button onClick={() => {
                    setMore([countrie]);
                  }}>show</button></div>;
                })}
                <OneCountrie filtered={more}/>
            </div>
        )
    }else{
        return (
            <div>
                {props.filtered.map((countrie) => {
                  return <div key={countrie.name.common}>{countrie.name.common} <button onClick={() => {
                    setMore([countrie]);
                  }}>show</button></div>;
                })}
      
            </div>
          )
        }   
}

export default MoreCountries;