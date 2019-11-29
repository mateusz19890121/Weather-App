import React from "react";
import "./App.css";
import Form from "./components/Form";
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import { WiDaySunny, WiFog, WiDayThunderstorm, WiSleet, WiDaySnow, WiDayCloudy, WiDayRain } from "react-icons/wi";
const Api_Key = "6e10fe336ad37b2f12992b32859a336a";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      wind: undefined,
      cities: JSON.parse(localStorage.getItem('cities')) || [],
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "fas fa-bolt",
      Drizzle: "fas fa-cloud-rain",
      Rain: "fas fa-cloud-showers-heavy",
      Snow: "fas fa-snowflake",
      Atmosphere: "fas fa-smog",
      Clear: "fas fa-sun",
      Clouds: "fas fa-cloud-sun"
    };
    this.cities = JSON.parse(localStorage.getItem('cities'));
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getUnique(arr, comp) {
    const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }

  getWeather = async (e, isFromSelect = false) => {
    if(!isFromSelect) {
      e.preventDefault();
    };

    const city = !isFromSelect ? e.target.elements.city.value : e.value;
      const api_call = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`
      );
    const response = await api_call.json();
    if (city && response.name) {
      this.setState({
        city: `${response.name}`,
        // country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        wind: response.wind.speed,
        cities: this.getUnique([{ value: response.name, label: response.name}, ...this.state.cities], 'value').slice(0, 10),
        error: false
      });

      localStorage.setItem('cities', JSON.stringify(this.state.cities));


      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  selectCity = (event) => {
    this.getWeather(event, true);
  };

  render() {
    if (this.state.error === false) {
      return (
          <div className="App">
            <div className="main">
            <Form loadweather={this.getWeather} cities={this.state.cities} onSelectCity={this.selectCity}/>
            <Weather
                cityname={this.state.city}
                weatherIcon={this.state.icon}
                description={this.state.description}
                temp_celsius={this.state.celsius}
                temp_max={this.state.temp_max}
                temp_min={this.state.temp_min}
                wind_speed={this.state.wind}
            />
            </div>
          </div>
      );
    }else{
      return (
          <div className="App">
            <Form loadweather={this.getWeather}/>
            <div className="bad__name">No city found, please enter correct name</div>
          </div>
      )
    }
  }
}

export default App;
