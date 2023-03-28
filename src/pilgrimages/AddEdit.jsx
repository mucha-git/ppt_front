import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { pilgrimagesService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

function AddEdit({ history }) {
  const {updatePilgrimages} = useContext(AppContext)
  let location = useLocation();
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
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex flex-row">
                <div>
                  <Link to={{
                    pathname: "/pilgrimages"
                    }} >
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </Link>
                </div>
                <div>
                  <h2>
                    {isAddMode
                      ? "Nowa pielgrzymka"
                      : "Edycja pielgrzymki"}
                  </h2>
                </div>
              </div>
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
                label={"Aktywna"}
                name="isActive"
                className="form-item-width"
                wymagane={true}
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Logo Src"}
                name="logoSrc"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Id aplikacji OneSignal"}
                name="oneSignal"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Id Api OneSignal"}
                name="oneSignalApiKey"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3" >
            <MuiButton 
              className="pl-5 pr-5 pt-2 pb-2"
              text={"Zapisz"} 
              icon={MuiBtnType.Submit} 
              onClick={() => formik.isValid && onSubmitPilgrimage(formik.values)} 
              disabled={formik.isSubmitting} />
            {(!isAddMode) && <MuiButton 
              className="pl-5 pr-5 pt-2 pb-2"
              text={"Usuń"} 
              icon={MuiBtnType.Delete} 
              onClick={() => pilgrimagesService._delete(row.id).then(() => history.push({ pathname: "/pilgrimages"}))}
            />
            }
            <Link to={{
              pathname: "/pilgrimages"
              }} >
              <MuiButton className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
            </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };