import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Register({ updateHeaderActionCaption, handleRegister }) {
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    const setHeaderActionCaption = () => {
      updateHeaderActionCaption("Войти", "/sign-in");
    };
    setHeaderActionCaption();
  }, []);

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  };

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        id="RegisterForm"
        name="RegisterForm"
        action="#"
        method="post"
        autoComplete="off"
      >
        <input
          value={values.email}
          onChange={handleChange}
          id="register-email"
          className="login__input login__input_value_email"
          type="email"
          name="email"
          required
          placeholder="Email"
          minLength="2"
          maxLength="40"
        />
        <input
          value={values.password}
          onChange={handleChange}
          id="register-password"
          className="login__input login__input_value_password"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          minLength="2"
          maxLength="50"
        />
        <button className="button login__submit" type="submit">Зарегистрироваться</button>
        <p className="register__text">
          Уже зарегистрированы? <Link className="register__link" to="/sign-in">Войти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;