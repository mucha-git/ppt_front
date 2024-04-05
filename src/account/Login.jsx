import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {AppContext} from '../_helpers/context'
import bcrypt from "bcryptjs";

import { accountService, alertService } from '@/_services';
import { Role } from '../_helpers';

function Login({ history, location }) {
    const { isSet } = useContext(AppContext);
    const initialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email jest niepoprawny')
            .required('Podaj email'),
        password: Yup.string().required('Podaj hasło')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.sendLogin(email).then((s) => {
            accountService.login(
                email, 
                bcrypt.hashSync(bcrypt.hashSync(password, s.salt) + s.random, 11)
            )
            .then(() => 
                isSet()).then( () => {
                    const { from } = location.state || { from: { pathname: "/applications" } };
                    history.push(from);
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
        })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="card-header">Logowanie</h3>
                    <div className="card-body">
                        <div className="form-group">
                            <label>Email</label>
                            <Field name="email" type="text" data-testid="login-email-field" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label>Hasło</label>
                            <Field name="password" type="password" data-testid="login-password-field" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <button type="submit" data-testid="login-zaloguj-button" disabled={isSubmitting} className="btn m-1 btn-primary">
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Zaloguj
                                </button>
                            </div>
                            <div className="form-group col text-right">
                                <Link to="forgot-password" className="btn m-1 btn-link pr-0">Zapomniałeś hasła?</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Login }; 