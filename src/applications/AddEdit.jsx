import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { applicationsService, accountService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { Role } from "../_helpers";

function AddEdit({ history }) {
  const { updateApplications, groups } = useContext(AppContext);
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
        groupId: null
      }
    : {
        name: row.name,
        isActive: row.isActive,
        logoSrc: row.logoSrc,
        oneSignal: row.oneSignal,
        oneSignalApiKey: row.oneSignalApiKey,
        groupId: row.groupId
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

  const onSubmitApplication = (formik) => {
    let values = formik.values;
    if (values.oneSignal == "") values.oneSignal = null;
    if (values.oneSignalApiKey == "") values.oneSignalApiKey = null;
    if (isAddMode) {
      applicationsService
        .create(values)
        .then((x) => {
          updateApplications();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/applications");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    } else {
      values.id = row.id;
      applicationsService
        .update(values)
        .then(() => {
          updateApplications();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/applications");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  };

  const onDelete = (formik) => {
    formik.setSubmitting(true);
    applicationsService
      ._delete({id: row.id})
      .then(() => {
        updateApplications();
        alertService.success("Pomyslnie usunięto aplikację")
        history.push({ pathname: "/applications" });
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
                      onClick={() => history.push({ pathname: "/applications" })}
                    />
                  </h2>
                </div>
                <div>
                  <h2>
                    {isAddMode ? "Nowa aplikacja" : "Edycja aplikacji"}
                  </h2>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  {!isAddMode && user.role == Role.Admin && (
                    <MuiButton
                      icon={MuiBtnType.Delete}
                      showTooltip={true}
                      type="button"
                      id={"delete-Application-" + row.id}
                      tooltip={"Usuń aplikację"}
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
                  tooltip="Tylko Administrator może dezaktywować aplikację"
                  fullWidth
                  margin="normal"
                />
              </div>
              <FormikControl
                  control="muiSelect"
                  label={"Grupa Gps"}
                  name="groupId"
                  options={[{key: "Brak grupy", value: null}, ...groups.map(a => {
                    return {key: a.name, value: a.id}}
                  )]}
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3">
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                tooltip="Aby aktywować wypełnij poprawnie formularz"
                icon={MuiBtnType.Submit}
                onClick={() => onSubmitApplication(formik)}
                disabled={formik.isSubmitting || !formik.isValid}
              />
              <MuiButton
                disabled={formik.isSubmitting}
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Anuluj"}
                icon={MuiBtnType.Cancel}
                onClick={() => history.push({ pathname: "/applications" })}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };
