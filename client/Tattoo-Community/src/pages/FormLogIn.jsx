import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { userLogin } from "../slices/userSlice";

import "./style.scss";

const FormLogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const fetchUserLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Данные должны быть заполнены");
      return;
    }

    try {
      const resultAction = await dispatch(userLogin({ email, password }));
      if (userLogin.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message);
        setData({
          email: "",
          password: "",
        });
        navigate("/", { replace: true });
      } else if (userLogin.rejected.match(resultAction)) {
        alert(resultAction.payload);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form_title">Войти</h2>

        <form onSubmit={fetchUserLogin}>
          <div className="form_inner">
            <div className="form_column">
              <label className="form_label">Email: </label>

              <input
                type="email"
                value={email}
                required
                placeholder="Введите email"
                maxLength={254}
                name="email"
                className="form_input"
                onChange={handleData}
              />

              <div className="form_help">
                <span>?</span>

                <div className="form_tooltip">
                  <ul className="form_items">
                    <li className="form_item">
                      Email должен совпадать с адресом, указанным при
                      регистрации
                    </li>
                    <li className="form_item">
                      Убедитесь, что вводите email без опечаток и лишних
                      пробелов
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form_column">
              <label className="form_label">Пароль: </label>

              <input
                type="password"
                value={password}
                required
                placeholder="Введите пароль"
                minLength={8}
                maxLength={16}
                name="password"
                className="form_input"
                onChange={handleData}
              />

              <div className="form_help">
                <span>?</span>

                <div className="form_tooltip">
                  <ul className="form_items">
                    <li className="form_item">
                      Убедитесь, что вводите правильный пароль
                    </li>
                    <li className="form_item">
                      При ошибке входа проверьте Caps Lock и раскладку
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button type="submit" className="button btn-login">
              Войти
            </button>

            <Link to={"/register"} className="form_link">
              Еще нет аккаунта?
            </Link>
            <Link to={"/"} className="form_link">
              Назад
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogIn;
