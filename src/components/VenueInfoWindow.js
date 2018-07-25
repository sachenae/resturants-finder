
import React, { Component } from 'react'
import { InfoWindow } from 'react-google-maps'

export class VenueInfoWindow extends Component {
  render() {
    const {description, name} = this.props

    return(
      <InfoWindow onCloseClick={this.props.closeWindow}>
        <div style={{width: `300px`, backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>
        </div>
      </InfoWindow>
    );
  }
}

export default VenueInfoWindow
