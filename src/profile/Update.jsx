import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Update({ history }) {
    const user = accountService.userValue;
    const initialValues = {
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Podaj tytuł'),
        firstName: Yup.string()
            .required('Podaj imię'),
        lastName: Yup.string()
            .required('Podaj nazwisko'),
        email: Yup.string()
            .email('Email jest niepoprawny')
            .required('Podaj email'),
        password: Yup.string()
            .min(6, 'Hasło musi zawierać co najmniej 6 znaków'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password != "" && password != null) return schema.required('Powtórz hasło');
            })
            .oneOf([Yup.ref('password')], 'Hasła muszą być identyczne')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        fields.pilgrimageId = user.pilgrimageId
        setStatus();
        accountService.update(user.id, fields)
            .then(() => {
                alertService.success('Zapisano zmiany', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Czy na pewno chcesz usunąć konto?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Konto zostało usunięte'));
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Edycja konta</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Tytuł</label>
                            <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="Pan">Pan</option>
                                <option value="Pani">Pani</option>
                                <option value="Ks.">Ks.</option>
                            </Field>
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Imię</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Nazwisko</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    
                    <h3 className="pt-3">Zmiana hasła</h3>
                    <p>Pozostaw puste aby pozostawić aktualne hasło</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Hasło</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Powtórz hasło</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn m-1 btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Zapisz
                        </button>
                        <button type="button" onClick={() => onDelete()} className="btn m-1 btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Usuń</span>
                            }
                        </button>
                        <Link to="." className="btn m-1 btn-link">Anuluj</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };