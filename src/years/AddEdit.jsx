import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { yearsService } from "../_services";

function AddEdit({ history }) {
  const {updateYears} = useContext(AppContext)
  let location = useLocation();
  const isAddMode = location.state == undefined;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let row = isAddMode? null: location.state.row
  const initialValues = isAddMode
    ? {
        year: new Date().getFullYear(),
        yearTopic: "",
        isActive: false,
        imgSrc: null
      }
    : {
        year: row.year,
        yearTopic: row.yearTopic,
        isActive: row.isActive,
        imgSrc: row.imgSrc,
      };

  const validationSchema = Yup.object({
    year: Yup.number().min(new Date().getFullYear(), `Minimalnie ${new Date().getFullYear()}`).required("Wymagany"),
    yearTopic: Yup.string().required("Wymagany"),
    isActive: Yup.bool().required("Wymagany"),
    imgSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
  });

  const onSubmitYear = (values) => {
    setSubmitting(true)
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
              control="inputNumber"
              label={"Rocznik"}
              name="year"
              className="form-item-width"
              wymagane={true}
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