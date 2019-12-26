import React from "react";
import "./Form.css";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';
const Form = props => {

    let handleChange = (selectedOption) => {
        props.onSelectCity(selectedOption)
    };

    return (
        <div className="container2 top__margin">
            <form onSubmit={props.loadweather}>
                <div className="row">
                    <div className="input__div">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Write a city name and..."
                            name="city"
                            autoComplete="off"
                        />
                    </div>
                    <div className="button__div">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
            <div className="or">Or</div>
            <div className="select__container">
                <div className="select__box1">
                Choose City from your last search:
                </div>

        </div>
            <div className="select__box2">
                <Select className="mt-4 col-md-8 col-offset-4"
                        options = { props.cities }
                        onChange={handleChange}/>
            </div>
        </div>
    );
};



export default Form;