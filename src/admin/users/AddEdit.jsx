import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';
import { Role } from '../../_helpers/role';
import { AppContext } from '../../_helpers/context';

function AddEdit({ history, match }) {
    const { pilgrimages } = useContext(AppContext);
    const { id } = match.params;
    const isAddMode = !id;
    const initialValues = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
        pilgrimageId: ''
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
        role: Yup.string()
            .required('Wybierz rolę'),
        pilgrimageId: Yup.string()
            .required('Wybierz pielgrzymkę'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Podaj hasło') : null)
            .min(6, 'Hasło musi zawierać przynajmniej 6 znaków'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Powtórz hasło');
            })
            .oneOf([Yup.ref('password')], 'HAsła muszą być identyczne')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        fields.pilgrimageId = parseInt(fields.pilgrimageId)
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting);
        } else {
            updateUser(id, fields, setSubmitting);
        }
    }

    function createUser(fields, setSubmitting) {
        accountService.create(fields)
            .then(() => {
                alertService.success('Pomyślnie dodano nowego użytkownika', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateUser(id, fields, setSubmitting) {
        accountService.update(id, fields)
            .then(() => {
                alertService.success('Aktualizacja przebiegła pomyślnie', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        accountService.getById(id).then(user => {
                            const fields = ['title', 'firstName', 'lastName', 'email', 'role', 'pilgrimageId'];
                            fields.forEach(field => setFieldValue(field, user[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
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
                        <div className="form-row">
                            <div className="form-group col-7">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col">
                                <label>Rola</label>
                                <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    <option value="User">Użytkownik</option>
                                    {accountService.userValue.role == Role.Admin && <option value="Admin">Administrator</option>}
                                    <option value="Manager">Manager</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className='form-row'>
                        <div className="form-group col">
                                <label>Pielgrzymka</label>
                                <Field name="pilgrimageId" as="select" className={'form-control' + (errors.pilgrimageId && touched.pilgrimageId ? ' is-invalid' : '')}>
                                    <option value=""></option>
                                    {pilgrimages.map(element => <option value={element.id} >{element.name}</option>
                                    )}
                                </Field>
                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        {!isAddMode &&
                            <div>
                                <h3 className="pt-3">Zmiana hasła</h3>
                                <p>Pozostaw niewypełnione aby pozostawić aktualne hasło</p>
                            </div>
                        }
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
                            <button type="submit" disabled={isSubmitting} className="btn m-1 btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Zapisz
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn m-1 btn-link">Anuluj</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEdit };