import React from 'react'
import WeatherCard from "../WeatherCard/index";
import Styles from "./WeatherList.module.css";

const WeatherList = ({forecasts,tempUnit}) => {
  
  return (<>
    {(forecasts.length)? 
    <div className={Styles.forecastContainer}>
      {forecasts.map((forecast,idx) => (
          <WeatherCard forecast={forecast} key={idx} tempUnit={tempUnit} /> 
      ))}
    </div>
   : <p  className={Styles.message}>
      Please Enter City Name to See The details
      </p>}
  </>)
}

export default WeatherList