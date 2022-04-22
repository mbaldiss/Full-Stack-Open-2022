const FormAdd = (props) => {
    return (
        <div>
            <h1>add a new</h1>
            <form onSubmit={props.properties[0]}>
                <div>name: <input value={props.properties[1]} onChange={props.properties[2]}></input></div>
                <div>number: <input value={props.properties[3]} onChange={props.properties[4]}></input></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default FormAdd;