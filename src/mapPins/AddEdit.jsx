import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, mapPinsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateMapPins, set} = useContext(AppContext)
  useEffect(() => {
    if(!set){
      const { from } = {from: { pathname: "/mapPins"}}
      history.push(from);
    } 
  }, []);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let {row } = location.state
  console.log("row")
  console.log(row)

  const initialValues = isAddMode
    ? {
        name: null,
        pinSrc: null,
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
    name: Yup.string().required("Wymagany"),
    pinSrc: Yup.string().required("Wymagany"),
    width: Yup.number().min(1, "Musi być większe od 0").required("Wymagany"),
    height: Yup.number().min(1, "Musi być większe od 0").required("Wymagany")
  });

  const onSubmitMapPins = (values, openNew) => {
    setSubmitting(true)
    // pobrać wysokość i szerokość z grafiki
    if (isAddMode) {
      console.log("create")
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
        console.log(values)
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
            history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      values.yearId = row.yearId; 
      values.iconSrc = row.iconSrc;
      console.log("update")
      console.log(values)
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
          setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  return (
    <div className="form-style">
      <h2>
        {isAddMode
          ? "Nowa pinezka"
          : "Edycja pinezki"}
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
            />
            <FormikControl
              control="input"
              type="text"
              label={"Źródło grafiki"}
              name="pinSrc"
              className="form-item-width"
            />
            <FormikControl
              control="inputNumber"
              label={"Wysokość"}
              name="height"
              className="form-item-width"
            />
            <FormikControl
              control="inputNumber"
              label={"Szerokość"}
              name="width"
              className="form-item-width"
            />
            <button
              className="btn m-1 btn-success"
              type="submit"
              onClick={() => onSubmitMapPins(formik.values, false)}
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz 
            </button>
            {(!popup && isAddMode) && <button
              className="btn m-1 btn-success"
              onClick={() => onSubmitMapPins(formik.values, true)}
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
                pathname: "/mapPins",
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