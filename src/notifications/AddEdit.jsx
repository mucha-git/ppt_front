import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AppContext } from "../_helpers/context";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService } from "@/_services";
import { oneSignalService, accountService } from "../_services";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";
import moment from "moment";
import dayjs from "dayjs";
import { viewListForNavigation } from "../_helpers";
import { redirectionOption } from "../_helpers/redirectionOption";

function AddEdit({ history }) {
  const { isSet, views, oneSignalAppBundleId } = useContext(AppContext);
  useEffect(() => {
    isSet();
  }, []);
  const user = accountService.userValue;
  const initialValues = {
    name: "",
    content: undefined,
    headings: undefined,
    send_after: dayjs(Date.now()),
    redirectionOptionId: 1,
    destinationViewId: -1,
    destinationUrl: ""
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(150, "Maksymalnie 150 znaków")
      .required("Pole jest wymagane"),
    content: Yup.string()
      .max(150, "Maksymalnie 150 znaków")
      .required("Pole jest wymagane"),
    headings: Yup.string()
      .max(500, "Maksymalnie 500 znaków")
      .required("Pole jest wymagane"),
    send_after: Yup.date().required("Pole jest wymagane"),
    destinationViewId: Yup.number().nullable(),
    destinationUrl: Yup.string()
  });

  const onSubmitNotification = (values) => {
    values.send_after =
      Date.now() >= values.send_after
        ? moment(Date.now()).add(3, "s").format()
        : moment(values.send_after).format();
    oneSignalService
      .create({
        name: values.name,
        contents: { en: values.content },
        headings: { en: values.headings },
        app_id: user.oneSignalAppId,
        included_segments: ["Subscribed Users"],
        send_after: values.send_after,
        delayed_option: "send_after",
        url: genetrateNotificationURL(values)
      })
      .then(() => {
        alertService.success("Sukces", {
          eepAfterRouteChange: true,
        });
        history.push("/notifications");
      });
  };

  const genetrateNotificationURL = (values) => {
    return values.redirectionOptionId == 1? genetrateInternalNotificationURL(values.destinationViewId) : values.destinationUrl
  }

  const genetrateInternalNotificationURL = (id) => {
    let view = views.find(v => v.id == id);
    if(!view) return `${oneSignalAppBundleId}://`
    let screenType = getScreenType(view.screenType)
    return screenType=="list"? 
                `${oneSignalAppBundleId}://${screenType}/true/${id}/${view.isSearchable}`
                : `${oneSignalAppBundleId}://${screenType}/true/${id}`
  }

  console.log(viewListForNavigation(views))

  const getScreenType = (screenType) => screenType.replace("Screen", "").toLowerCase()

  return (
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitNotification}
        validateOnChange={true}
        isInitialValid={false}
      >
        {(formik) => (
          <Form>
            <div className="p-4">
              <div className="d-flex flex-row">
                <div>
                  <h2>
                    <MuiButton
                      className="pl-2 pr-2"
                      icon={MuiBtnType.ArrowBack}
                      onClick={() => {
                        history.push({ pathname: "/notifications" });
                      }}
                    />
                  </h2>
                </div>
                <div>
                  <h2>Nowe powiadomienie</h2>
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
              <div className="pt-2">
                <h5>Przekierowanie z powiadomienia</h5>
                <FormikControl
                control="muiSelect"
                label={"Przekierowanie"}
                name="redirectionOptionId"
                options={redirectionOption}
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              {formik.values.redirectionOptionId == 1 && 
                <FormikControl
                  control="muiSelect"
                  label={"Widok"}
                  name="destinationViewId"
                  options={viewListForNavigation(views)}
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                /> 
              }
              {formik.values.redirectionOptionId == 2 && 
                <FormikControl
                  control="input"
                  type="text"
                  label={"Link zewnętrzny"}
                  name="destinationUrl"
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
              }
              </div>
              <div className="d-flex justify-content-center">
                <FormikControl
                  control="dateTime"
                  label={"Data i godzina wysłania powiadomienia"}
                  name="send_after"
                  className="form-item-width"
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-1 pr-1 pt-1 pb-1">
              <MuiButton
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Zapisz"}
                icon={MuiBtnType.Submit}
                disabled={formik.isSubmitting || !formik.isValid}
              />
              <MuiButton
                disabled={formik.isSubmitting}
                className="pl-5 pr-5 pt-2 pb-2"
                text={"Anuluj"}
                icon={MuiBtnType.Cancel}
                onClick={() => {
                  history.push({ pathname: "/notifications" });
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
