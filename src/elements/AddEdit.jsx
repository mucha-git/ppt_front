import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, elementsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { ElementType } from "../_helpers/ElementType";
import { AppContext } from "../_helpers/context";
import { arrayFromEnum } from "../_helpers";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { strokeThick } from "../_helpers/strokeThick";
import { margins } from "../_helpers/margins";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateElements, views, maps} = useContext(AppContext)
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const mapsList = maps.map(o => {
    return {key: o.name, value: o.id}
  })
  let {row, parentViewId } = location.state
  const [destinationViewId, setDestinationViewId] = useState(
    isAddMode ? -1 : row.destinationViewId
  );
  const [mapId, setMapId] = useState(
    isAddMode ? -1 : row.mapId
  );

  useEffect(() => {
    if(mapId == -1 || mapId == undefined)  setMapId(mapsList[0]?.value)
  }, [mapsList])

  function viewFilter(e) {
    return e.filter(v => v.viewId == parentViewId)
  }

  const initialValues = isAddMode
    ? {
        type: "Text",
        // Divider
        color: '#000000',
        margin: 0,
        height: 5,
        // Graphic and text
        text: undefined,
        imgSrc: undefined,
        // Youtube
        autoplay: false,
        playlist: undefined,
        // Map
        mapHeight: 0,
        mapId: undefined,
        // Navigation
        destinationViewId: undefined,

        
      }
    : {
        type: row.type,
        color: row.color,
        margin: row.margin == null? 0 : row.margin,
        height: row.height == null? 0 : row.height,
        text: row.text,
        imgSrc: row.imgSrc,
        autoplay: row.autoplay,
        playlist: row.playlist,
        mapHeight: row.mapHeight == null? 0 : row.mapHeight,
        mapId: row.mapId,
        destinationViewId: row.destinationViewId
      };

  const validationSchema = Yup.object({
    type: Yup.string()
      .required("Pole jest wymagane"),
    color: Yup.string().when('type', {
      is: "Divider",
      then: fieldSchema => fieldSchema.required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    margin: Yup.number().when('type', {
      is: "Divider",
      then: fieldSchema => fieldSchema.min(0, "Minimum 0").required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    height: Yup.number().when('type', {
      is: "Divider",
      then: fieldSchema => fieldSchema.min(1, "Minimum 1").required("Pole jest wymagane"),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    text: Yup.string().when('type', (type, schema) => {
      if (type == "Text" || type == "GraphicWithText") {return schema.required('Wymagane')}
      else return schema.nullable()
    }),
    imgSrc: Yup.string().when('type', (type, schema) => {
      if (type == "Graphic" || type == "GraphicWithText") {return schema.required('Wymagane')}
      else return schema.nullable()
    }),
    autoplay: Yup.boolean().when('type', {
      is: "YoutubePlayer",
      then: fieldSchema => fieldSchema.required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    playlist: Yup.string().when('type', {
      is: "YoutubePlayer",
      then: fieldSchema => fieldSchema.required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    mapHeight: Yup.number().when('type', {
      is: "Map",
      then: fieldSchema => fieldSchema.min(0, "Minimum 0").required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    mapId: Yup.number().when('type', {
      is: "Map",
      then: fieldSchema => fieldSchema.required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    }),
    destinationViewId: Yup.number().when('type', {
      is: "Navigation",
      then: fieldSchema => fieldSchema.required('Wymagane'),
      otherwise: fieldSchema => fieldSchema.nullable()
    })
  });

  const onSubmitElements = (formik, openNew) => {
    let values = formik.values
    //if(values.margin == 0) values.margin = null
    //if(values.height == 0) values.height = null
    if(values.mapHeight == 0) values.mapHeight = null
    //values.autoplay != null ? values.autoplay = values.autoplay == "1": null;
    //if(destinationViewId != -1 ) values.destinationViewId = destinationViewId
    //if(mapId != -1 ) values.mapId = mapId
    values.order=isAddMode? null : row.order
    if (isAddMode) {
      values.viewId = parentViewId
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
      //if(values.mapId != null )values.mapId = parseInt(values.mapId, 10)
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
            formik.resetForm()
            formik.setSubmitting(false)
            history.push(from);
          }
        })
        .catch((error) => {
          formik.setSubmitting(false);
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
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  const getYoutubeSrc = (playlist) => {
    return playlist.length> 20?
    "https://www.youtube.com/embed/videoseries?list=" + playlist 
    : "https://www.youtube.com/embed/" + playlist
  }

  const setYoutubePlaylistValue = (val, setFieldValue) => {
    function getId(val) {
      let parts = val.split('list=')
      if(parts.length > 1) {
        parts = parts[1].split("&")[0]
        return parts
      }
      parts = parts[0].split("v=")
      if(parts.length > 1) {
        parts = parts[1].split("&")[0]
        return parts
      }
      parts = parts[0].split("?")[0]
      parts = parts.split("/")
      if(parts[parts.length -1].includes(".")) return null
      parts = parts[parts.length -1].split("&")[0]
      return(parts)
    }
    setFieldValue("playlist", getId(val.target.value))
    //https://www.youtube.com/watch?v=KplqwuQfBNg
    //https://www.youtube.com/watch?v=KplqwuQfBNg&time=123
    //https://youtu.be/KplqwuQfBNg
    //https://www.youtube.com/watch?v=hyFEF1sFGmQ&list=PL2ZI1wL-hAdntzlVj-QB1bqU3W1ggEGHx
    //https://www.youtube.com/live/hyFEF1sFGmQ?feature=share
    //https://youtube.com/playlist?list=PLVd_QdOssBqRbsTR54h3pDHmDlgoH_3nW
    //https://youtube.com/playlist?list=PLVd_QdOssBqRbsTR54h3pDHmDlgoH_3nW&index=1
  }

  return (
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex flex-row">
                <div>{popup ? (
                  <a onClick={close}>
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </a>
                  ) : (
                  <Link to={{
                    pathname: "/views",
                    state: {yearId: popup
                      ? yearId
                      : location.state.yearId },
                    }} >
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </Link>
                  )}
                </div>
                <div>
                  <h2>
                    {isAddMode
                      ? "Nowy element"
                      : "Edycja elementu"}
                  </h2>
                </div>
              </div>
              <FormikControl
                control="muiSelect"
                label={"Typ"}
                name="type"
                options={arrayFromEnum(ElementType)}
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              {formik.values.type != null && <div className="pt-3"><h5>Szczegóły elementu</h5></div>}
              
              {(formik.values.type === "Divider") &&
              <>
                <div className="d-flex justify-content-between">
                  <div className="w-33">
                    <FormikControl
                      control="muiSelect"
                      label={"Szerokość linii"}
                      name="height"
                      options={strokeThick}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="w-33">
                    <FormikControl
                      control="muiSelect"
                      label={"Margines"}
                      name="margin"
                      options={margins}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="w-33">
                    <FormikControl
                      control="color"
                      label={"Kolor"}
                      name="color"
                      className="form-item-width"
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>
                <div className="d-flex mt-3 mb-3">
                  <div style={{backgroundColor: formik.values.color, margin: formik.values.margin + "px", height: formik.values.height + "px", width: '100%'}} ></div>
                </div>
              </>
              }
              {(formik.values.type === "Text" || formik.values.type === "GraphicWithText") &&
              <FormikControl
                control="html"
                //type="text"
                label={"Tekst"}
                name="text"
                className="form-item-width"
                fullWidth
                margin="normal"
              />}
              {(formik.values.type === "Graphic" || formik.values.type === "GraphicWithText") &&
              <><FormikControl
                control="input"
                type="text"
                label={"Link do grafiki"}
                name="imgSrc"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              
              {(formik.values.imgSrc != null && formik.values.imgSrc != "")? <img className="pt-2" src={formik.values.imgSrc} width={'100%'} height={'100%'} />: "Brak grafiki do wyświetlenia"}
              <div className="clear" />
              </>}
              {(formik.values.type === "YoutubePlayer") &&
              <>
                <FormikControl
                  control="input"
                  type="text"
                  label={"Id plejlisty lub wideo"}
                  name="playlist"
                  className="form-item-width"
                  onChange={(val) => setYoutubePlaylistValue(val, formik.setFieldValue)}
                  fullWidth
                  margin="normal"
                />
                {formik.values.playlist && <div className="d-flex justify-content-center m-3">
                  <div className="box-shadow p-2 rounded">
                    <iframe 
                      width="280" 
                      className="rounded" 
                      src={getYoutubeSrc(formik.values.playlist)} 
                      title="YouTube video player" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowfullscreen />
                  </div>
                </div>}
                <div className="d-flex justify-content-center m-3">
                  <FormikControl
                  control="switch"
                  label={"Autoodtwarzanie"}
                  name="autoplay"
                  margin="normal"
                />
                </div>
                
              </>}
              {(formik.values.type === "Map") &&
              <>
                <FormikControl
                  control="muiSelect"
                  label={"Mapa"}
                  name="mapId"
                  options={mapsList}
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
                <FormikControl
                  control="inputNumber"
                  label={"Wysokość mapy"}
                  name="mapHeight"
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
              </>}
              {(formik.values.type === "Navigation") && 
              <>
              <FormikControl
                control="muiSelect"
                label={"Widok"}
                name="destinationViewId"
                options={views.map(o => {
                  return {key: o.title, value: o.id}
                })}
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              </>}
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3" >
              {(!popup && isAddMode) && <MuiButton 
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz i dodaj kolejny"} 
                icon={MuiBtnType.SubmitAndNew} 
                onClick={() => onSubmitElements(formik, true)} 
                disabled={formik.isSubmitting || !formik.isValid} />
              }
              <MuiButton 
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"} 
                icon={MuiBtnType.Submit} 
                onClick={() => onSubmitElements(formik, false)} 
                disabled={formik.isSubmitting || !formik.isValid }
              />
              {(!popup && !isAddMode) && <MuiButton 
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Usuń"} 
                icon={MuiBtnType.DeleteWithoutIcon} 
                disabled={formik.isSubmitting}
                onClick={() => elementsService._delete(row.id).then(() => history.push({ pathname: "/views", state: { yearId: location.state.yearId }}))}
                />
              }
              {popup ? (
                  <MuiButton className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} disabled={formik.isSubmitting} onClick={() => close()} />
              ) : (
                <Link to={{
                  pathname: "/views",
                  state: {yearId: popup
                    ? yearId
                    : location.state.yearId },
              }} >
                <MuiButton className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} disabled={formik.isSubmitting} />
                </Link>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };