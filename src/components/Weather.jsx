import React from "react";
import "./Weather.css";
import Form from "./Form";

const Weather = props => {
    return (
        <div className="container2">
            <div className="Card">

                <h5>
                    <i  className= {` ${props.weatherIcon}`} />{props.temp_celsius ? (
                    <p>{props.temp_celsius}&deg;</p>
                ) : null}
                </h5>
                <div className="box">
                <h1>{props.cityname}</h1>
                <h1>
                    {props.description.charAt(0).toUpperCase() +
                    props.description.slice(1)}
                </h1>



                <h2>{maxminTemp(props.temp_min, props.temp_max)}</h2>
                {props.wind_speed ? (
                <h1>{"Wind Speed:" + " " + props.wind_speed + " " + "m/s"}</h1>
                ) : null}
                </div>

            </div>
        </div>
    );
};

export default Weather;

function maxminTemp(min, max) {
    if (max && min) {
        return (
            <h3>

                <span>{"Min" + " " + min}&deg;C</span>
                <span>{"Max" + " " + max}&deg;C</span>
            </h3>
        );
    }
}

