import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, mapPinsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateMapPins, set, maps} = useContext(AppContext)
  useEffect(() => {
    if(!set){
      const { from } = {from: { pathname: "/mapPins"}}
      history.push(from);
    } 
  }, []);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  //material ui // domyślne wartości w formularzach
  let {row } = location.state

  const initialValues = isAddMode
    ? {
        name: "",
        pinSrc: "",
        width: 0,
        height: 0
      }
    : {
        name: row.name,
        pinSrc: row.pinSrc,
        width: row.width,
        height: row.height
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Pole jest wymagane"),
    pinSrc: Yup.string().min(1, "Minimum 1 znak").required("Brak grafiki do wyświetlenia"),
    width: Yup.number().min(1, "Musi być większe od 0").required("Pole jest wymagane"),
    height: Yup.number().min(1, "Musi być większe od 0").required("Pole jest wymagane")
  });

  function setImageData(val, formik) {
    formik.setFieldValue("pinSrc", val)
    const img = new Image();
    img.onload = function() {
      formik.setFieldValue("width", this.width)
      formik.setFieldValue("height", this.height)
    }
    img.src = val;
    formik.setFieldValue("pinSrc", val)
    
    
  }

  const onSubmitMapPins = (formik, openNew) => {
    let values = formik.values
    // pobrać wysokość i szerokość z grafiki
    if (isAddMode) {
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
      mapPinsService
        .create(values)
        .then((x) => {
          updateMapPins(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
            const { from } = openNew? {
              from: { pathname: "/mapPins/dodaj", state: { yearId: location.state.yearId }},
            } :{
              from: { pathname: "/mapPins", state: { yearId: location.state.yearId }},
            };
            formik.resetForm()
            formik.setSubmitting(false)
            history.push(from);
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      values.yearId = row.yearId; 
      values.iconSrc = row.iconSrc;
      mapPinsService
        .update(values)
        .then(() => {
          updateMapPins(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: { pathname: "/mapPins", state: { yearId: location.state.yearId }},
          };
          history.push(from);
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  const onDelete = (formik) => {
    formik.setSubmitting(true)
    mapPinsService._delete(row.id).then(() => {
      updateMapPins(row.yearId)
      history.push({ pathname: "/mapPins", state: { yearId: row.yearId }})
    }).catch((error) => {
      formik.setSubmitting(false)
      alertService.error(error);
    })
  }

  return (
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        isInitialValid={!isAddMode}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex">
                <div>{popup ? (
                  <a onClick={close}>
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </a>
                  ) : (
                  <Link to={{
                    pathname: "/mapPins",
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
                      ? "Nowa pinezka"
                      : "Edycja pinezki"}
                  </h2>
                </div>
                <div className="ml-auto">
                  {(!popup && !isAddMode) && <MuiButton 
                  tooltip={formik.isSubmitting || maps.find(e => e.markers.find( ma => ma.pinId == row.id))?"Nie można usunąć przypisanej pinezki": "Usuń pinezkę"}
                  icon={MuiBtnType.Delete} 
                  showTooltip={true}
                  disabled={formik.isSubmitting || maps.find(e => e.markers.find( ma => ma.pinId == row.id))}
                  onClick={() => onDelete(formik)}
                  />
                  }
                </div>
              </div>
              <FormikControl
                control="input"
                type="text"
                label={"Nazwa"}
                name="name"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Źródło grafiki"}
                name="pinSrc"
                className="form-item-width"
                fullWidth
                margin="normal"
                onChange={(val) => setImageData(val.target.value, formik)}
              />
              <FormikControl
                control="inputNumber"
                label={"Wysokość"}
                name="height"
                className="form-item-width"
                fullWidth
                margin="normal"
                onChange={(value) => {
                  let newValue = value.target.value
                  const setValues = (width, height) => {
                    formik.setFieldValue("height", parseInt( newValue ))
                    formik.setFieldValue("width", parseInt( parseInt( newValue )* width / height))
                  }
                  const img = new Image();
                  img.onload = function() {
                    setValues(this.width, this.height)
                  }
                  img.src = formik.values.pinSrc;
                  
                 }}
              />
              {(formik.values.pinSrc != null && formik.values.pinSrc != "")? <img className="pt-2" src={formik.values.pinSrc} width={formik.values.width} height={formik.values.height} />: ""}
              {/* <FormikControl
                control="inputNumber"
                label={"Szerokość"}
                name="width"
                className="form-item-width"
                fullWidth
                margin="normal"
              /> */}
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3" >
            {(!popup && isAddMode) && <MuiButton 
            className="pl-5 pr-5 pt-2 pb-2"
            text={"Zapisz i dodaj kolejny"} 
            icon={MuiBtnType.SubmitAndNew} 
            onClick={() => onSubmitMapPins(formik, true)} 
            disabled={formik.isSubmitting || !formik.isValid} />
            }
            <MuiButton 
              className="pl-5 pr-5 pt-2 pb-2"
              text={"Zapisz"} 
              icon={MuiBtnType.Submit} 
              onClick={() => onSubmitMapPins(formik, false)} 
              disabled={formik.isSubmitting || !formik.isValid} />
            {popup ? (
                <MuiButton disabled={formik.isSubmitting} onClick={() => close()} className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
              
            ) : (
              <Link to={{
                pathname: "/mapPins",
                state: {yearId: popup
                  ? yearId
                  : location.state.yearId },
            }} >
              <MuiButton disabled={formik.isSubmitting} className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
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