import React, { Component } from 'react';
import { Map } from './components/Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><em>RESTURANT FINDER</em></h1>
        </header>
        <div>
        <Map />
        </div>
      </div>
    );
  }
}

export default App;
