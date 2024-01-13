import React from 'react'
import styles from "./WeatherCard.module.css";

const WeatherCard = ({forecast,tempUnit}) => {
  return (
    <div className={styles.cardContainor}>
      <div className={styles.heading}>
        <div className={styles.key_value}>
          <p style={{fontSize:'1.5rem',fontWeight:'bold',color:'gray'}}>{forecast.date}</p>
        </div>
        <div className={styles.key_value}>
          <span>Average Temperature</span>
          <p style={{fontWeight:'bold'}}>{forecast.avgTemp[tempUnit]} {(tempUnit == 0)? <span>&#x2103;</span>  : <span>&#8457;</span>}</p>  
        </div>
      </div> 
      <div className={styles.weather}>
          {forecast.weatherInfo.map((val,idx) => (
            <div className={styles.weatherInfo} key={idx}>
              <p>{val.time}</p>
              <img
                src={val.icon}
                alt="weathe_icon" 
              />
              <p>{val.description}</p>
            </div>
          ))}
      </div>  
    </div>
  )
}

export default WeatherCard 