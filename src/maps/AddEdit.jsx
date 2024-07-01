import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, mapsService } from "../_services";
import { useLocation } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { kolumny } from "./elements/MarkersColumns";
import cellEditFactory from "@musicstory/react-bootstrap-table2-editor";
import BootstrapTable from "@murasoftware/react-bootstrap-table-next";
import paginationFactory from "@murasoftware/react-bootstrap-table2-paginator";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { RenderMap } from "./Map";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { TextField } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { strokeThick } from "../_helpers/strokeThick";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const { updateMaps, mapPins, devices, set, elements } = useContext(AppContext);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  let { row } = location.state;
  let [markers, setMarkers] = useState(
    isAddMode ? [] : row.markers != null ? row.markers : []
  );
  const [polylines, setPolylines] = useState(isAddMode ? "" : row.polylines);
  const [latitude, setLatitude] = useState(isAddMode ? 0.0 : row.latitude);
  const [longitude, setLongitude] = useState(isAddMode ? 0.0 : row.longitude);
  const [delta, setDelta] = useState(isAddMode ? 0 : row.delta);
  const [map, setMap] = useState(!isAddMode);
  const [lineColor, setLineColor] = useState(
    isAddMode ? "#00ff00" : row.strokeColor
  );
  const [lineWidth, setLineWidth] = useState(isAddMode ? 5 : row.strokeWidth);
  const [mapView, setMapView] = useState(() => (
    <RenderMap
      polylines={polylines}
      lineColor={lineColor}
      lineWidth={lineWidth}
      latitude={latitude}
      longitude={longitude}
      markers={markers}
    />
  ));
  const [value, setValue] = useState("0");
  const [tabDisabled, setTabDisabled] = useState(!map);
  const [linkToNavigationDescription, setLinkToNavigationDescription] =
    useState(
      isAddMode
        ? "Przejdź do nawigacji"
        : markers[0]
        ? markers[0].footerText
        : ""
    );
  const [linkToNavigationColor, setLinkToNavigationColor] = useState(
    isAddMode ? "#000000" : markers[0] ? markers[0].footerColor : "#000000"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!set) {
      const { from } = { from: { pathname: "/maps" } };
      history.push(from);
    }
  }, []);
  useEffect(() => {
    if (!isAddMode) {
      mapsService.getMapById(row.id).then((x) => setMarkers(x.markers));
    }
  }, []);

  useEffect(() => {
    if (markers.length > 0) {
      const marker = markers[0];
      setLinkToNavigationDescription(marker.footerText);
      setLinkToNavigationColor(marker.footerColor);
    }
  }, [markers]);

  useEffect(() => {
    if (polylines != "")
      setMapView(() => (
        <RenderMap
          polylines={polylines}
          lineColor={lineColor}
          lineWidth={lineWidth}
          latitude={latitude}
          longitude={longitude}
          markers={markers}
        />
      ));
  }, [lineColor, lineWidth, markers, polylines]);
  const initialValues = isAddMode
    ? {
        name: "",
        strokeColor: "#00ff00",
        strokeWidth: 5,
        mapSrc: "",
        deviceId: null,
        pinId: null,
        gpsTitle: "",
        gpsNavigationText: "Przejdź do nawigacji",
        gpsNavigationColor: "#000000"
      }
    : {
        name: row.name,
        strokeColor: row.strokeColor,
        strokeWidth: row.strokeWidth,
        mapSrc: row.mapSrc,
        deviceId: row.deviceId == undefined? null : row.deviceId,
        pinId: row.deviceId == undefined? null : row.pinId,
        gpsTitle: row.deviceId == undefined? "" : row.gpsTitle,
        gpsNavigationText: row.deviceId == undefined? "Przejdź do nawigacji" : row.gpsNavigationText,
        gpsNavigationColor: row.deviceId == undefined? "#000000" : row.gpsNavigationColor
      };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(250, "Maksymalnie 250 znaków")
      .required("Pole jest wymagane"),
    mapSrc: Yup.string().required("Pole jest wymagane"),
    strokeColor: Yup.string().required("Pole jest wymagane"),
    strokeWidth: Yup.number().required("Pole jest wymagane"),
    pinId: Yup.number().when("deviceId", {
      is: null,
      then: (fieldSchema) => fieldSchema.nullable(),
      otherwise: (fieldSchema) => fieldSchema.typeError('Pole jest wymagane').required("Pole jest wymagane")
    }),
    gpsTitle: Yup.string().when("deviceId", {
      is: null,
      then: (fieldSchema) => fieldSchema.nullable(),
      otherwise: (fieldSchema) => fieldSchema.min(1, "Pole jest wymagane").required("Pole jest wymagane")
    }),
    gpsNavigationText: Yup.string().when("deviceId", {
      is: null,
      then: (fieldSchema) => fieldSchema.nullable(),
      otherwise: (fieldSchema) => fieldSchema.min(1, "Pole jest wymagane").required("Pole jest wymagane")
    }),
    gpsNavigationColor: Yup.string().when("deviceId", {
      is: null,
      then: (fieldSchema) => fieldSchema.nullable(),
      otherwise: (fieldSchema) => fieldSchema.min(1, "Pole jest wymagane").required("Pole jest wymagane")
    }),
  });

  const onSubmitMaps = (formik, openNew) => {
    formik.isValid
    let values = formik.values;
    if (!map) {
      alertService.error("Nie wczytano pliku mapy!!");
      return;
    }
    values.provider = "google";
    values.markers = markers;
    values.polylines = polylines;
    values.latitude = latitude;
    values.strokeWidth = parseInt(values.strokeWidth);
    values.delta = delta;
    values.longitude = longitude;
    if(values.deviceId == null){
      values.pinId=null
      values.gpsTitle=null
      values.gpsNavigationText=null
      values.gpsNavigationColor=null
    }
    
    if (isAddMode) {
      popup
        ? (values.yearId = yearId)
        : (values.yearId = location.state.yearId);
      mapsService
        .create(values)
        .then((x) => {
          updateMaps(values.yearId);
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });

          if (popup) {
            let i = lista;
            i.push({ label: x.title, value: x.id.toString() });
            setLista(i);
            close();
          } else {
            const { from } = openNew
              ? {
                  from: {
                    pathname: "/maps/dodaj",
                    state: { yearId: location.state.yearId },
                  },
                }
              : {
                  from: {
                    pathname: "/maps",
                    state: { yearId: location.state.yearId },
                  },
                };
            setLatitude(0);
            setLongitude(0);

            setMarkers([]);
            setPolylines("");
            setDelta(0);
            setValue("0");
            setMap(false);
            setTabDisabled(true);
            setLineColor("#00ff00");
            setLineWidth(5);
            setLinkToNavigationDescription("Przejdź do nawigacji");
            setLinkToNavigationColor("#000000");
            formik.resetForm();
            formik.setSubmitting(false);
            history.push(from);
          }
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    } else {
      values.id = row.id;
      values.yearId = row.yearId;
      mapsService
        .update(values)
        .then(() => {
          updateMaps(values.yearId);
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: {
              pathname: "/maps",
              state: { yearId: location.state.yearId },
            },
          };
          history.push(from);
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  };

  const changeFooterText = (val) => {
    setLinkToNavigationDescription(val);
    const newMarkers = markers.map((m) => {
      return {
        description: m.description,
        footerColor: m.footerColor,
        footerText: val,
        id: m.id,
        latitude: m.latitude,
        longitude: m.longitude,
        pinId: m.pinId,
        strokeWidth: m.strokeWidth,
        title: m.title,
      };
    });
    setMarkers(newMarkers);
  };

  const changeFooterColor = (val) => {
    setLinkToNavigationColor(val);
    const newMarkers = markers.map((m) => {
      return {
        description: m.description,
        footerColor: val,
        footerText: m.footerText,
        id: m.id,
        latitude: m.latitude,
        longitude: m.longitude,
        pinId: m.pinId,
        strokeWidth: m.strokeWidth,
        title: m.title,
      };
    });
    setMarkers(newMarkers);
  };

  function fileChangedBox(e) {
    const file = e[0].file;
    setData(file);
  }

  const setData = (file) => {
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      return extractGoogleCoords(e.target.result);

      //Do something with result object here
    };
    fileReader.readAsText(file);

    function extractGoogleCoords(plainText) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(plainText, "text/xml");
      let polylines = "";
      let markers = [];
      let latMax = 0;
      let latMin = 0;
      let lonMax = 0;
      let lonMin = 0;
      if (xmlDoc.documentElement.nodeName == "kml") {
        let i = 0;
        for (const item of xmlDoc.getElementsByTagName("Placemark")) {
          //let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
          let polylinesList = item.getElementsByTagName("LineString");
          let markersList = item.getElementsByTagName("Point");

          /** POLYLINES PARSE **/
          for (const line of polylinesList) {
            let coords = line
              .getElementsByTagName("coordinates")[0]
              .childNodes[0].nodeValue.trim();

            let points = coords.split("\n");
            for (const point of points) {
              let coord = point.split(",");
              polylines += coord[1] + "," + coord[0] + "\n";
            }
            //polylines=googlePolylinesPaths
          }

          /** MARKER PARSE **/
          if (markersList.length != 0) {
            var title = item
              .getElementsByTagName("name")[0]
              .childNodes[0].nodeValue.trim();
            let it = item.getElementsByTagName("description");
            var description =
              it.length == 0
                ? ""
                : it[0].childNodes[0].nodeValue.trim().replace("<br>", "\n");

            for (const marker of markersList) {
              var coords = marker
                .getElementsByTagName("coordinates")[0]
                .childNodes[0].nodeValue.trim();
              let coord = coords.split(",");
              let lat = parseFloat(coord[1]);
              let lon = parseFloat(coord[0]);
              if (lat > latMax) latMax = lat;
              if (lat < latMin || latMin == 0) latMin = lat;

              if (lon > lonMax) lonMax = lon;
              if (lon < lonMin || lonMin == 0) lonMin = lon;
              let mapPin = mapPins.find(
                (p) => p.name.toUpperCase() == title.toUpperCase()
              );
              let pinId = mapPin
                ? mapPin.id
                : mapPins.length > 0
                ? mapPins[0].id
                : alertService.error("Brak pinów mapy");
              markers.push({
                id: i,
                latitude: lat,
                longitude: lon,
                title: title,
                description: description,
                footerText: linkToNavigationDescription,
                footerColor: linkToNavigationColor,
                strokeWidth: 1,
                pinId: pinId,
              });
              i = i + 1;
            }
          }
        }
        setLatitude(latMin + (latMax - latMin) / 2);
        setLongitude(lonMin + (lonMax - lonMin) / 2);
      } else {
        throw "error while parsing";
      }

      const delta = () => {
        let x = lonMax - lonMin;
        let y = Math.round(x);
        return y > x ? y : y + 0.5;
      };
      setMarkers(markers);
      setPolylines(polylines);
      let deltaa = delta();
      setDelta(deltaa);
      setMap(true);
      setTabDisabled(false);
      setValue("1");
    }
  };

  const columns = [
    kolumny.KolumnaPinId(mapPins),
    kolumny.KolumnaTitle(),
    kolumny.KolumnaDescription(),
  ];

  const options = {
    sizePerPageList: [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "25", value: 25 },
      { text: "50", value: 50 },
      { text: "Wszystkie", value: markers.length },
    ],
  };

  const onDelete = (formik) => {
    formik.setSubmitting(true);
    mapsService
      ._delete({yearId: row.yearId, id: row.id})
      .then(() => {
        updateMaps(row.yearId);
        alertService.success("Pomyslnie usunięto mapę");
        history.push({ pathname: "/maps", state: { yearId: row.yearId } });
      })
      .catch((error) => {
        formik.setSubmitting(false);
        alertService.error(error);
      });
  };

  return (
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnMount={!isAddMode}
        //isInitialValid={!isAddMode || (isAddMode &&)}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="p-4 flexScreen">
              <div className="d-flex">
                <div>
                  {popup ? (
                    <a onClick={close}>
                      <h2>
                        <MuiButton
                          className="pl-2 pr-2"
                          icon={MuiBtnType.ArrowBack}
                        />
                      </h2>
                    </a>
                  ) : (
                    <h2>
                      <MuiButton
                        className="pl-2 pr-2"
                        icon={MuiBtnType.ArrowBack}
                        onClick={() => {
                          history.push({
                            pathname: "/maps",
                            state: {
                              yearId: popup ? yearId : location.state.yearId,
                            },
                          });
                        }}
                      />
                    </h2>
                  )}
                </div>
                <div>
                  <h2>{isAddMode ? "Nowa mapa" : "Edycja mapy"}</h2>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  {!popup && !isAddMode && (
                    <MuiButton
                      id={"delete-map-" + row.id}
                      type="button"
                      icon={MuiBtnType.Delete}
                      showTooltip={true}
                      tooltip={
                        formik.isSubmitting ||
                        elements.find(
                          (e) => e.type == "Map" && e.mapId == row.id
                        )
                          ? "Nie można usunąć przypisanej mapy"
                          : "Usuń mapę"
                      }
                      disabled={
                        formik.isSubmitting ||
                        elements.find(
                          (e) => e.type == "Map" && e.mapId == row.id
                        )
                      }
                      onClick={() => onDelete(formik)}
                    />
                  )}
                </div>
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="map-tabs"
                      variant="fullWidth"
                      onChange={handleChange}
                      aria-label="map editing"
                    >
                      <Tab
                        label="Ustawienia mapy"
                        value={"0"}
                        classes={"map-tab"}
                        style={{ outline: "none" }}
                      />
                      <Tab
                        label="Podgląd mapy"
                        value={"1"}
                        classes={"map-tab"}
                        disabled={tabDisabled}
                        style={{ outline: "none" }}
                      />
                      <Tab
                        label="GPS"
                        value={"2"}
                        classes={"map-tab"}
                        disabled={tabDisabled && devices.length > 0}
                        style={{ outline: "none" }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel value={"0"}>
                    <FormikControl
                      control="input"
                      type="text"
                      label={"Nazwa"}
                      name="name"
                      className="form-item-width"
                      wymagane={true}
                      fullWidth
                      margin="normal"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label={"Link do nawigacji"}
                      name="mapSrc"
                      className="form-item-width"
                      wymagane={true}
                      fullWidth
                      margin="normal"
                    />
                    {isAddMode && (
                      <DropzoneAreaBase
                        Icon={CloudUploadOutlinedIcon}
                        acceptedFiles={[]}
                        inputProps={{ accept: ".kml" }}
                        filesLimit={1}
                        dropzoneText={
                          "PRZECIĄGNIJ PLIK KML LUB KLIKNIJ, ABY DODAĆ MAPĘ"
                        }
                        onAdd={(files) => {
                          files?.length > 0 && fileChangedBox(files);
                        }}
                        onDelete={() => {
                          setLatitude(null);
                          setLongitude(null);
                          setMarkers([]);
                          setPolylines("");
                          setMap(null);
                        }}
                        dropzoneClass={
                          map ? "file-success mt-3 h150" : "bg-light mt-3 h150"
                        }
                        dropzoneProps={{ disabled: !isAddMode }}
                      />
                    )}
                  </TabPanel>
                  <TabPanel value={"1"} disabled={tabDisabled}>
                    <div className="d-flex justify-content-center">
                      <div className="w-50">
                        <TextField
                          id={"link-to-navigation-description"}
                          value={linkToNavigationDescription}
                          label={"Tekst linku do nawigacji"}
                          variant="outlined"
                          onChange={(val) => changeFooterText(val.target.value)}
                          fullWidth
                          margin="normal"
                        />
                      </div>
                      <div className="w-50 ml-2">
                        <MuiColorInput
                          label={"Kolor linku do nawigacji"}
                          format={"hex"}
                          id={"link-to-navigation-color"}
                          value={linkToNavigationColor}
                          isAlphaHidden={true}
                          onChange={(val, e) => changeFooterColor(e.hex)}
                          fullWidth
                          margin="normal"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-50">
                        <FormikControl
                          control="muiSelect"
                          label="Szerokość linii"
                          name="strokeWidth"
                          options={strokeThick}
                          fullWidth
                          margin="normal"
                          onChange={(val) => {
                            formik.setFieldValue(
                              "strokeWidth",
                              val.target.value
                            );
                            setLineWidth(val.target.value);
                          }}
                        />
                      </div>
                      <div className="w-50 ml-2">
                        <FormikControl
                          control="color"
                          label={"Kolor linii"}
                          name="strokeColor"
                          className="w-100"
                          wymagane={true}
                          fullWidth
                          margin="normal"
                          onChange={(val2, val) => {
                            formik.setFieldValue("strokeColor", val.hex);
                            setLineColor(val.hex);
                          }}
                        />
                      </div>
                    </div>
                    {mapView}
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      data={markers}
                      columns={columns}
                      hover
                      pagination={paginationFactory(options)}
                      cellEdit={cellEditFactory({
                        mode: "click",
                        blurToSave: true,
                        afterSaveCell: (oldValue, newValue, row, column) => {
                          oldValue != newValue &&
                            setMapView(() => (
                              <RenderMap
                                polylines={polylines}
                                lineColor={lineColor}
                                lineWidth={lineWidth}
                                latitude={latitude}
                                longitude={longitude}
                                markers={markers}
                              />
                            ));
                        },
                      })}
                      classes="tableClassesMarkers"
                      rowClasses="rowClassesMarkers m-2"
                      headerClasses="headerClassesMarkers"
                      bodyClasses="bodyClassesMarkers"
                    />
                  </TabPanel>
                  <TabPanel value={"2"} disabled={tabDisabled && devices.length > 0}>
                    <FormikControl
                        control="muiSelect"
                        label={"Urządzenie GPS"}
                        name="deviceId"
                        options={[{key: "Brak urządzenia", value: null}, ...devices.map(a => {
                          return {key: a.name, value: a.id}}
                        )]}
                        className="form-item-width"
                        fullWidth
                        margin="normal"
                        onChange={(val) => {
                          formik.setFieldValue(
                            "deviceId",
                            val.target.value
                          );
                          formik.setFieldValue(
                            "pinId",
                            val.target.value != null ? mapPins[0]?.id : null
                          )
                          formik.setFieldValue(
                            "gpsTitle",
                            val.target.value != null ? devices.find(d => d.id == val.target.value).name : null
                          )
                        }}
                      />
                      {formik.values.deviceId != null && <>
                        <div className="pt-3">
                          <h5>Szczegóły znacznika</h5>
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="w-50">
                            <FormikControl
                              control="muiSelect"
                              label={"Ikonka znacznika"}
                              name="pinId"
                              options={mapPins.map(a => {
                                return {key: a.name, value: a.id}}
                              )}
                              className="form-item-width"
                              fullWidth
                              wymagane={formik.values.deviceId != null}
                              margin="normal"
                            />
                          </div>
                          <div className="w-50 ml-2">
                            <FormikControl
                              control="input"
                              type="text"
                              label={"Tytuł znacznika"}
                              name="gpsTitle"
                              className="form-item-width"
                              wymagane={formik.values.deviceId != null}
                              fullWidth
                              margin="normal"
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="w-50">
                            <FormikControl
                              control="input"
                              type="text"
                              label={"Opis linku do nawigacji"}
                              name="gpsNavigationText"
                              className="form-item-width"
                              wymagane={formik.values.deviceId != null}
                              fullWidth
                              margin="normal"
                            />
                          </div>
                          <div className="w-50 ml-2">
                            <FormikControl
                              control="color"
                              label={"Kolor linku do nawigacji"}
                              name="gpsNavigationColor"
                              className="w-100"
                              wymagane={formik.values.deviceId != null}
                              fullWidth
                              margin="normal"
                            />
                          </div>
                        </div>
                      </>}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
            <div className="d-flex flex-row-reverse flexButtons bg-light paddingBtn">
              {!popup && isAddMode && (
                <MuiButton
                  className="pl-5 pr-5 pt-2 pb-2"
                  text={"Zapisz i dodaj kolejny"}
                  icon={MuiBtnType.SubmitAndNew}
                  tooltip="Aby aktywować wypełnij poprawnie formularz"
                  onClick={() => onSubmitMaps(formik, true)}
                  disabled={formik.isSubmitting || !formik.isValid || !map}
                />
              )}
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                tooltip="Aby aktywować wypełnij poprawnie formularz"
                icon={MuiBtnType.Submit}
                onClick={() => onSubmitMaps(formik, false)}
                disabled={formik.isSubmitting || !formik.isValid || !map}
              />
              {popup ? (
                <MuiButton
                  disabled={formik.isSubmitting}
                  onClick={() => close()}
                  className="pl-5 pr-5 pt-2 pb-2"
                  text={"Anuluj"}
                  icon={MuiBtnType.Cancel}
                />
              ) : (
                <MuiButton
                  disabled={formik.isSubmitting}
                  className="pl-5 pr-5 pt-2 pb-2"
                  text={"Anuluj"}
                  icon={MuiBtnType.Cancel}
                  onClick={() => {
                    history.push({
                      pathname: "/maps",
                      state: { yearId: popup ? yearId : location.state.yearId },
                    });
                  }}
                />
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };
