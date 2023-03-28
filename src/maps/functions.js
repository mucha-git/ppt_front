import React from "react";
import { alertService } from "../_services";

export function parseDocument(file, mapPins) {
    let fileReader = new FileReader()
    fileReader.onload = async (e) => {
      return extractGoogleCoords(e.target.result, mapPins)

      //Do something with result object here
      

    }
    fileReader.readAsText(file)
  }

  function extractGoogleCoords(plainText, mapPins) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let polylines = ""
    let markers = []
    let latMax = 0
    let latMin = 0
    let lonMax = 0
    let lonMin = 0
    if (xmlDoc.documentElement.nodeName == "kml") {
      
      for (const item of xmlDoc.getElementsByTagName('Placemark')) {
        //let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
        let polylinesList = item.getElementsByTagName('LineString')
        let markersList = item.getElementsByTagName('Point')

        /** POLYLINES PARSE **/        
        for (const line of polylinesList) {
          let coords = line.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
          
          let points = coords.split("\n")
          for (const point of points) {
            let coord = point.split(",")
            polylines += coord[1] + "," + coord[0] + "\n"
          }
          //polylines=googlePolylinesPaths
        }

        /** MARKER PARSE **/
        if(markersList.length != 0){
          var title = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
          let it = item.getElementsByTagName('description')
          var description = it.length == 0? "" : (it[0].childNodes[0].nodeValue.trim()).replace("<br>", "\n")
          
          for (const marker of markersList) {
            var coords = marker.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
            let coord = coords.split(",")
            let lat = parseFloat(coord[1])
            let lon = parseFloat(coord[0])
            if(lat > latMax) latMax = lat
            if(lat < latMin || latMin == 0) latMin = lat

            if(lon > lonMax) lonMax = lon
            if(lon < lonMin || lonMin == 0) lonMin = lon
            let mapPin = mapPins.find(p => p.name.toUpperCase() == title.toUpperCase())
            let pinId = mapPin? mapPin.id : mapPins.length > 0? mapPins[0].id : alertService.error("Brak pinów mapy")
            markers.push({ latitude: lat, longitude: lon, title: title, description: description, footerText: "tekst stopki", footerColor: "#ff0000", strokeWidth: 1, pinId: pinId })
            
          }
        }    
        
      }
    //setLatitude(latMin + (latMax - latMin) / 2)
    //setLongitude(lonMin + (lonMax - lonMin) / 2)

    } else {
      throw "error while parsing"
    }

    const delta = () => {
      let x = (lonMax - lonMin)
      let y = Math.round(x)
      return y > x? y : y - 0.5 
    }
    //setMarkers(markers)
    //setPolylines(polylines)
    const responce = {latitude: latMin + (latMax - latMin) / 2, 
            longitude: lonMin + (lonMax - lonMin) / 2,
            markers: markers,
            polylines: polylines,
            delta: delta()
        }

    return responce
  }