// Страница авторизации

import React, { useState, useEffect } from "react";
import useRequest from "../hooks/request.hook.js";
import useMessage from "../hooks/message.hook.js";

function AuthPage() {
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
      // console.log(data)
    } catch (err) {
      // обработано в request.hook
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form })
      message(data.message);
    } catch (error) {
      console.log(`loginHandler: ${error}`)
    }
  }

  return (
    <div>
      <h1>Войти в свой аккаунт</h1>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Введите email"
        onChange={changeHandler}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Введите пароль"
        onChange={changeHandler}
      />
      <button onClick={loginHandler}>Войти</button>
      <button onClick={registerHandler}>Регистрация</button>
    </div>
  )
}

export default AuthPage;