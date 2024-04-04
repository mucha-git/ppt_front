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

function Copy({ history }) {
  const { updateYears, years } = useContext(AppContext);

  let location = useLocation();
  const isAddMode = location.state == undefined;
  let row = isAddMode ? null : location.state.row;
  //const excludedYears = years.map((m) => m.year);
  const yearsList = [
    { key: "Wybierz wydarzenie źródłowe...", value: 0 },
    ...years.map((o) => {
      return { key: o.yearTopic, value: o.id };
    }),
  ];
  /*const findFirstAcceptableYear = () => {
    let year = new Date().getFullYear();
    while (excludedYears.find((y) => y == year)) {
      year++;
    }
    return year.toString();
  };*/
  const initialValues = {
        year: 1, //findFirstAcceptableYear(),
        yearTopic: "",
        isActive: false,
        imgSrc: null,
        columnsCount: 1,
        sourceYearId: row.id
      }

  const validationSchema = Yup.object({
    //year: Yup.string().required("Pole jest wymagane"),
    yearTopic: Yup.string().required("Pole jest wymagane"),
    isActive: Yup.bool().required("Pole jest wymagane"),
    imgSrc: Yup.string().max(1000, "Maksymalnie 1000 znaków").nullable(),
    columnsCount: Yup.number().min(1, "Minimum 1").max(3, "Maksimum 3").required("Wymagane"),
    sourceYearId: Yup.number().min(1, "Wydarzenie źródłowe jest wymagane").required("Wydarzenie źródłowe jest wymagane")
  });

  const onSubmitCopy = (formik) => {
    let values = formik.values;
      values.pilgrimageId = row.pilgrimageId;
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
                  <h2>"Kopiuj wydarzenie"</h2>
                </div>
              </div>
              <FormikControl
                control="muiSelect"
                label={"Wydarzenie źródłowe"}
                name="sourceYearId"
                options={yearsList}
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              {/*<FormikControl
                control="year"
                label={"Wydarzenie docelowe"}
                name="year"
                className="form-item-width"
                excluded={excludedYears}
                fullWidth
                margin="normal"
                    />*/}
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
                  tooltip="Aby wyłączyć aktywuj inne wydarzenie"
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3">
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                icon={MuiBtnType.Submit}
                tooltip="Aby aktywować wypełnij poprawnie formularz"
                onClick={() => onSubmitCopy(formik)}
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

export { Copy };
