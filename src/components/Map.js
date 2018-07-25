import React, { Component } from 'react'
const { compose, withHandlers, withProps} = require("recompose")
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps'
// import axios from "axios"; 
import superagent from 'superagent'
import Info from './Info'
import { VenueMarker } from './VenueMarker'
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer")

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b0b0b0"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
 
const MyMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiNOXq0cCRHTpyrJAAqxqM9AF3Ixa_DOk&v=3.exp&libraries=geometry,drawing,places",  
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
  )(props => (
  <GoogleMap
    defaultCenter={props.center}
    defaultOptions={{styles: mapStyles}}
    defaultZoom={props.zoom}
    ref={props.onMapMounted}
    onZoomChanged={props.handleMapChanged}
    onDragEnd={props.handleMapChanged}
    onBoundsChanged={props.handleMapFullyLoaded} >

    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
    {
      props.places.length > 0 && props.places.map(place => (
        <VenueMarker 
        key={`place${place.id}`}
        id={place.id}
        lat={place.location.lat}
        lng={place.location.lon}
        description={place.description}
        name={place.name}
          />
      ))
    }
    </MarkerClusterer>
  </GoogleMap>
));
 
export class Map extends Component {

  constructor(props) {
    super(props)

    this.xMapBounds = { min: null, max: null }
    this.yMapBounds = { min: null, max: null }
 
    this.mapFullyLoaded = false
    this.zoom = 14
 
    this.state = {
      resturants: [],
      places: [],
      lat:  60.1665291,
      lng: 24.9310137
    };
  }

  handleMapChanged() {
    this.getMapBounds()
    this.setMapCenterPoint()
    this.fetchPlacesFromApi()
  }
 
  handleMapMounted(map) {
    this.map = map
  }
 
  handleMapFullyLoaded() {
    if (this.mapFullyLoaded)
      return
        this.mapFullyLoaded = true
        this.handleMapChanged()
  }
 
  setMapCenterPoint() {
    this.setState({
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    })
  }

 fetchPlacesFromApi() {
  this.setState({ places: [] });
  
    fetch(`../src/resturants.json?location.lat={'lt':this.xMapBounds.max,'gt':this.xMapBounds.min})&&(location.lon={'gt':this.yMapBounds.max,'lt':this.yMapBounds.min}`,
    { method: 'GET' })
    .then((res) => res.json()) 
    .then((res) => {
      this.setState({ places: res });
      console.log(JSON.stringify(res));  
    });
   }
  
componentDidMount(){
    console.log('componentDidMount')
  superagent
  .get(`../src/resturants.json`)
  .query(null)
  .set('Accept', 'text/json')
  .end((error, response) => {
      const resturants = response.body
       console.log(JSON.stringify(resturants))
      this.setState({
          resturants: resturants
      })
  })
}
  
getMapBounds() {
    let mapBounds = this.map.getBounds()
    let xMapBounds = mapBounds.b
    let yMapBounds = mapBounds.f
 
    this.xMapBounds.min = xMapBounds.b
    this.xMapBounds.max = xMapBounds.f
 
    this.yMapBounds.min = yMapBounds.f
    this.yMapBounds.max = yMapBounds.b
  }
 
  render() {
    const {lat, lng, places} = this.state;
 
  return(
        <div className="row">
          <div className="col-md-8">
            <MyMap
              onMapMounted={this.handleMapMounted.bind(this)}
              handleMapChanged={this.handleMapChanged.bind(this)}
              handleMapFullyLoaded={this.handleMapFullyLoaded.bind(this)}
              center={{
                lat: lat,
                lng: lng
              }}
              places={places}
              zoom={this.zoom}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `820px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
          <div className="col-md-4">
            <Info resturants={this.state.resturants}/> 
          </div>
        </div> 
    );
  }
}
 
export default Map