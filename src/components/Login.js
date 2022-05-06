import React from 'react';
import login from '../../assets/images/login.jpeg';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup.string().min(3).max(16).required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={login} alt="Войти" className="rounded-circle"/>
              </div>
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Ваш ник"
                    autoComplete="username"
                    onChange={handleChange}
                    value={values.username}
                  />
                  <label htmlFor="username" className="form-label">Ваш ник</label>
                  {errors.username && <div className="invalid-feedback d-block">{errors.username}</div>}
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
                    onChange={handleChange}
                    value={values.password}
                  />
                  <label htmlFor="password" className="form-label">Пароль</label>
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
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
};

export default Login;
