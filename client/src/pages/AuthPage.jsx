// Страница авторизации

import React, { useState, useEffect, useContext } from "react";
import useRequest from "../hooks/request.hook.jsx";
import useMessage from "../hooks/message.hook.jsx";
import AuthContext from "../context/AuthContext.jsx";
import "./AuthPage.css"

function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, error, clearError } = useRequest(); // ошибка error прилетает из request.hook

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  // следить за ошибками и показать их при помощи M (Materialize)
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form })
      message(data.message)
    } catch (err) {
      // обработано в request.hook
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form })
      message(data.message);
      auth.login(data.token, data.userID)
    } catch (error) {
      console.log(`loginHandler: ${error}`)
    }
  }

  return (
    <div className="row">
      <div className="col s12 m8 offset-m2">
        <div className="card grey darken-1">
          <div className="card-content white-text">
            <span
              className="card-title"
              style={{ textTransform: "uppercase" }}
            >
              Войти в свой аккаунт
            </span>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Введите email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Введите пароль</label>
              </div>
            </div>
            <div className="auth-buttons">
              <button
                className="btn waves-effect waves-light"
                style={{ marginRight: 10 }}
                onClick={loginHandler}>
                Войти
              </button>
              <button
                className="btn waves-effect waves-light light-blue"
                onClick={registerHandler}>
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <h1></h1>



    // </div>
  )
}

export default AuthPage;