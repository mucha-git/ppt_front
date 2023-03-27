import React, { useState, useContext } from "react";
import { AppContext } from "../_helpers/context";
import { GoogleMap, LoadScript, Polyline, Marker, InfoWindow } from '@react-google-maps/api';

 export function RenderMap({polylines, lineColor, lineWidth, latitude, longitude, markers}){
  const [activeMarker, setActiveMarker] = useState(null);
  const { mapPins } = useContext(AppContext)

const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const path = polylines.split('\n').filter(a => a != "").map(e => {
    const element = e.split(',')
    return {lat: parseFloat(element[0]), lng: parseFloat(element[1])}})

    const options = {
      strokeColor: lineColor,
      strokeOpacity: 1,
      strokeWeight: lineWidth,
      fillColor: lineColor,
      fillOpacity: 1,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 30000,
      paths: path,
      zIndex: 1
    };

   return <div className="mt-3 mb-3"><LoadScript
      googleMapsApiKey="AIzaSyDnPAzmQuUoZONRAXSClaOhbXtKANyFYC4"
    >
      <GoogleMap
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={containerStyle}
        center={{lat: latitude, lng: longitude}}
        zoom={8}
      >
        <Polyline
      path={path}
      options={options}
    />
    {markers.map(m => {
      const id = m.latitude.toString() + m.longitude.toString()
      const pin = mapPins.find(f => f.id == m.pinId)
    return <Marker 
      icon={pin != null?{
        url: pin.pinSrc,
        scaledSize:  {width: pin.width, height: pin.height}
      }: {}}
      key={id}
      clickable={true}
      position={{lat: m.latitude, lng: m.longitude}} 
      name={m.title}
      onClick={() => handleActiveMarker(id)}
      >
        {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <div><strong>{m.title}</strong></div>
                <div>{m.description}</div>
              <div style={{color: m.footerColor}}>{m.footerText}</div>
              </div>
              
            </InfoWindow>
          ) : null}
      </Marker>})}
        { /* Child components, such as markers, info windows, etc. */ }
        
      </GoogleMap>
    </LoadScript></div>
}