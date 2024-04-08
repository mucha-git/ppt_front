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
  /*const excludedYears = isAddMode
    ? years.map((m) => m.year)
    : years.filter((f) => f.id != row.id).map((m) => m.year);*/
  /*const findFirstAcceptableYear = () => {
    let year = new Date().getFullYear();
    while (excludedYears.find((y) => y == year)) {
      year++;
    }
    return year.toString();
  };*/
  const initialValues = isAddMode
    ? {
        year: 1, //findFirstAcceptableYear(),
        yearTopic: "",
        isActive: false,
        imgSrc: null,
        columnsCount: 1
      }
    : {
        year: 1,//row.year.toString(),
        yearTopic: row.yearTopic,
        isActive: row.isActive,
        imgSrc: row.imgSrc,
        columnsCount: row.columnsCount
      };

  const validationSchema = Yup.object({
    //year: Yup.string().required("Wymagane"),
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
            <div className="pl-5 pr-5 pt-5 pb-3">
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
              { /*isAddMode? (
                <FormikControl
                  control="year"
                  label={"Wydarzenie"}
                  name="year"
                  className="form-item-width"
                  excluded={excludedYears}
                  fullWidth
                  margin="normal"
                />
              ):
              (<FormikControl
                control="input"
                type="text"
                label={"Wydarzenie"}
                name="year"
                className="form-item-width"
                fullWidth
                margin="normal"
                disabled={true}
              />)*/}
              <FormikControl
                control="input"
                type="text"
                label={"Nazwa wydarzenia"}
                name="yearTopic"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="muiSelect"
                label={"Liczba kolumn w menu"}
                name="columnsCount"
                options={columnsCount}
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
              {/* <FormikControl
                control="input"
                type="text"
                label={"Źródło grafiki"}
                name="imgSrc"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              {formik.values.imgSrc != null && formik.values.imgSrc != "" ? (
                <img
                  className="pt-2"
                  src={formik.values.imgSrc}
                  width={"100%"}
                />
              ) : (
                ""
              )} */}
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3">
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
