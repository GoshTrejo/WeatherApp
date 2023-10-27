import React, { useEffect, useRef } from "react";
import './style.css';
import Images from './Images/searchICO_32.png';
import Clouds from './Images/weather.png';
import Humidity from './Images/icons8-humidity-96.png';
import Wind from './Images/icons8-viento-96.png';
import { useState } from "react";
import axios from "axios";

function Weather () {
    const[search,setSearch] = useState(" ");
    const[data,setData] = useState({
        celcius: 0,
        name: ' ',
        humidity: 0,
        speed: 0
    });

const FocusInput = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])
}

 const handleSearch = () => {
    if(search !== "") {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3b95a07ee129a7971f4dfc3405ffbec2&units=metrics`;
        axios.get(apiUrl)
        .then(res => {
            setData({...data, celcius: res.data.main.temp - 273.15, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed})
            // let Kelvin_to_Celcius = data.celcius - 273.15;
            console.log(res);
            
        })
        .catch(err => console.log(err));
    }
 }


    return (
        <div className="container">
            <div className="weather">
            <div className="search">
            <input 
            autoFocus
            type="text" 
            placeholder="  Enter City Name"
            onChange={e => setSearch(e.target.value)}
            />
            <button><img className="btn-search" src= {Images} alt=" " onClick={handleSearch} /></button>
            </div>
            <div className="winfo">
            <img className="icon" src= {Clouds} alt=" "/>
            <h1>{data.celcius.toFixed(1)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
                <div className="col">
                    <img src={Humidity} alt=" "/>
                    <div className="humidity">
                        <p>{data.humidity}%</p>
                        <p> Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={Wind} alt=" "/>
                    <div className="wind">
                        <p>{data.speed} km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
            </div>
            
            </div>
        </div>
    )
}

export default Weather;
