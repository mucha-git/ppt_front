import React, { useState, useContext } from "react";
import { viewsService } from "@/_services";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "@/_components/Formik/FormikControl";
import * as Yup from "yup";
import { ViewsTable } from "./elements/ViewsTable";
import {AppContext} from '../_helpers/context'

function Overview({ match }) {
  const {setContext} = useContext(AppContext)
  const { path } = match;
  let location = useLocation();
  console.log(location.state)
  const [yearId, setYearId] = useState((location.state != null && location.state.yearId != undefined)? location.state.yearId: 1);

  console.log(yearId)
  const onSubmitForm = (values) => {
    viewsService.getViews(values.year).then(e => {setYearId(values.year); setContext(values.year)});
  };

  const initialValues = {
    year: 1,
  };

  const validationSchema = Yup.object({
    year: Yup.number()
        .required("Wymagane")
  });

  return (
    <div className="p-4">
      <div className="container">
          <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            {(formik) => (
              <Form>
                <div className="center-divs w-50">
                  <div className="left">
                    <FormikControl
                        control="select"
                        label={"Rok"}
                        name="year"
                        showLabel={false}
                        options={[{key: 2022, value: 1}]}
                        className="form-item-width left"
                        wymagane={true}
                    />
                  </div>
                  <div className="left">
                    <button className="button edytuj" type="submit">
                      Szukaj
                    </button>
                  </div>
                  <div className="clear" />
                </div>
              </Form>
            )}
          </Formik>
        <ViewsTable parentViewId={null} yearId={yearId} path={path} />
      </div>
    </div>
  );
}

export { Overview };