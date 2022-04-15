import { useState } from "react";
import OneCountrie from './OneCountrie';
import MoreCountries from './MoreCountries';

const Search = (props) => {
    const [search, setSearch] = useState("");
    let filtered = props.countries.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()));
    const result = (event) => {
        setSearch(event.target.value);
    } 
        if(filtered.length === 1){
            return (
              <div>      
                find countries <input value={search} onChange={result}></input>
                <br/>
                <OneCountrie filtered={filtered}/>
              </div>
            );
          }else if(filtered.length > 10 || filtered.length === 0){
            return (
              <div>      
                find countries <input value={search} onChange={result}></input>
                <br/>
                Too many matches, specify another filter
              </div>
            )
          }else if(filtered.length < 10 && filtered.length > 0){
            return (
              <div>      
                find countries <input value={search} onChange={result}></input>
                <br/>
                <MoreCountries filtered={filtered} setsearch={setSearch}/>
              </div>
            )
          }
}

export default Search;