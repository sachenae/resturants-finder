import React, { Component } from 'react';
import SearchBar from './components/containers/search_bar';
import WeatherList from './components/containers/weather_list';
import {Home} from './components/layout';

export default class App extends Component {
  render() {
    return (
      <div>
        <Home />  
      </div>
    );
  }
}
