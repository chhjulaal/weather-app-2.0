import { useEffect, useState } from "react";
// import { MyAppNav } from "./Navbar";
import "./Weather.css";
// Importing images
import snowImage from "./Weather-BG-images/snow.jpg";
import clearImage from "./Weather-BG-images/Clear.jpg";
import cloudyImage from "./Weather-BG-images/Cloudy.jpg";
import fogImage from "./Weather-BG-images/fog.png";
import rainyImage from "./Weather-BG-images/Rainy.jpg";
import stormyImage from "./Weather-BG-images/Stormy.jpg";
import sunnyImage from "./Weather-BG-images/Sunny.jpg";
import { FaSearch } from "react-icons/fa";

function Weather() {
  const images = [
    snowImage,
    sunnyImage,
    stormyImage,
    rainyImage,
    fogImage,
    clearImage,
  ];

  // random bg img
  const [bgImg, setBgImg] = useState("");
  const [data, setData] = useState([]);
  const [city, setCity] = useState("Bhopal");
  const [selectedData, setSelectedData] = useState("");
  const [heatindex, setHeatIndex] = useState("24.5");
  useEffect(() => {
    const random = Math.floor(Math.random() * images.length);
    setBgImg(images[random]);
  }, []);
fetch('https://indian-cities-api-nocbegfhqg.now.sh/cities')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

  // fetching data
  const handeData = async () => {
    // let city = "indore";
    // const url = const city = "Delhi";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e4082a1cfae742f68e8132515250407&q=${city}&days=7&aqi=yes&alerts=yes`;
    try {
      let response = await fetch(url);
      response = await response.json();
      await new Promise((res) => setTimeout(res, 2000));
      // console.log(response);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    handeData();
  }, []);

  // city data
  const handelCity = (e) => {
    // console.log(e);
    setCity(e);
  };

  useEffect(() => {
    handeData();
  }, [city]);

  const handelData = (e) => {
    setHeatIndex(data?.forecast?.forecastday[e]?.hour[e]?.heatindex_c);
    setSelectedData(data.forecast.forecastday[e]);
  };
  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);
  useEffect(() => {
    if (data) {
      setSelectedData(data?.forecast?.forecastday[0]);
    }
  }, [data]);

  return (
    <>
      <div
        className="weather-container"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* <MyAppNav></MyAppNav> */}
        {/* Weather Nav */}
        <div className="Nav">
          <div id="logo">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9546/9546618.png"
              style={{ width: "45px" }}
            />
            <span>Weather App</span>
          </div>
          <div className="SearchInputDiv">
            <FaSearch size={25} className="mx-2"></FaSearch>
            <input
              placeholder="Search City"
              type="text"
              // className="Searchinput"
              style={{
                backgroundColor: "#0a0a0a00",
                color: "black",
                width: "100%",
                padding: "10px",
                outline: "none",
                border: "none",
              }}
              value={city}
              onChange={(e) => handelCity(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content of Weather App */}
        {selectedData == undefined ? (
          <div id="preloader">
            <h1>Loading....</h1>
          </div>
        ) : (
          <div className="main-container">
            <div className="currentDays">
              <div className="tempDiv">
                <img
                  src={selectedData?.day?.condition?.icon}
                  style={{ width: "90px" }}
                />
                <h1>
                  <b>{selectedData?.day?.maxtemp_c} °C</b>
                </h1>
              </div>
              <div style={{ textAlign: "center", margin: "10px 0px" }}>
                <h1 style={{ margin: "10px 0px" }}>
                  <b>{data?.location?.name}</b>
                </h1>
                <span style={{ margin: "20px 0px", fontSize: "20px" }}>
                  {" "}
                  {data?.location?.region} , {data?.location?.country}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: " 0px 0px 0px 10px",
                }}
              >
                <h3>{selectedData?.date}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px 0px",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "155px",
                    // background: "#2361e5",
                    textAlign: "center",
                    margin: "10px 0px",
                    borderRadius: "10px",
                    padding: "10px 0px 0px 0px",
                    // border: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <h4>Wind Kph</h4>
                    <h4>{selectedData?.day?.maxwind_kph}</h4>
                  </div>
                  <img
                    style={{ width: "60px" }}
                    src="https://cdn-icons-png.flaticon.com/128/5532/5532989.png"
                  />
                </div>
                <div
                  style={{
                    width: "155px",
                    // background: "#15a148",
                    textAlign: "center",
                    margin: "10px 0px",
                    borderRadius: "10px",
                    padding: "10px 0px 0px 0px",
                    // border: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <h4>Humidity</h4>
                    <h4>{selectedData?.day?.avghumidity}</h4>
                  </div>
                  <img
                    style={{ width: "60px", marginBottom: "10px" }}
                    src="https://cdn-icons-png.flaticon.com/128/13945/13945026.png"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 10px",
                  margin: "10px 0px",
                }}
              >
                <h4>heat index</h4>
                <h4>{heatindex}</h4>
              </div>
              <hr style={{ margin: "4px 0px" }}></hr>
              <div style={{ textAlign: "center", marginBottom: "0px" }}>
                <h3>{selectedData?.day?.condition?.text}</h3>
              </div>
            </div>

            <div>
              <div className="weekWeatherDiv">
                {data?.forecast?.forecastday?.map((item, index) => (
                  <div
                    className="Days"
                    key={index}
                    onClick={() => handelData(index)}
                  >
                    <h4 style={{ width: "140px", marginTop: "6px" }}>
                      {item.date}
                    </h4>
                    <hr className="m-2"></hr>
                    <img
                      src={item?.day?.condition?.icon}
                      style={{ width: "80px" }}
                    />
                    <hr className="m-2"></hr>

                    <h4>{item?.day?.maxtemp_c}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Weather;
