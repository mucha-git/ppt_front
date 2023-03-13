import React, { useState, useContext, useEffect } from "react";
import { mapPinsService } from "@/_services";
import { useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "@/_components/Formik/FormikControl";
import * as Yup from "yup";
import { MapPinsTable } from "./elements/MapPinsTable";
import {AppContext} from '../_helpers/context'
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import SendToApp from "../_components/SendToApp";


function Overview({ match }) {
  const {isSet, setData, yearId, years} = useContext(AppContext)
  const { path } = match;
  const [year, setYearId] = useState(yearId);

  useEffect(() => {
    isSet()
  }, []);

  const onSubmitForm = (values) => {
    mapPinsService.getMapPins(values.year).then(e => {setYearId(values.year); setData(values.year)});
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
      <div className="d-flex justify-content-between">
        {years.length > 1 && 
          <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            {(formik) => (
              <Form>
                
                    <FormikControl
                        control="select"
                        label={"Rok"}
                        name="year"
                        showLabel={false}
                        options={years.map(y => {return {key: y.year, value: y.id}})}
                        className="form-item-width left"
                        wymagane={true}
                    />
                  <MuiButton icon={MuiBtnType.Search} text={"Zmień"} />
              </Form>
            )}
          </Formik>
        }
        <div><h2>Pinezki map</h2></div>
        <div><SendToApp /></div>
        </div>
        <MapPinsTable yearId={year} path={path} />
      </div>
    </div>
  );
}

export { Overview };