import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { yearsService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import { columnsCount } from "../_helpers/columnsCount";

function AddEdit({ history }) {
  const { updateYears, years } = useContext(AppContext);

  let location = useLocation();
  const isAddMode = location.state == undefined;
  let row = isAddMode ? null : location.state.row;
  const initialValues = isAddMode
    ? {
        year: 1,
        yearTopic: "",
        isActive: false,
        imgSrc: null,
        columnsCount: 1
      }
    : {
        year: 1,
        yearTopic: row.yearTopic,
        isActive: row.isActive,
        imgSrc: row.imgSrc,
        columnsCount: row.columnsCount
      };

  const validationSchema = Yup.object({
    yearTopic: Yup.string().required("Wymagane"),
    isActive: Yup.bool().required("Wymagane"),
    imgSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
    columnsCount: Yup.number().min(1, "Minimum 1").max(3, "Maksimum 3").required("Wymagane")
  });

  const onSubmitYear = (formik) => {
    let values = formik.values;
    if (isAddMode) {
      values.pilgrimageId = location.pilgrimageId;
      yearsService
        .create(values)
        .then((x) => {
          updateYears();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/events");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    } else {
      values.id = row.id;
      values.pilgrimageId = row.pilgrimageId;
      yearsService
        .update(values)
        .then(() => {
          updateYears();
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          history.push("/events");
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  };

  const onDelete = (formik) => {
    formik.setSubmitting(true);
    yearsService
      ._delete({ id: row.id})
      .then(() => {
        updateYears();
        alertService.success("Pomyslnie usunięto wydarzenie");
        history.push({ pathname: "/events" });
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
            <div className="pl-1 pr-1 pt-1 pb-1">
              <div className="d-flex">
                <div>
                  <h2>
                    <MuiButton
                      className="pl-2 pr-2"
                      icon={MuiBtnType.ArrowBack}
                      onClick={() => {
                        history.push({ pathname: "/events" });
                      }}
                    />
                  </h2>
                </div>
                <div>
                  <h2>{isAddMode ? "Nowe wydarzenie" : "Edycja wydarzenia"}</h2>
                </div>
                <div className="ml-auto d-flex align-items-center">
                  {!isAddMode && (
                    <MuiButton
                      icon={MuiBtnType.Delete}
                      showTooltip={true}
                      type="button"
                      id={"delete-year-" + row.id}
                      tooltip={
                        !isAddMode && row.isActive
                          ? "Nie można usunąć aktywnego wydarzenia"
                          : "Usuń wydarzenie"
                      }
                      disabled={
                        formik.isSubmitting || (!isAddMode && row.isActive)
                      }
                      onClick={() => onDelete(formik)}
                    />
                  )}
                </div>
              </div>
              <FormikControl
                control="input"
                type="text"
                label={"Nazwa wydarzenia"}
                name="yearTopic"
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
                  margin="normal"
                  disabled={!isAddMode && row.isActive}
                  tooltip="Aby wyłączyć aktywuj inne wydarzenie"
                />
              </div>
                <FormikControl
                control="muiSelect"
                label={"Liczba kolumn w menu"}
                name="columnsCount"
                options={columnsCount}
                fullWidth
                margin="normal"
              />
              <div className="d-flex justify-content-center m-3">
              {console.log(formik.values.columnsCount)}
              {formik.values.columnsCount>0 &&
                <img
                    className="pt-2"
                    src={`https://pliki-pielgrzymappka.pl/pielgrzymappka/DEMO/ASSETS/ukladx${formik.values.columnsCount}.jpg`}
                    width={"50%"}
                  />
              }
              </div>
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-1 pr-1 pt-1 pb-1">
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                icon={MuiBtnType.Submit}
                tooltip="Aby aktywować wypełnij poprawnie formularz"
                onClick={() => onSubmitYear(formik)}
                disabled={formik.isSubmitting || !formik.isValid}
              />
              <MuiButton
                disabled={formik.isSubmitting}
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Anuluj"}
                icon={MuiBtnType.Cancel}
                onClick={() => {
                  history.push({ pathname: "/events" });
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };
