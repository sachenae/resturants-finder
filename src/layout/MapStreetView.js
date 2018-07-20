import React from 'react';
const { compose, withProps } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  OverlayView,
  Marker
} = require("react-google-maps");
const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  })


const MapStreetView = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDiNOXq0cCRHTpyrJAAqxqM9AF3Ixa_DOk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center:  { lat: 60.1665291, lng: 24.9310137},
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap >
    <StreetViewPanorama defaultPosition={props.center} visible>
    {props.markers && props.markers.map((marker) => (
        <OverlayView
        position={{ lat: marker.location.lat, lng: marker.location.lon }}
          mapPaneName={OverlayView.OVERLAY_LAYER}
          getPixelPositionOffset={getPixelPositionOffset}
          key={marker.id}
      >
      <Marker/>
        
        </OverlayView>
    ))}

      
        
      
    </StreetViewPanorama>
  </GoogleMap>
);

export default MapStreetView;