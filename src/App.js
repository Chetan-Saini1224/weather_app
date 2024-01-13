import { useEffect, useRef, useState } from 'react';
import './App.css';
import WeatherList from "./components/WeatherList"
import CityCard from './components/CityCard';

function App() {
  const [currentData,setCurrentData] = useState("");
  
  const [forecasts,setForecasts] = useState([]) 
  const [city,setCity] = useState("delhi");
  const [tempUnit,setTempUnit] = useState(0);
  const value = useRef(null);


  useEffect(() => {
     
     async function getData()
     {
      try{
          //getting latitude and longitude
          const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=0&appid=${process.env.REACT_APP_API_KEY}`)

          const cityData = await res.json();
          console.log(cityData);
            
          if(cityData.length == 0) {
            alert('No City Found') 
            return;
          }
      
          let {lat,lon} = cityData[0];
          //calling for Celsius
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)

          if(response.status != 200) throw new Error("Internal Server Error");

          //calling for Fahrenheit
          const response2 =  await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`);
          
          if(response2.status != 200) throw new Error("Internal Server Error");

          const report1  = await response.json();
          const report2  = await response2.json();

          // console.log(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
          // console.log(report1,report2);
          setCurrentData({
            city : cityData[0].name,
            temp: [report1.list[0].main.temp,report2.list[0].main.temp],
            min_temp:[report1.list[0].main.temp_min,report2.list[0].main.temp_min],
            max_temp:[report1.list[0].main.temp_max,report2.list[0].main.temp_max],
            humidity:report1.list[0].main.humidity,
            wind_speed:report1.list[0].wind.deg,
            wind_direction:report1.list[0].main.humidity,
            weather_desc:report1.list[0].weather[0].description,
            weather_icon: `https://openweathermap.org/img/wn/${report1.list[0].weather[0].icon}@2x.png`
          })

         
          let forecastsValues = []
          let i=0;
          let n = report1.list.length;
          while(i<n)
          {
            let data = {}
            const date = new Date(report1.list[i].dt_txt);
            const day = date.getDate();  

            let avgTempCel=0,avgTempFer=0,weather=[];
            let currDay =  day;
            while(i<n && currDay == day)
            { 
              const date = new Date(report1.list[i].dt_txt);
              currDay = date.getDate();
              if(currDay != day) break;

              avgTempCel +=  report1.list[i].main.temp; 
              avgTempFer +=  report2.list[i].main.temp;
              weather.push({
                 icon : `https://openweathermap.org/img/wn/${report1.list[i].weather[0].icon}@2x.png`,
                 description : report1.list[i].weather[0].description,
                 time : date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
              })
              i++;  
            }
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            data.date = date.getDate() + " " + (monthNames[date.getMonth()]) + "-" + date.getFullYear();
            data.avgTemp = [(avgTempCel/i),(avgTempFer/i)];
            data.weatherInfo = weather
            forecastsValues.push(data);
          }
          setForecasts(forecastsValues);  
      }
      catch(err) {
          console.error(err);
      }
     }
     if(city) getData();
  },[city]);


  function handleClick(e) {
    if(e.key == "Enter") setCity(value.current.value)
  }


  return (
    <div className="app">
    <div className='form'>       
        <img 
          src="/logo.png"
          className='logo'
        />
         
        <div className='input_field'>
          <input type='text' placeholder='Enter City Name. ex: Delhi' ref={value} onKeyUp={handleClick} />
          <div className='search' onClick={() => setCity(value.current.value)} >  
            <img
              src="/search.png"
            />
          </div>
        </div>
       <div className='tempUnit'>
          <p style={{color:"whitesmoke",padding:"0.5rem"}}>Select Unit</p>
          <select className='selectList' onChange={() => (tempUnit == 0)? setTempUnit(1):setTempUnit(0) }>
            <option>Celsius</option>
            <option>Fahrenheit</option>
          </select> 
       </div>  
    </div>
    <CityCard data={currentData} tempUnit={tempUnit} />
    <WeatherList forecasts={forecasts} tempUnit={tempUnit} />
    </div>
  );
}

export default App;
