import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, viewsService } from "@/_services";
import { useLocation } from "react-router-dom";
import { AppContext } from "../_helpers/context";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const { updateViews, set } = useContext(AppContext);
  useEffect(() => {
    if (!set) {
      const { from } = { from: { pathname: "/views" } };
      history.push(from);
    }
  }, []);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const btnTypes = [
    { key: "Tekst", value: "Text" },
    { key: "Grafika", value: "Graphic" },
  ];

  const contentTypes = [
    { key: "Lista", value: "List" },
    { key: "Treści", value: "Elements" },
    { key: "Link zewnętrzny", value: "ExternalLink" },
  ];

  const setContentType = (row) => {
    if (row.type.includes("External")) return "ExternalLink";
    switch (row.screenType) {
      case "ListScreen":
        return "List";
      case "TextScreen":
        return "Elements";
    }
  };

  const getScreenType = (values) => {
    if (values.contentType.includes("External")) return null;
    switch (values.contentType) {
      case "List":
        return "ListScreen";
      case "Elements":
        return "TextScreen";
    }
  };

  let { row, parentViewId } = location.state;

  const initialValues = isAddMode
    ? {
        title: "",
        headerText: null,
        btnType: "Text",
        contentType: "List",
        imgSrc: null,
        viewId: parentViewId,
        externalUrl: null,
      }
    : {
        title: row.title,
        headerText: row.headerText,
        btnType: row.type.includes("Text") ? "Text" : "Graphic",
        contentType: setContentType(row),
        imgSrc: row.imgSrc,
        viewId: row.viewId,
        externalUrl: row.externalUrl,
      };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .max(80, "Maksymalna liczba znaków to 80")
      .required("Pole jest wymagane"),
    headerText: Yup.string()
      .max(80, "Maksymalna liczba znaków to 80")
      .nullable(),
    btnType: Yup.string().required("Pole jest wymagane"),
    contentType: Yup.string().required("Pole jest wymagane"),
    imgSrc: Yup.string()
      .max(1000, "Maksymalna liczba znaków to 1000")
      .when("btnType", {
        is: "Text",
        then: (fieldSchema) => fieldSchema.nullable(),
      })
      .when("btnType", {
        is: "Graphic",
        then: (fieldSchema) =>
          fieldSchema.required("Brak grafiki do wyświetlenia"),
      }),
    externalUrl: Yup.string()
      .max(1000, "Maksymalna liczba znaków to 1000")
      .when("contentType", {
        is: "List",
        then: (fieldSchema) => fieldSchema.nullable(),
      })
      .when("contentType", {
        is: "Elements",
        then: (fieldSchema) => fieldSchema.nullable(),
      })
      .when("contentType", {
        is: "ExternalLink",
        then: (fieldSchema) => fieldSchema.required("Wymagane"),
      }),
  });

  const onSubmitViews = (formik, openNew) => {
    let values = formik.values;
    const screenType = getScreenType(values);
    (values.type =
      screenType != null ? values.btnType : values.btnType + "ExternalLink"),
      (values.screenType = screenType),
      (values.order = isAddMode ? null : row.order);
    if (isAddMode) {
      popup
        ? (values.yearId = yearId)
        : (values.yearId = location.state.yearId);
      if (values.viewId != null) values.viewId = parseInt(values.viewId, 10);
      viewsService
        .create(values)
        .then((x) => {
          updateViews(values.yearId);
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });

          if (popup) {
            let i = lista;
            i.push({ label: x.title, value: x.id.toString() });
            setLista(i);
            close();
          } else {
            const { from } = openNew
              ? {
                  from: {
                    pathname: "/views/dodaj",
                    state: {
                      yearId: location.state.yearId,
                      parentViewId: parentViewId,
                      opened: location.state.opened
                    },
                  },
                }
              : {
                  from: {
                    pathname: "/views",
                    state: { yearId: location.state.yearId, opened: location.state.opened },
                  },
                };
            formik.resetForm();
            formik.setSubmitting(false);
            history.push(from);
          }
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    } else {
      values.id = row.id;
      values.yearId = row.yearId;
      viewsService
        .update(values)
        .then(() => {
          updateViews(values.yearId);
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: {
              pathname: "/views",
              state: { yearId: location.state.yearId, opened: location.state.opened },
            },
          };
          history.push(from);
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alertService.error(error);
        });
    }
  };

  const onDelete = (formik) => {
    formik.setSubmitting(true);
    viewsService
      ._delete(row.id)
      .then(() => {
        updateViews(row.yearId);
        alertService.success("Pomyslnie usunięto widok");
        history.push({ pathname: "/views", state: { yearId: row.yearId, opened: location.state.opened } });
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
        {(formik) => {
          return (
            <Form>
              <div className="pl-5 pr-5 pt-5 pb-3">
                <div className="d-flex">
                  <div>
                    {popup ? (
                      <a onClick={close}>
                        <h2>
                          <MuiButton
                            className="pl-2 pr-2"
                            icon={MuiBtnType.ArrowBack}
                          />
                        </h2>
                      </a>
                    ) : (
                      <h2>
                        <MuiButton
                          className="pl-2 pr-2"
                          icon={MuiBtnType.ArrowBack}
                          onClick={() => {
                            history.push({
                              pathname: "/views",
                              state: {
                                yearId: popup ? yearId : location.state.yearId,
                                opened: location.state.opened
                              },
                            });
                          }}
                        />
                      </h2>
                    )}
                  </div>
                  <div>
                    <h2>{isAddMode ? "Nowy widok" : "Edycja widoku"}</h2>
                  </div>
                  <div className="ml-auto d-flex align-items-center">
                    {!popup && !isAddMode && (
                      <MuiButton
                        icon={MuiBtnType.Delete}
                        type="button"
                        id={"delete-view-" + row.id}
                        showTooltip={true}
                        tooltip={"Usuń widok"}
                        disabled={formik.isSubmitting}
                        onClick={() => onDelete(formik)}
                      />
                    )}
                  </div>
                </div>
                <FormikControl
                  control="input"
                  type="text"
                  label={"Tytuł"}
                  name="title"
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
                <FormikControl
                  control="muiSelect"
                  label={"Rodzaj kafelka"}
                  name="btnType"
                  options={btnTypes}
                  fullWidth
                  margin="normal"
                />
                <FormikControl
                  control="muiSelect"
                  label={"Rodzaj zawartości"}
                  name="contentType"
                  options={contentTypes}
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
                {formik.values.contentType != null && (
                  <div className="pt-3">
                    <h5>Szczegóły widoku</h5>
                  </div>
                )}
                {(formik.values.contentType === "List" ||
                  formik.values.contentType === "Elements") && (
                  <FormikControl
                    control="input"
                    type="text"
                    label={"Nagłówek"}
                    name="headerText"
                    className="form-item-width"
                    fullWidth
                    margin="normal"
                  />
                )}
                {formik.values.contentType === "ExternalLink" && (
                  <FormikControl
                    control="input"
                    type="text"
                    label={"Link zewnętrzny"}
                    name="externalUrl"
                    className="form-item-width"
                    fullWidth
                    margin="normal"
                  />
                )}
                {formik.values.btnType === "Graphic" &&
                  formik.values.contentType != null && (
                    <>
                      <FormikControl
                        control="input"
                        type="text"
                        label={"Źródło grafiki"}
                        name="imgSrc"
                        className="form-item-width"
                        fullWidth
                        margin="normal"
                      />
                      {formik.values.imgSrc != null &&
                      formik.values.imgSrc != "" ? (
                        <img
                          className="pt-2"
                          src={formik.values.imgSrc}
                          width={"100%"}
                          height={"100%"}
                        />
                      ) : (
                        ""
                      )}
                      <div className="clear" />
                    </>
                  )}
              </div>
              <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3">
                {!popup && isAddMode && (
                  <MuiButton
                    className="pl-5 pr-5 pt-2 pb-2"
                    text={"Zapisz i dodaj kolejny"}
                    icon={MuiBtnType.SubmitAndNew}
                    tooltip="Aby aktywować wypełnij poprawnie formularz"
                    onClick={() => onSubmitViews(formik, true)}
                    disabled={formik.isSubmitting || !formik.isValid}
                  />
                )}
                <MuiButton
                  className="pl-5 pr-5 pt-2 pb-2"
                  text={"Zapisz"}
                  tooltip="Aby aktywować wypełnij poprawnie formularz"
                  icon={MuiBtnType.Submit}
                  onClick={() => onSubmitViews(formik, false)}
                  disabled={formik.isSubmitting || !formik.isValid}
                />

                {popup ? (
                  <MuiButton
                    disabled={formik.isSubmitting}
                    onClick={() => close()}
                    className="pl-5 pr-5 pt-2 pb-2"
                    text={"Anuluj"}
                    icon={MuiBtnType.Cancel}
                  />
                ) : (
                  <MuiButton
                    disabled={formik.isSubmitting}
                    className="pl-5 pr-5 pt-2 pb-2"
                    text={"Anuluj"}
                    icon={MuiBtnType.Cancel}
                    onClick={() =>
                      history.push({
                        pathname: "/views",
                        state: {
                          yearId: popup ? yearId : location.state.yearId,
                          opened: location.state.opened
                        },
                      })
                    }
                  />
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export { AddEdit };
