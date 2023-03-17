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
  console.log(location)
  const isAddMode = location.state == undefined;
  const [submitting, setSubmitting] = useState(false);
  //material ui // domyślne wartości w formularzach
  let row = isAddMode? null: location.state.row

  const initialValues = isAddMode
    ? {
        name: "",
        isActive: false,
        logoSrc: null,
        oneSignal: "",
        oneSignalApiKey: ""
      }
    : {
        name: row.name,
        isActive: row.isActive,
        logoSrc: row.logoSrc,
        oneSignal: row.oneSignal,
        oneSignalApiKey: row.oneSignalApiKey
      };

  const validationSchema = Yup.object({
    name: Yup.string().max(500, "Maksymalnie 500 znaków").required("Wymagany"),
    isActive: Yup.bool().required("Wymagany"),
    logoSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
    oneSignal: Yup.string().max(50, "Maksymalnie 50 znaków").nullable(),
    oneSignalApiKey: Yup.string().max(50, "Maksymalnie 50 znaków").nullable(),
  });

  const onSubmitPilgrimage = (values) => {
    setSubmitting(true)
    if(values.oneSignal == "") values.oneSignal = null
    if(values.oneSignalApiKey == "") values.oneSignalApiKey = null
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
            <FormikControl
              control="input"
              type="text"
              label={"Id aplikacji OneSignal"}
              name="oneSignal"
              className="form-item-width"
            />
            <FormikControl
              control="input"
              type="text"
              label={"Id Api OneSignal"}
              name="oneSignalApiKey"
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
            
              <Link to={"/pilgrimages"} >
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