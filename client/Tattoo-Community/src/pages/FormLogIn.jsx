import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userLogin } from "../slices/userSlice";

import { showPopup, hidePopup } from "../slices/popupSlice";

import "./style.scss";

const FormLogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
        setData({
          email: "",
          password: "",
        });
        dispatch(
          showPopup({
            message: resultAction.payload.message,
            type: "success",
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
          setIsLoading(true);
        }, 1500);

        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 3000);
      } else if (userLogin.rejected.match(resultAction)) {
        dispatch(
          showPopup({
            message: resultAction.payload.message,
            type: "error",
          }),
        );
        setTimeout(() => {
          dispatch(hidePopup());
        }, 1500);
      }
    } catch (error) {
      dispatch(
        showPopup({
          message: error.message,
          type: "error",
        }),
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Войти</h2>

        <form onSubmit={fetchUserLogin}>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Email: </label>

              <input
                type="email"
                value={email}
                required
                placeholder="Введите email"
                maxLength={254}
                name="email"
                className="form__input"
                onChange={handleChange}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Email должен совпадать с адресом, указанным при
                      регистрации
                    </li>
                    <li className="form__item">
                      Убедитесь, что вводите email без опечаток и лишних
                      пробелов
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label">Пароль: </label>

              <input
                type="password"
                value={password}
                required
                placeholder="Введите пароль"
                minLength={8}
                maxLength={16}
                name="password"
                className="form__input"
                onChange={handleChange}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Убедитесь, что вводите правильный пароль
                    </li>
                    <li className="form__item">
                      При ошибке входа проверьте Caps Lock и раскладку
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button type="submit" className="button btn-login">
              Войти
            </button>

            <Link to={"/register"} className="form__link">
              Еще нет аккаунта?
            </Link>
            <Link to={"/"} className="form__link">
              Назад
            </Link>
          </div>
        </form>
        {/* Loading screen */}
        <div className={`form__loading ${isLoading ? "open" : ""}`}>
          <div className="spinner"></div>
        </div>
        {/* Popup */}
      </div>
    </div>
  );
};

export default FormLogIn;
