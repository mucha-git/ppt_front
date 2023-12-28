import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { pilgrimagesService, accountService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { Role } from "../_helpers";

function AddEdit({ history }) {
  const { updatePilgrimages } = useContext(AppContext);
  const user = accountService.userValue;
  let location = useLocation();
  const isAddMode = location.state == undefined;
  let row = isAddMode ? null : location.state.row;

  const initialValues = isAddMode
    ? {
        name: "",
        isActive: false,
        logoSrc: null,
        oneSignal: "",
        oneSignalApiKey: "",
      }
    : {
        name: row.name,
        isActive: row.isActive,
        logoSrc: row.logoSrc,
        oneSignal: row.oneSignal,
        oneSignalApiKey: row.oneSignalApiKey,
      };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(500, "Maksymalnie 500 znaków")
      .required("Pole jest wymagane"),
    isActive: Yup.bool().required("Pole jest wymagane"),
    logoSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
    oneSignal: Yup.string().max(50, "Maksymalnie 50 znaków").nullable(),
    oneSignalApiKey: Yup.string().max(50, "Maksymalnie 50 znaków").nullable(),
  });

  const onSubmitPilgrimage = (formik) => {
    let values = formik.values;
    if (values.oneSignal == "") values.oneSignal = null;
    if (values.oneSignalApiKey == "") values.oneSignalApiKey = null;
    if (isAddMode) {
      pilgrimagesService
        .create(values)
        .then((x) => {
          updatePilgrimages();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/pilgrimages");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    } else {
      values.id = row.id;
      pilgrimagesService
        .update(values)
        .then(() => {
          updatePilgrimages();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/pilgrimages");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  };

  const onDelete = (formik) => {
    formik.setSubmitting(true);
    pilgrimagesService
      ._delete({id: row.id})
      .then(() => {
        updatePilgrimages();
        alertService.success("Pomyslnie usunięto pielgrzymkę")
        history.push({ pathname: "/pilgrimages" });
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
        isInitialValid={!isAddMode}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex">
                <div>
                  <h2>
                    <MuiButton
                      className="pl-2 pr-2"
                      icon={MuiBtnType.ArrowBack}
                      onClick={() => history.push({ pathname: "/pilgrimages" })}
                    />
                  </h2>
                </div>
                <div>
                  <h2>
                    {isAddMode ? "Nowa pielgrzymka" : "Edycja pielgrzymki"}
                  </h2>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  {!isAddMode && user.role == Role.Admin && (
                    <MuiButton
                      icon={MuiBtnType.Delete}
                      showTooltip={true}
                      type="button"
                      id={"delete-pilgrimage-" + row.id}
                      tooltip={"Usuń pielgrzymkę"}
                      disabled={formik.isSubmitting}
                      onClick={() => onDelete(formik)}
                    />
                  )}
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
                label={"Źródło logo"}
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
              <div className="d-flex justify-content-center m-3">
                <FormikControl
                  control="switch"
                  label={"Aktywna"}
                  name="isActive"
                  className="form-item-width"
                  wymagane={true}
                  disabled={user.role != Role.Admin}
                  tooltip="Tylko Administrator może dezaktywować pielgrzymkę"
                  fullWidth
                  margin="normal"
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3">
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                tooltip="Aby aktywować wypełnij poprawnie formularz"
                icon={MuiBtnType.Submit}
                onClick={() => onSubmitPilgrimage(formik)}
                disabled={formik.isSubmitting || !formik.isValid}
              />
              <MuiButton
                disabled={formik.isSubmitting}
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Anuluj"}
                icon={MuiBtnType.Cancel}
                onClick={() => history.push({ pathname: "/pilgrimages" })}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };
