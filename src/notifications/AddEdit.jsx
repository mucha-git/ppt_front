import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { Link } from "react-router-dom";
import { oneSignalService, accountService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import moment from 'moment';
import dayjs from 'dayjs';

function AddEdit({ history }) {
  const user = accountService.userValue;
  const initialValues = {
        name: "",
        content: undefined,
        headings: undefined,
        send_after: dayjs(Date.now())
      }
    ;

  const validationSchema = Yup.object({
    name: Yup.string().max(150, "Maksymalnie 150 znaków").required("Pole jest wymagane"),
    content: Yup.string().max(150, "Maksymalnie 150 znaków").required("Pole jest wymagane"),
    headings: Yup.string().max(500, "Maksymalnie 500 znaków").required("Pole jest wymagane"),
    send_after: Yup.date().required("Pole jest wymagane")
  });

  const onSubmitNotification = (values) => {
    values.send_after = Date.now()>=values.send_after? moment(Date.now()).add(3, 's').format() : moment(values.send_after).format()
    oneSignalService
      .create({name: values.name, 
              contents: { en: values.content}, 
              headings: {en: values.headings }, 
              app_id: user.oneSignalAppId,
              included_segments: ['Subscribed Users'],
              send_after: values.send_after,
              delayed_option: 'send_after' })
      .then(() => {
        alertService.success("Sukces", {
          eepAfterRouteChange: true,
        });
        history.push('/notifications')}
      ) 
  }

  return (
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitNotification}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex flex-row">
                <div>
                  <Link to={{
                    pathname: "/notifications"
                    }} >
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </Link>
                </div>
                <div>
                  <h2>Nowe powiadomienie
                  </h2>
                </div>
              </div>
              <FormikControl
                control="input"
                type="text"
                label={"Nazwa"}
                name="name"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Nagłówek"}
                name="headings"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <FormikControl
                control="input"
                type="text"
                label={"Tekst"}
                name="content"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              <div className="d-flex justify-content-center">
                  <FormikControl
                    control="dateTime"
                    label={"Data i godzina wysłania powiadomienia"}
                    name="send_after"
                    className="form-item-width"
                  />
              </div>
              
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3" >
              <MuiButton 
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"} 
                icon={MuiBtnType.Submit} 
                disabled={formik.isSubmitting || !formik.isValid} />
              
              <Link to={{
                pathname: "/notifications"
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