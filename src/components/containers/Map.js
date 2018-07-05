import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

    constructor(){
        super()
        this.state = {
            map: null,
            position : null,
            isOpen: true
        }
    }

    mapMoved(){
       const Mcenter = this.state.map.getCenter();
       console.log(Mcenter)
    }

    mapLoaded(map){
            if (this.state.map != null)
            return
            this.setState({
                map:map,
                Mcenter : map.getCenter()
            })
    }

    zoomChanged(){
        console.log('zoomChanged: '+ this.state.map.getZoom())

    }

    handleToggleOpen = () => {

        this.setState({
            isOpen: true
        });
        console.log('clicked');
    }
    
    handleToggleClose = () => {
        this.setState({
            isOpen: false
        });
    }

  


    render(){

        

        const markers = this.props.markers.map((venue, i) => {
            const marker = {
                position: {
                    lat: venue.location.lat,
                    lng: venue.location.lon
                    
                }
                
               
            }

           
            return (< Marker 
                        key={i}    
                        onClick={this.handleToggleOpen}
                        {...marker}
				>
				{this.state.isOpen &&
				<InfoWindow onCloseClick={this.handleToggleClose}>
                {<div style={{width: '100px', height:'16px'}}>
                   
                    <p>{venue.name}</p>
                   
                    </div> }
                </InfoWindow> 
			 }
			</Marker>

            
            )        
                   
        })

        return (
            <GoogleMap
            ref={this.mapLoaded.bind(this)}
            onDragEnd={this.mapMoved.bind(this)}
            onZoomChanged={this.zoomChanged.bind(this)}
            defaultZoom={this.props.zoom}
            defaultCenter={ this.props.center }
            options={{streetViewControl: false, mapTypeControl: false, scrollwheel: false}}
                >
            {markers}
          </GoogleMap>
       
    );
    }
}

export default withGoogleMap(Map);