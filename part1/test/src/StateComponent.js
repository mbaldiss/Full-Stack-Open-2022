import { useState } from 'react';

const Button = (props) => {
    return (
        <button onClick={props.hand}>{props.text}</button>
    )
}

const History = (props) => {
    if(props.all.length === 0){
        return "Empty"
    }else{
        return props.all.join(", ")
    }
}

const StateComponent = () => {
/*     
    const [right, setRight] = useState(0);
    const [left, setLeft] = useState(0);
 */
    const [clicks, setState] = useState({
        right: 0,
        left: 0
    });

    const [allClicks, setAll] = useState([]);

    const handleClickR = () => {
        setAll(allClicks.concat("R"));
        const newClicks = {...clicks, right: clicks.right + 1};
        setState(newClicks);
    }

    const handleClickL = () => {
        setAll(allClicks.concat("L"));
        const newClicks = {...clicks, left: clicks.left + 1};
        setState(newClicks);
    }

    const clickedConsole = msg => () => console.log("press:", msg);
    const clickedConsole2 = msg => console.log("press:", msg);

    return (
        <div>
            <Button text="Left" hand={handleClickL}/>
            {clicks.left}
            <br />
            <button onClick={handleClickR}>Right</button>
            {clicks.right}
            <br />
            <History all={allClicks}/>
            <hr />
            <button onClick={clickedConsole("salute")}>salute</button>
            <button onClick={() => clickedConsole2("clicked console")}>clicked console</button>
            {/* 
            <button onClick={() => setRight(right + 1)}>Right</button>
            {right}
            <br />
            <button onClick={() => setLeft(left + 1)}>Left</button>
            {left}
             */}
        </div>
    );
}

export default StateComponent;