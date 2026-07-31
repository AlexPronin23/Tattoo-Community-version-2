import { Link } from "react-router-dom";

import "./style.scss";
import { useState } from "react";

const FormSignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isTattooMaster, setIsTattooMaster] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { email, password, confirmPassword } = data;

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

  async function fetchCreat(e) {
    if (e) e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Заполните все поля!");
      return;
    }

    if (confirmPassword !== password) {
      alert("Пароли должны совпадать");
      return;
    }
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          status: isTattooMaster,
        }),
      });

      const responseMessage = await res.json();

      if (res.ok) {
        setData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsTattooMaster(false);
        alert(responseMessage.successMessage);
      } else {
        alert(responseMessage.message);
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form">
      <div className="container">
        <h2 className="title form_title">Регистрация</h2>

        <form onSubmit={fetchCreat}>
          <div className="form_inner">
            <div className="form_column">
              <label className="form_label">Email: </label>

              <input
                value={email}
                type="email"
                required
                placeholder="Введите email"
                maxLength={254}
                className="form_input"
                name="email"
                onChange={handleData}
              />

              <div className="form_help">
                <span>?</span>

                <div className="form_tooltip">
                  <ul className="form_items">
                    <li className="form_item">
                      Введите корректный email — он станет вашим логином.
                    </li>
                    <li className="form_item">
                      Он понадобится для подтверждения регистрации и входа в
                      аккаунт.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form_column">
              <label className="form_label">Пароль: </label>

              <div className="form_password">
                <input
                  value={password}
                  type={isOpen ? "text" : "password"}
                  required
                  placeholder="Введите пароль"
                  maxLength={16}
                  className="form_input"
                  name="password"
                  onChange={handleData}
                />

                <button
                  type="button"
                  onClick={() => handleType()}
                  className="form_toggle"
                ></button>
              </div>

              <div className="form_help">
                <span>?</span>

                <div className="form_tooltip">
                  <ul className="form_items">
                    <li className="form_item">
                      Минимум 8 символов: буквы, цифры или знаки
                    </li>
                    <li className="form_item">
                      Чем сложнее пароль — тем безопаснее ваш аккаунт
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="form_column">
              <label className="form_label"> Подтвердите Пароль: </label>

              <input
                type={isOpen ? "text" : "password"}
                required
                placeholder="Введите пароль повторно"
                maxLength={16}
                className="form_input"
              />
            </div>

            <div className="form_column">
              <label className="form_label"> Тату мастер? </label>

              <input
                checked={isTattooMaster}
                type="checkbox"
                className="form_input form_input-checkbox"
                onChange={(e) => setIsTattooMaster(e.target.checked)}
              />

              <div className="form_help">
                <span>?</span>

                <div className="form_tooltip">
                  <ul className="form_items">
                    <li className="form_item">
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
            <Link to={"/login"} className="form_link">
              Уже есть аккаунт?
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

export default FormSignIn;
