import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../../actions/index';

class SearchBar extends Component {
    constructor (props){
        super(props);

        this.state = { 
            city : '',
            country: '' 
    }

        this.onCityInputChange = this.onCityInputChange.bind(this);
        this.onCountryInputChange = this.onCountryInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onCityInputChange(e) {
        this.setState({ city:e.target.value })
       
    }

    onCountryInputChange(e) { 
        this.setState({ country:e.target.value })
    }


    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.city, this.state.country);
        this.setState({ 
            city : '',
            country: ''
     })
    }
    render(){
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
            <h1> Get a 5-day weather forecast for any place here</h1>
            <h3> Type in the name of city and country below</h3>
            
                <input
                    placeholder="City..."
                    className="form-control"
                    value= {this.state.city}
                    onChange= {this.onCityInputChange}
                 />
                  <input
                    placeholder="Country..."
                    className="form-control"
                    value= {this.state.country}
                    onChange= {this.onCountryInputChange}
                 />
                
                    <span >
                     <button type="submit" className="btn btn-secondary" >Submit</button>
                </span>
            </form>
        );
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);