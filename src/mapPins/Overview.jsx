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
import { NavLink } from "react-router-dom";


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
    <div className="p-4 box-shadow-main">
      <div className="container">
      <div><h2>Pinezki map</h2></div>
      <div className="d-flex">
        <div className="mr-auto">
        {years.length > 1 && 
          <Formik initialValues={initialValues} onSubmit={onSubmitForm} validationSchema={validationSchema}>
            {(formik) => (
              <Form>
                
                    <FormikControl
                        control="select"
                        label={"Rok"}
                        name="year"
                        showLabel={false}
                        options={years.map(y => {return {key: y.id, value: y.year}})}
                        className="form-item-width left"
                        wymagane={true}
                    />
                  <MuiButton icon={MuiBtnType.Search} text={"Zmień"} />
              </Form>
            )}
          </Formik>
        }
        </div>
        <div>
          <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: year } }} className="nav-item center-divs">
            <MuiButton icon={MuiBtnType.Add} text="Dodaj nową pinezkę" className="p-2 pr-4 pl-4" />
          </NavLink>
        </div>
        <div><SendToApp /></div>
        </div>
        <MapPinsTable yearId={year} path={path} />
      </div>
    </div>
  );
}

export { Overview };