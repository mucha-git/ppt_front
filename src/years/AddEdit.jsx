import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { yearsService } from "../_services";

function AddEdit({ history }) {
  const {updateYears, years} = useContext(AppContext)
  
  let location = useLocation();
  const isAddMode = location.state == undefined;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let row = isAddMode? null: location.state.row
  const excludedYears = isAddMode? years.map(m => m.year) : years.filter(f => f.id != row.id).map(m => m.year)
  const findFirstAcceptableYear = () => {
    let year = new Date().getFullYear()
    while(excludedYears.find( y => y == year)){
      year++
    }
    return year.toString()
  }
  const initialValues = isAddMode
    ? {
        year: findFirstAcceptableYear(),
        yearTopic: "",
        isActive: false,
        imgSrc: null
      }
    : {
        year: row.year.toString(),
        yearTopic: row.yearTopic,
        isActive: row.isActive,
        imgSrc: row.imgSrc,
      };

  const validationSchema = Yup.object({
    year: Yup.string().required("Wymagany"),
    yearTopic: Yup.string().required("Wymagany"),
    isActive: Yup.bool().required("Wymagany"),
    imgSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
  });

  const onSubmitYear = (values) => {
    setSubmitting(true)
    values.year = parseInt(values.year)
    if(typeof values.isActive === "string") values.isActive = values.isActive == "true"
    if (isAddMode) {
      values.pilgrimageId = location.pilgrimageId
      yearsService
        .create(values)
        .then((x) => {
          updateYears()
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push('/years');
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      values.pilgrimageId = row.pilgrimageId
      yearsService
        .update(values)
        .then(() => {
          updateYears()
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/years");
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
          ? "Nowy rocznik"
          : "Edycja rocznika"}
      </h2>
      <br></br>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitYear}
      >
        {(formik) => (
          <Form>
            <FormikControl
              control="year"
              label={"Rocznik"}
              name="year"
              className="form-item-width"
              wymagane={true}
              excluded={excludedYears}
            />
            <FormikControl
              control="input"
              type="text"
              label={"Hasło rocznika"}
              name="yearTopic"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="input"
              type="text"
              label={"Aktywny"}
              name="isActive"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="input"
              type="text"
              label={"Link do grafiki"}
              name="imgSrc"
              className="form-item-width"
            />
            <button
              className="btn m-1 btn-success"
              type="submit"
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz 
            </button>
            
              <Link to={"/years"} >
                <button className="btn m-1 btn-danger" type="submit">
                  Anuluj
                </button>
              </Link>
            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };