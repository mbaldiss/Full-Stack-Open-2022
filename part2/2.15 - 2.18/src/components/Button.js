const Button = ({props}) => {
    return (
        <button onClick={() => {
                if(window.confirm(`Delete ${props[2]}?`)){
                    return props[0](props[1]);
                }
        }}>delete</button>
    );
}

export default Button;