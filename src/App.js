import React, { useState } from 'react';
import axios from 'axios'
const api = {
  key: "6f7d7d0b60f555edfd26071a742e2859",
  base: "https://home.openweathermap.org/api_keys"
}


function App() {

  const [data, setData] = useState({})
  const [query, setQuery] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`

  const search = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setQuery('')
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof data.main != "undefined") ? ((data.main.temp > 19) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='start'>
        <div className='start-text'>Weather </div>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter a location ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        
        </div>
        
        {(typeof data.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{data.name}, {data.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="weather">{data.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
