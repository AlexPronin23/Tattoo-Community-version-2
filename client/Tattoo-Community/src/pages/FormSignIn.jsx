import { Link, useNavigate } from "react-router-dom";

import "./style.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegistration } from "../slices/userSlice";

const FormSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isTattooMaster, setIsTattooMaster] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { email, phone, password, confirmPassword } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !phone || !password || !confirmPassword) {
      alert("Данные должны быть заполнены");
      return;
    }

    if (password !== confirmPassword) {
      alert("Пароли должны совпадать");
      return;
    }

    try {
      const resultAction = await dispatch(
        userRegistration({
          email,
          phone,
          password,
          status: isTattooMaster,
        }),
      );

      if (userRegistration.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message);
        setData({ email: "", phone: "", password: "", confirmPassword: "" });
        setIsTattooMaster(false);
        navigate("/login", { replace: true });
      } else {
        alert(resultAction.payload || "Ошибка регистрации");
      }
    } catch (error) {
      alert("Произошла ошибка");
    }
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleType = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form__title">Регистрация</h2>

        <form onSubmit={handleSubmit}>
          <div className="form__inner">
            <div className="form__column">
              <label className="form__label">Email: </label>

              <input
                value={email}
                type="email"
                required
                placeholder="Введите email"
                maxLength={254}
                className="form__input"
                name="email"
                onChange={handleData}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Введите корректный email — он станет вашим логином.
                    </li>
                    <li className="form__item">
                      Он понадобится для подтверждения регистрации и входа в
                      аккаунт.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label">Телефон: </label>

              <input
                value={phone}
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                maxLength={15}
                className="form__input"
                name="phone"
                onChange={handleData}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Введите действующий номер телефона.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label">Пароль: </label>

              <div className="form__password">
                <input
                  value={password}
                  type={isOpen ? "text" : "password"}
                  required
                  placeholder="Введите пароль"
                  minLength={8}
                  maxLength={16}
                  className="form__input"
                  name="password"
                  onChange={handleData}
                />

                <button
                  type="button"
                  onClick={() => handleType()}
                  className="form__toggle"
                ></button>
              </div>

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Минимум 8 символов: буквы, цифры или знаки
                    </li>
                    <li className="form__item">
                      Чем сложнее пароль — тем безопаснее ваш аккаунт
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form__column">
              <label className="form__label"> Подтвердите Пароль: </label>

              <input
                value={confirmPassword}
                type={isOpen ? "text" : "password"}
                required
                placeholder="Введите пароль повторно"
                minLength={8}
                maxLength={16}
                className="form__input"
                name="confirmPassword"
                onChange={handleData}
              />
            </div>

            <div className="form__column">
              <label className="form__label"> Тату мастер? </label>

              <input
                checked={isTattooMaster}
                type="checkbox"
                className="form__input form__input-checkbox"
                onChange={(e) => setIsTattooMaster(e.target.checked)}
              />

              <div className="form__help">
                <span>?</span>

                <div className="form__tooltip">
                  <ul className="form__items">
                    <li className="form__item">
                      Если поставили галочку,то получаете доступ к личному
                      профилю
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <button type="submit" className="button btn-reg">
              Зарегистрироваться
            </button>
            <Link to={"/login"} className="form__link">
              Уже есть аккаунт?
            </Link>

            <Link to={"/"} className="form__link">
              Назад
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignIn;
