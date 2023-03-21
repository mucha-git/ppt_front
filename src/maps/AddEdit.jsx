import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, mapsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { ListType } from "../_helpers/ListType";
import { ScreenType } from "../_helpers/ScreenType";
import { AppContext } from "../_helpers/context";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateMaps, mapPins, set} = useContext(AppContext)
  useEffect(() => {
    if(!set){
      const { from } = {from: { pathname: "/maps"}}
      history.push(from);
    } 
  }, []);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let {row } = location.state
  const [markers, setMarkers] = useState(isAddMode? [] : row.markers)
  const [polylines, setPolylines] = useState(isAddMode? "": row.polylines)
  const [latitude, setLatitude] = useState(isAddMode? 0.0: row.latitude)
  const [longitude, setLongitude] = useState(isAddMode? 0.0: row.longitude)
  const [map, setMap] = useState(!isAddMode)

  const initialValues = isAddMode
    ? {
        name: "",
        strokeColor: "#00ff00",
        strokeWidth: 1,
        mapSrc: "",
        delta: 2.5
      }
    : {
        name: row.name,
        strokeColor: row.strokeColor,
        strokeWidth: row.strokeWidth,
        mapSrc: row.mapSrc,
        delta: row.delta,
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Wymagany"),
    mapSrc: Yup.string().required("Wymagany"),
    strokeColor: Yup.string().required("Wymagany"),
    delta: Yup.number().required("Wymagany"),
    strokeWidth: Yup.number().required("Wymagany"),
  });

  const onSubmitMaps = (values, openNew) => {
    if(!map) {
      alertService.error("Nie wczytano pliku mapy!!");
      return;
    }
    setSubmitting(true)
    values.provider = "google"
    values.markers = markers
    values.polylines = polylines
    values.latitude = latitude
    values.strokeWidth = parseInt(values.strokeWidth)
    values.delta = parseFloat(values.delta)
    values.longitude = longitude
    if (isAddMode) {
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
      mapsService
        .create(values)
        .then((x) => {
          updateMaps(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          
          if (popup) {
            let i = lista;
            i.push({label: x.title, value: (x.id).toString()});
            setLista(i);
            close();
          } else {
            const { from } = openNew? {
              from: { pathname: "/maps/dodaj", state: { yearId: location.state.yearId }},
            } :{
              from: { pathname: "/maps", state: { yearId: location.state.yearId }},
            };
            history.push(from);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      values.yearId = row.yearId; 
      mapsService
        .update(values)
        .then(() => {
          updateMaps(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: { pathname: "/maps", state: { yearId: location.state.yearId }},
          };
          history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  let file = null
  function fileChanged(e) {
    file = e.target.files[0]
    parseDocument(file)
  }

  function parseDocument(file) {
    let fileReader = new FileReader()
    fileReader.onload = async (e) => {
      extractGoogleCoords(e.target.result)

      //Do something with result object here
      

    }
    fileReader.readAsText(file)
  }

  function extractGoogleCoords(plainText) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let polylines = ""
    let markers = []
    if (xmlDoc.documentElement.nodeName == "kml") {
      let latMax = 0
      let latMin = 0
      let lonMax = 0
      let lonMin = 0
      for (const item of xmlDoc.getElementsByTagName('Placemark')) {
        let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
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
          var description = it.length == 0? "" : it[0].childNodes[0].nodeValue.trim()
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
    setLatitude(latMin + (latMax - latMin) / 2)
    setLongitude(lonMin + (lonMax - lonMin) / 2)

    } else {
      throw "error while parsing"
    }

    setMarkers(markers)
    setPolylines(polylines)
    setMap(true)
  }

  return (
    <div className="form-style">
      <h2>
        {isAddMode
          ? "Nowa mapa"
          : "Edycja mapy"}
      </h2>
      <br></br>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label={"Nazwa"}
              name="name"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="color"
              //type="text"
              label={"Kolor linii"}
              name="strokeColor"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="inputNumber"
              label={"szerokość linii"}
              name="strokeWidth"
              className="form-item-width"
            />
            <FormikControl
              control="inputNumber"
              label={"delta"}
              name="delta"
              className="form-item-width"
            />
            <FormikControl
              control="input"
              type="text"
              label={"Link do nawigacji"}
              name="mapSrc"
              className="form-item-width"
              wymagane={true}
            />
            <input type='file' accept=".kml" onChange={fileChanged}></input>
            <button
              className="btn m-1 btn-success"
              type="submit"
              onClick={() => onSubmitMaps(formik.values, false)}
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz 
            </button>
            {(!popup && isAddMode) && <button
              className="btn m-1 btn-success"
              onClick={() => onSubmitMaps(formik.values, true)}
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz i dodaj nowy
            </button>
            }
            {popup ? (
              <a onClick={close}>
                <button className="btn m-1 btn-danger">
                  Anuluj
                </button>
              </a>
            ) : (
              <Link to={{
                pathname: "/maps",
                state: {yearId: popup
                  ? yearId
                  : location.state.yearId },
            }} >
                <button className="btn m-1 btn-danger" type="submit">
                  Anuluj
                </button>
              </Link>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };