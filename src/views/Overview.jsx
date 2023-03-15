import React, { useState, useContext, useEffect } from "react";
import { viewsService } from "@/_services";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import FormikControl from "@/_components/Formik/FormikControl";
import * as Yup from "yup";
import { ViewsTable } from "./elements/ViewsTable";
import {AppContext} from '../_helpers/context'
import SendToApp from '@/_components/SendToApp'
import MuiButton from '@/_components/MuiButton'
import { MuiBtnType } from "../_helpers/MuiBtnType";

function Overview({ match }) {
  const {isSet, setData, yearId, years} = useContext(AppContext)
  const { path } = match;
  const [year, setYearId] = useState(yearId);
  
  useEffect(() => {
    isSet()
  }, []);

  const onSubmitForm = (values) => {
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
    <div className="p-4 box-shadow-main">
      <div className="container ">
        <div><h2>Widoki</h2></div>
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
          <NavLink to={{pathname: `${path}/dodaj`, state: {yearId: year, parentViewId: null} }} className="nav-item center-divs">
            <MuiButton icon={MuiBtnType.Add} text="Dodaj nowy widok" className="p-2 pr-4 pl-4" />
          </NavLink>
        </div>
        <div><SendToApp /></div>
        </div>
        <ViewsTable parentViewId={null} yearId={year} path={path} />
      </div>
    </div>
  );
}

export { Overview };