import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, viewsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { ListType } from "../_helpers/ListType";
import { ScreenType } from "../_helpers/ScreenType";
import { AppContext } from "../_helpers/context";

function AddEdit({ history, popup, close, lista, setLista, yearId }) {
  const {updateViews, set} = useContext(AppContext)
  useEffect(() => {
    if(!set){
      const { from } = {from: { pathname: "/views"}}
      history.push(from);
    } 
  }, []);
  let location = useLocation();
  const isAddMode = location.state.row == null || popup ? true : false;
  const [submitting, setSubmitting] = useState(false);

  let {row, parentViewId } = location.state


  const initialValues = isAddMode
    ? {
        title: "",
        headerText: null,
        type: "Text",
        screenType: null,
        imgSrc: null,
        viewId: parentViewId,
        externalUrl: null
      }
    : {
        title: row.title,
        headerText: row.headerText,
        type: row.type,
        screenType: row.screenType? row.screenType : "",
        imgSrc: row.imgSrc,
        viewId: row.viewId,
        externalUrl: row.externalUrl
      };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Wymagany"),
    headerText: Yup.string().min(1)
      .when('type', {
        is: 'Text',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'Graphic',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'TextExternalLink',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'GraphicExternalLink',
        then: fieldSchema => fieldSchema.nullable(),
      }),
      //(type, field, val) => {
       //   console.log(val)
       //   (type == 'Text' || type == 'Graphic')? val.required("wymagane") : val
      //  }),
    type: Yup.string().required("Wymagany"),
    screenType: Yup.string()
      .when('type', {
        is: 'Text',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'Graphic',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'TextExternalLink',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'GraphicExternalLink',
        then: fieldSchema => fieldSchema.nullable(),
      }),
    imgSrc: Yup.string()
      .when('type', {
        is: 'Text',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'Graphic',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'TextExternalLink',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'GraphicExternalLink',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      }),
    externalUrl: Yup.string()
      .when('type', {
        is: 'Text',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'Graphic',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('type', {
        is: 'TextExternalLink',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
      .when('type', {
        is: 'GraphicExternalLink',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
  });

  const onSubmitViews = (values, openNew) => {
    values.screenType === ""? values.screenType = null: null;
    if (isAddMode) {
      values.order=2;
      popup
        ? (values.yearId = yearId)
        : values.yearId = location.state.yearId;
      if(values.viewId != null )values.viewId = parseInt(values.viewId, 10)
      viewsService
        .create(values)
        .then((x) => {
          updateViews(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          
          if (popup) {
            let i = lista;
            i.push({label: x.title, value: (x.id).toString()});
            setLista(i);
            close();
          } else {
            const { from } = openNew? {
              from: { pathname: "/views/dodaj", state: { yearId: location.state.yearId, parentViewId: parentViewId }},
            } :{
              from: { pathname: "/views", state: { yearId: location.state.yearId }},
            };
            history.push(from);
          }
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });  
    } else {
      values.id = row.id;
      values.yearId = row.yearId;
      viewsService
        .update(values)
        .then(() => {
          updateViews(values.yearId)
          alertService.success("Sukces", {
            keepAfterRouteChange: true,
          });
          const { from } = {
            from: { pathname: "/views", state: { yearId: location.state.yearId }},
          };
          history.push(from);
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });
    }
  }

  return (
    <div className="form-style">
      <h2>
        {isAddMode
          ? "Nowy widok"
          : "Edycja widoku"}
      </h2>
      <br></br>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {(formik) => (
          
          <Form>{console.log(formik.isValid)}
            <FormikControl
              control="input"
              type="text"
              label={"Tytuł"}
              name="title"
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="select"
              label={"Typ"}
              name="type"
              options={ListType}
              className="form-item-width"
              wymagane={true}
            />
            {(formik.values.type === "Text" || formik.values.type === "Graphic") &&
            <><FormikControl
              control="select"
              label={"Typ widoku"}
              name="screenType"
              options={ScreenType}
              className="form-item-width"
              wymagane={true}
            />
            <FormikControl
              control="input"
              type="text"
              label={"Nagłówek"}
              name="headerText"
              className="form-item-width"
            /></>
            }
            {(formik.values.type === "GraphicExternalLink" || formik.values.type === "Graphic") &&
            <>
              <FormikControl
                control="input"
                type="text"
                label={"Źródło grafiki"}
                name="imgSrc"
                className="form-item-width"
                wymagane={true}
              />
              {(formik.values.imgSrc != null && formik.values.imgSrc != "")? <img className="pt-2" src={formik.values.imgSrc} width={'100%'} height={'100%'} />: "Brak grafiki do wyświetlenia"}
              <div className="clear" />
            </>
            }
            {(formik.values.type === "GraphicExternalLink" || formik.values.type === "TextExternalLink") &&
              <FormikControl
                control="input"
                type="text"
                label={"Link zewnętrzny"}
                name="externalUrl"
                className="form-item-width"
                wymagane={true}
              />
            }
            <button
              className="btn m-1 btn-success"
              type="submit"
              onClick={() => formik.isValid && onSubmitViews(formik.values, false)}
              disabled={formik.isSubmitting}// ? true : false}
            >
              {formik.isSubmitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz
            </button>
            {(!popup && isAddMode) && <button
              className="btn m-1 btn-success"
              onClick={() => formik.isValid && onSubmitViews(formik.values, true)}
              disabled={submitting ? true : false}
            >
              {submitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Zapisz i dodaj nowy
            </button>
            }
            {popup ? (
              <a onClick={close}>
                <button className="btn m-1 btn-danger">
                  Anuluj
                </button>
              </a>
            ) : (
              <Link to={{
                pathname: "/views",
                state: {yearId: popup
                  ? yearId
                  : location.state.yearId },
            }} >
                <button className="btn m-1 btn-danger" type="submit">
                  Anuluj
                </button>
              </Link>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };