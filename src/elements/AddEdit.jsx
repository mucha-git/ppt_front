import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, elementsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { ElementType } from "../_helpers/ElementType";
import { AppContext } from "../_helpers/context";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateElements, views, updateViews, maps, updateMaps} = useContext(AppContext)
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const [submitting, setSubmitting] = useState(false);


  let {row, parentViewId } = location.state
  const [destinationViewId, setDestinationViewId] = useState(
    isAddMode ? -1 : row.destinationViewId
  );
  const [mapId, setMapId] = useState(
    isAddMode ? -1 : row.mapId
  );

  function viewFilter(e) {
    return e.filter(v => v.viewId == parentViewId)
  }

  const initialValues = isAddMode
    ? {
        type: "Text",
        // Divider
        color: null,
        margin: null,
        height: null,
        // Graphic and text
        text: null,
        imgSrc: null,
        // Youtube
        autoplay: null,
        playlist: null,
        // Map
        mapHeight: null,
        mapId: null,
        // Navigation
        destinationViewId: null,

        
      }
    : {
        type: row.type,
        color: row.color,
        margin: row.margin,
        height: row.height,
        text: row.text,
        imgSrc: row.imgSrc,
        autoplay: row.autoplay,
        playlist: row.playlist,
        mapHeight: row.mapHeight,
        mapId: row.mapId,
        destinationViewId: row.destinationViewId
      };

  const validationSchema = Yup.object({
    type: Yup.string()
      .required("Wymagany"),
    color: Yup.string().nullable(),
    margin: Yup.number().nullable(),
    height: Yup.number().nullable(),
    text: Yup.string().nullable(),
    imgSrc: Yup.string().nullable(),
    autoplay: Yup.boolean().nullable(),
    playlist: Yup.string().nullable(),
    mapHeight: Yup.number().nullable(),
    mapId: Yup.number().nullable(),
    destinationViewId: Yup.number().nullable()
  });

  const onSubmitElements = (values, openNew) => {
    values.autoplay != null ? values.autoplay = values.autoplay == "1": null;
    if(destinationViewId != -1 ) values.destinationViewId = destinationViewId
    if(mapId != -1 ) values.mapId = mapId
    if (isAddMode) {
      values.viewId = parentViewId
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
      //if(values.mapId != null )values.mapId = parseInt(values.mapId, 10)
      console.log(values)
      elementsService
        .create(values)
        .then((x) => {
          updateElements(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          
          if (popup) {
            let i = lista;
            i.push({label: x.text, value: (x.id).toString()});
            setLista(i);
            close();
          } else {
            const { from } = openNew? {
              from: { pathname: "/elements/dodaj", state: { yearId: location.state.yearId, parentViewId: parentViewId }},
            } :{
              from: { pathname: "/views", state: { yearId: location.state.yearId }},
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
      values.viewId = row.viewId;
      values.yearId = row.yearId;
      elementsService
        .update(values)
        .then(() => {
          updateElements(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: { pathname: "/views", state: { yearId: location.state.yearId }},
          };
          history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  return (
    <div className="form-style">
      <h2>
        {isAddMode
          ? "Nowy element"
          : "Edycja elementu"}
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
              control="select"
              label={"Typ"}
              name="type"
              options={ElementType}
              className="form-item-width"
              wymagane={true}
            />
            {(formik.values.type === "Divider") &&
            <>
            <FormikControl
              control="input"
              type="text"
              label={"Kolor"}
              name="color"
              className="form-item-width"
            />
            <FormikControl
              control="inputNumber"
              label={"Margines"}
              name="margin"
              className="form-item-width"
            />
            <FormikControl
              control="inputNumber"
              label={"Wysokość"}
              name="height"
              className="form-item-width"
            />
            </>
            }
            {(formik.values.type === "Text" || formik.values.type === "GraphicWithText") &&
            <FormikControl
              control="textarea"
              //type="text"
              label={"Tekst"}
              name="text"
              className="form-item-width"
            />}
            {(formik.values.type === "Graphic" || formik.values.type === "GraphicWithText") &&
            <><FormikControl
              control="input"
              type="text"
              label={"Link do grafiki"}
              name="imgSrc"
              className="form-item-width"
            />
            {(formik.values.imgSrc != null && formik.values.imgSrc != "")? <img className="pt-2" src={formik.values.imgSrc} width={'100%'} height={'100%'} />: "Brak grafiki do wyświetlenia"}
            <div className="clear" />
            </>}
            {(formik.values.type === "YoutubePlayer") &&
            <><FormikControl
              control="radio"
              label={"Autoodtwazanie"}
              name="autoplay"
              className="form-item-width"
              options={[
                      { key: "Tak", value: "1" },
                      { key: "nie", value: "0" },
                    ]}
            />
            <FormikControl
              control="input"
              type="text"
              label={"id plejlisty lub wideo z YT"}
              name="playlist"
              className="form-item-width"
            /></>}
            {(formik.values.type === "Map") &&
            <>
            <FormikControl
              control="inputNumber"
              label={"wysokość mapy"}
              name="mapHeight"
              className="form-item-width"
            />
            <FormikControl
              control="typeSelect"
              label={"Mapa"}
              name="mapId"
              options={maps.map(o => {
                return {label: o.name, value: (o.id).toString()}
              })}
              className="form-item-width"
              setValue={(val) => setMapId(val)}
              value={mapId}
              setLista={() => updateMaps(yearId)}
              yearId={popup? yearId: isAddMode? location.state.yearId: row.yearId}
            />
            </>}
            {(formik.values.type === "Navigation") && 
            <>
            <FormikControl
              control="typeSelect"
              label={"Widok"}
              name="destinationViewId"
              options={views.map(o => {
                return {label: o.title, value: (o.id).toString()}
              })}
              className="form-item-width"
              setValue={(val) => setDestinationViewId(val)}
              value={destinationViewId}
              setLista={() => updateViews(yearId)}
              yearId={popup? yearId: isAddMode? location.state.yearId: row.yearId}
            />
            </>}
            <button
              className="button edytuj"
              type="submit"
              onClick={() => onSubmitElements(formik.values, false)}
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz
            </button>
            {(!popup && isAddMode) && <button
              className="button edytuj"
              onClick={() => onSubmitElements(formik.values, true)}
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
                <button className="button usun">
                  Anuluj
                </button>
              </a>
            ) : (
              <Link to={{
                pathname: "/views",
                state: {yearId: popup
                  ? yearId
                  : location.state.yearId },
            }} >
                <button className="button usun" type="submit">
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