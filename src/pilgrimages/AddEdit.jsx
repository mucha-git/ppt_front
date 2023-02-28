import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { pilgrimagesService } from "../_services";

function AddEdit({ history }) {
  const {updatePilgrimages} = useContext(AppContext)
  let location = useLocation();
  
  const isAddMode = location.state == undefined;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let row = isAddMode? null: location.state

  const initialValues = isAddMode
    ? {
        name: "",
        isActive: false,
        logoSrc: null
      }
    : {
        name: row.name,
        isActive: row.isActive,
        logoSrc: row.logoSrc
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Wymagany"),
    logoSrc: Yup.string().nullable()
  });

  const onSubmitPilgrimage = (values) => {
    setSubmitting(true)
    if(typeof values.isActive === "string") values.isActive = values.isActive == "true"
    if (isAddMode) {
      pilgrimagesService
        .create(values)
        .then((x) => {
          updatePilgrimages()
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push('/pilgrimages');
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      pilgrimagesService
        .update(values)
        .then(() => {
          updatePilgrimages()
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/pilgrimages");
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
          ? "Nowa pielgrzymka"
          : "Edycja pielgrzymki"}
      </h2>
      <br></br>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitPilgrimage}
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
              control="input"
              type="text"
              label={"Aktywna"}
              name="isActive"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="input"
              type="text"
              label={"Logo Src"}
              name="logoSrc"
              className="form-item-width"
            />
            <button
              className="button edytuj"
              type="submit"
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz 
            </button>
            
              <Link to={"/pilgrimages"} >
                <button className="button usun" type="submit">
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