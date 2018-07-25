
import React, { Component } from 'react'
import { Marker } from 'react-google-maps'
import { VenueInfoWindow } from './VenueInfoWindow'
 
export class VenueMarker extends Component {

    constructor(props) {
        super(props)
     
         this.state = {
          isOpen: false
        }
      }
     
      onMarkerClick() {
        this.setState({ isOpen: !this.state.isOpen })
      }
     
      closeWindow() {
        this.setState({ isOpen: false })
      }

  render() {
    const {lat, lng, name, description, id} = this.props
    const {isOpen} = this.state
 
    return(
      <Marker
      key={`marker${id}`}
      position={{
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        }}
      onClick={this.onMarkerClick.bind(this)}>

        {isOpen && (
          <VenueInfoWindow
                  key={`info${id}`}
                  description={description}
                  name={name}
                  markerWithLabel={window.MarkerWithLabel}
                  opacity={0}
                  labelClass='map-name-container'
                  labelContent={`<div class="map-name-marker"><span>$${name}</span></div>`}
                  closeWindow={this.closeWindow.bind(this)}/>
        )}
    </Marker>
    );
  }
}
 
export default VenueMarker