
const OneCountrie = (props) => {
    const lang = Object.values(props.filtered[0].languages);
    return (
      <div>
        <h1>{props.filtered[0].name.common}</h1>
        <p>capital {props.filtered[0].capital}</p>
        <p>population {props.filtered[0].population}</p>
        <h3>languages</h3>
        <ul>
          <p>{lang.map(language => <li key={language}>{language}</li>)}</p>  
        </ul>
        <img alt={props.filtered[0].name.common} src={props.filtered[0].flags.png}/>
      </div>
      );
}

export default OneCountrie;