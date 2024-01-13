import React from 'react'
import styles from "./CityCard.module.css"

const CityCard = ({data,tempUnit}) => {  
  return (<>
    {(data) && 
    <div className={styles.city_card_container}>
        <div className={styles.logoContainer}>
            <p style={{fontWeight:'bold',fontSize:'1.5rem'}}>{data.city}</p>
            <img
              src={data.weather_icon}
              alt='weather_icon'
            />
            <p >{data.weather_desc}</p>
        </div>
        <div className={styles.cityInfo}>
        <div className={styles.temprature}>
            <div className={styles.key_value}>
                <span> Temperature </span>
                <p> {data.temp[tempUnit]} {(tempUnit == 0)? <span>&#x2103;</span>  : <span>&#8457;</span>}</p>
            </div>
            <div className={styles.key_value}>
               <span> Min Temp </span> 
               <p> {data.min_temp[tempUnit]} {(tempUnit == 0)? <span>&#x2103;</span>  : <span>&#8457;</span>}</p>
            </div>
            <div className={styles.key_value}>
                <span> Max Temp </span>
                <p> {data.max_temp[tempUnit]} {(tempUnit == 0)? <span>&#x2103;</span>  : <span>&#8457;</span>}</p>
            </div>
            <div className={styles.key_value}>
                <span>Humidity</span> 
                <p>{data.humidity} %</p>
            </div>  
        </div>
        <div className={styles.wind}>
            <div className={styles.key_value}>
                <span>Wind Speed</span>
                <p>{data.wind_speed} <span style={{fontSize:'0.7rem'}} >meter/sec</span></p> 
            </div>
            <div className={styles.key_value}>
                <span>Wind Direction </span>
                <p>{data.wind_direction} <span style={{fontSize:'0.7rem'}} >degrees</span></p> 
            </div>
        </div>
      </div>  
    </div>}
  </>)
}

export default CityCard