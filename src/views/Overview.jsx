import React, { useState, useContext, useEffect } from "react";
import { viewsService } from "@/_services";
import { Formik, Form } from "formik";
import FormikControl from "@/_components/Formik/FormikControl";
import * as Yup from "yup";
import { ViewsTable } from "./elements/ViewsTable";
import {AppContext} from '../_helpers/context'

function Overview({ match }) {
  const {isSet, setData, yearId, years} = useContext(AppContext)
  const { path } = match;
  const [year, setYearId] = useState(yearId);
  
  useEffect(() => {
    isSet()
  }, []);

  const onSubmitForm = (values) => {
    console.log(values)
    viewsService.getViews(values.year).then(e => {setYearId(values.year); setData(values.year)});
  };

  const initialValues = {
    year: yearId,
  };

  const validationSchema = Yup.object({
    year: Yup.number()
        .required("Wymagane")
  });

  return (
    <div className="p-4">
      <div className="container">
        {years.length > 1 && 
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
                        options={years.map(y => {return {key: y.year, value: y.id}})}
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
        }
        <ViewsTable parentViewId={null} yearId={year} path={path} />
      </div>
    </div>
  );
}

export { Overview };