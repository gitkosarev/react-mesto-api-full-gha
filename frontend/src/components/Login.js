import React, { useState, useEffect } from "react";

function Login({ updateHeaderActionCaption, handleLogin }) {
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    const setHeaderActionCaption = () => {
      updateHeaderActionCaption("Регистрация");
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
    handleLogin(values);
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
        className="login__form"
        id="LoginForm"
        name="LoginForm"
        action="#"
        method="post"
        autoComplete="off"
      >
        <input
          value={values.email}
          onChange={handleChange}
          id="login-email"
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
          id="login-password"
          className="login__input login__input_value_password"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          minLength="2"
          maxLength="50"
        />
        <button className="button login__submit" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login;