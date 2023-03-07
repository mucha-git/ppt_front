import React, { useState, useContext } from "react";
import { mapsService } from "@/_services";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "@/_components/Formik/FormikControl";
import * as Yup from "yup";
import { MapsTable } from "./elements/MapsTable";
import {AppContext} from '../_helpers/context'

function Overview({ match }) {
  const {setContext} = useContext(AppContext)
  const { path } = match;
  let location = useLocation();
  const [yearId, setYearId] = useState(location.state? location.state.yearId: 1);

  const onSubmitForm = (values) => {
    mapsService.getMaps(values.year).then(e => {setYearId(values.year); setContext(values.year)});
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
                    <button className="btn btn-success" type="submit">
                      Szukaj
                    </button>
                  </div>
                  <div className="clear" />
                </div>
              </Form>
            )}
          </Formik>
        <MapsTable yearId={yearId} path={path} />
      </div>
    </div>
  );
}

export { Overview };