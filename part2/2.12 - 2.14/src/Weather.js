import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = (props) => {
    const [ weather, setWeather ] = useState([]);
    useEffect(() => {
      axios
        .get("http://api.weatherstack.com/current?access_key=" + process.env.REACT_APP_NOT_SECRET_CODE + "&query=" + props.capital)
        .then(response => {
            setWeather(response.data);
        })
    });

    const exist = weather.hasOwnProperty("location");

    if(weather === []){
        return (
            <div></div>
        )
    }else if(weather.success === false){
        return (
            <div>
                <h3>Weather in {props.capital}</h3>
                Error: {weather.error.info}
            </div>
        )
    }else if(exist){
        if(props.capital === weather.location.capital){
            return (
                <div>
                    <h3>Weather in {weather.location.capital}</h3>
                    temperature: {weather.current.temperature} Celcius
                    <img src={weather.current.weather_icons} alt={weather.location.capital}></img>
                    wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
                </div>
                
            )
        }
        
    }
    
}

export default Weather;