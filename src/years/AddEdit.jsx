import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import { yearsService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

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
    //if(typeof values.isActive === "string") values.isActive = values.isActive == "true"
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
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex flex-row">
                <div>
                  <Link to={{
                    pathname: "/years"
                    }} >
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </Link>
                </div>
                <div>
                  <h2>
                    {isAddMode
                      ? "Nowy rocznik"
                      : "Edycja rocznika"}
                  </h2>
                </div>
              </div>
              {isAddMode && <FormikControl
                control="year"
                label={"Rocznik"}
                name="year"
                className="form-item-width"
                excluded={excludedYears}
                fullWidth
                margin="normal"
              />}
              <FormikControl
                control="input"
                type="text"
                label={"Hasło rocznika"}
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
              />
              </div>
              <FormikControl
                control="input"
                type="text"
                label={"Źródło grafiki"}
                name="imgSrc"
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
              onClick={() => onSubmitYear(formik.values)} 
              disabled={formik.isSubmitting || !formik.isValid} />
            {(!isAddMode) && <MuiButton 
              className="pl-5 pr-5 pt-2 pb-2"
              text={"Usuń"} 
              icon={MuiBtnType.DeleteWithoutIcon} 
              disabled={formik.isSubmitting}
              onClick={() => yearsService._delete(row.id).then(() => history.push({ pathname: "/years"}))}
              />
            }
              <Link to={{
                pathname: "/years"
            }} >
              <MuiButton disabled={formik.isSubmitting} className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };