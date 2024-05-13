import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/style.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    celcius: "0",
    name: "City",
    humidity: "0",
    speed: "0",
    Country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BaseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=799d48c4247862d4dde215e723056fe3`;
        const response = await axios.get(BaseUrl);
        console.log(response.data);
        setData({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          Country: response.data.sys.country,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  const handleSearch = (event) => {
    event.preventDefault();
    // You can add additional validation here if needed
    if (search.trim() !== "") {
      setSearch(search.trim());
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="Box">
          <h1 className="cloud">
            <i className="fa-solid fa-cloud"></i>
          </h1>
          <form onSubmit={handleSearch}>
            <div className="icon">
              <input
                type="search"
                placeholder="Enter City Name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
          <div className="Country">
            <p>Country: {data.Country}</p>
          </div>
        </div>
      </div>

      <div className="container1">
        {/* <img
          src="https://cdn.pixabay.com/photo/2022/08/16/10/24/lightning-7389933_960_720.jpg"
          alt=""
        /> */}
        <div className="Box1">
          <h2>Weather App</h2>
        </div>
        <div className="location">
          <i className="fa-solid fa-street-view"></i>
          <h2>{data.name}</h2>

          <div className="temp-max">
            <h2>{data.celcius}°</h2>
            <h3></h3>
          </div>
          <div className="dateTime"></div>
        </div>
        <div className="humidity">
          <p>Humidity: {data.humidity}</p>
          <p>Speed:{data.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
