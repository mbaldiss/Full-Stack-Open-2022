
const FormSearch = (props) => {
    return (
        <div>
            filter show with <input value={props.newFilter} onChange={props.searchFilter}></input>
        </div>
    )
}

export default FormSearch;