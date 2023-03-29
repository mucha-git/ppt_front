import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "@/_components/Formik/FormikControl";
import { alertService, viewsService } from "@/_services";
import { useLocation, Link } from "react-router-dom";
import { ListType } from "../_helpers/ListType";
import { ScreenType } from "../_helpers/ScreenType";
import { AppContext } from "../_helpers/context";
import MuiButton from "../_components/MuiButton";
import { MuiBtnType } from "../_helpers/MuiBtnType";

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

  const btnTypes = [
    {key: "Tekst", value: "Text"},
    {key: "Grafika", value: "Graphic"}
  ]

  const contentTypes = [
    {key: "", value: null},
    {key: "Lista", value: "List"},
    {key: "Treści", value: "Elements"},
    {key: "Link Zewnętrzny", value: "ExternalLink"}
  ]

  const setContentType = (row) => {
    if(row.type.includes("External")) return "ExternalLink"
    switch (row.screenType) {
      case "ListScreen": return "List"
      case "TextScreen": return "Elements"
    }
  }

  const getScreenType = (values) => {
    if(values.contentType.includes("External")) return null
    switch (values.contentType) {
      case "List": return "ListScreen"
      case "Elements": return "TextScreen"
      default: null
    }
  }

  let {row, parentViewId } = location.state


  const initialValues = isAddMode
    ? {
        title: "",
        headerText: null,
        btnType: "Text",
        contentType: null,
        imgSrc: null,
        viewId: parentViewId,
        externalUrl: null
      }
    : {
        title: row.title,
        headerText: row.headerText,
        btnType: row.type.includes("Text")? "Text": "Graphic",
        contentType: setContentType(row),
        imgSrc: row.imgSrc,
        viewId: row.viewId,
        externalUrl: row.externalUrl
      };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Wymagany"),
    headerText: Yup.string().nullable(),
    btnType: Yup.string().required("Wymagany"),
    contentType: Yup.string().required("Wymagany"),
    imgSrc: Yup.string()
      .when('btnType', {
        is: 'Text',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('btnType', {
        is: 'Graphic',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      }),
    externalUrl: Yup.string()
      .when('contentType', {
        is: 'List',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('contentType', {
        is: 'Elements',
        then: fieldSchema => fieldSchema.nullable(),
      })
      .when('contentType', {
        is: 'ExternalLink',
        then: fieldSchema => fieldSchema.required('Wymagane'),
      })
  });

  const onSubmitViews = (values, openNew) => {
    if(values.headerText == null) values.headerText = values.title
    const screenType = getScreenType(values)
    values.type = screenType!=null? values.btnType: values.btnType + "ExternalLink",
    values.screenType=screenType,
    //values.screenType === ""? values.screenType = null: null;
    values.order=isAddMode? null : row.order
    if (isAddMode) {
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
    <div className="box-shadow-main bg-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={() => {}}
      >
        {(formik) => (
          <Form>
            <div className="pl-5 pr-5 pt-5 pb-3">
              <div className="d-flex flex-row">
                <div>{popup ? (
                  <a onClick={close}>
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </a>
                  ) : (
                  <Link to={{
                    pathname: "/views",
                    state: {yearId: popup
                      ? yearId
                      : location.state.yearId },
                    }} >
                    <h2><MuiButton className="pl-2 pr-2" icon={MuiBtnType.ArrowBack} /></h2>
                  </Link>
                  )}
                </div>
                <div>
                  <h2>
                    {isAddMode
                      ? "Nowy widok"
                      : "Edycja widoku"}
                  </h2>
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
              {formik.values.contentType != null && <div className="pt-3"><h5>Szczegóły widoku</h5></div>}
              {(formik.values.contentType === "List" || formik.values.contentType === "Elements") &&
              <FormikControl
                control="input"
                type="text"
                label={"Nagłówek"}
                name="headerText"
                className="form-item-width"
                fullWidth
                margin="normal"
              />
              }
              {formik.values.btnType === "Graphic"  &&
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
                {(formik.values.imgSrc != null && formik.values.imgSrc != "")? <img className="pt-2" src={formik.values.imgSrc} width={'100%'} height={'100%'} />: "Brak grafiki do wyświetlenia"}
                <div className="clear" />
              </>
              }
              {formik.values.contentType === "ExternalLink" &&
                <FormikControl
                  control="input"
                  type="text"
                  label={"Link zewnętrzny"}
                  name="externalUrl"
                  className="form-item-width"
                  fullWidth
                  margin="normal"
                />
              }
            </div>
            <div className="d-flex flex-row-reverse bg-light pl-5 pr-5 pt-3 pb-3" >
            {(!popup && isAddMode) && <MuiButton 
            className="pl-5 pr-5 pt-2 pb-2"
            text={"Zapisz i dodaj nowy"} 
            icon={MuiBtnType.SubmitAndNew} 
            onClick={() => onSubmitViews(formik.values, true)} 
            disabled={formik.isSubmitting || !formik.isValid} />
            }
            <MuiButton 
              className="pl-5 pr-5 pt-2 pb-2"
              text={"Zapisz"} 
              icon={MuiBtnType.Submit} 
              onClick={() => onSubmitViews(formik.values, false)} 
              disabled={formik.isSubmitting || !formik.isValid} />
            {(!popup && !isAddMode) && <MuiButton 
            className="pl-5 pr-5 pt-2 pb-2"
            text={"Usuń"} 
            icon={MuiBtnType.DeleteWithoutIcon} 
            disabled={formik.isSubmitting}
            onClick={() => viewsService._delete(row.id).then(() => history.push({ pathname: "/views", state: { yearId: location.state.yearId }}))}
             />
            }
            {popup ? (
                <MuiButton disabled={formik.isSubmitting} onClick={() => close()} className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
            
            ) : (
              <Link to={{
                pathname: "/views",
                state: {yearId: popup
                  ? yearId
                  : location.state.yearId },
            }} >
              <MuiButton disabled={formik.isSubmitting} className="pl-5 pr-5 pt-2 pb-2" text={"Anuluj"} icon={MuiBtnType.Cancel} />
              </Link>
            )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export { AddEdit };