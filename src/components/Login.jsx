// @ts-check

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import login from '../../assets/images/login.jpeg';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const authErrorMessage = 'Неверные имя пользователя или пароль';

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const generateOnSubmit = async ({
  values,
  setAuthFailed,
  auth,
  inputRef,
  navigate,
}) => {
  try {
    const { data } = await axios.post(routes.loginPath(), values);
    setAuthFailed(false);
    auth.logIn(JSON.stringify(data));
    navigate('/', { replace: true });
  } catch (e) {
    if (e.isAxiosError && e.response.status === 401) {
      setAuthFailed(true);
      auth.logOut();
      inputRef.current.select();
    }
    throw e;
  }
};

function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const navigate = useNavigate();

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => generateOnSubmit({
      values,
      setAuthFailed,
      auth,
      inputRef,
      navigate,
    }),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} alt="Войти" className="rounded-circle" />
              </div>
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={f.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    ref={inputRef}
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Ваш ник"
                    autoComplete="username"
                    onChange={f.handleChange}
                    value={f.values.username}
                  />
                  <label htmlFor="username" className="form-label">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    type="password"
                    placeholder="Пароль"
                    autoComplete="current-password"
                    onChange={f.handleChange}
                    value={f.values.password}
                  />
                  <label htmlFor="password" className="form-label">Пароль</label>
                  {authFailed && <div className="invalid-feedback d-block">{authErrorMessage}</div>}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                  Войти
                </button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
