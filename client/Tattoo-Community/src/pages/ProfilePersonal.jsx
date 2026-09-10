import { useSelector } from "react-redux";
import { Link } from "react-router";
import "./style.scss";
import { useEffect } from "react";
const ProfilePersonal = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const { email, phone, status } = currentUser;

  return (
    <div className="personal">
      <div className="container">
        <div className="personal__content">
          <p className="personal__title">Пользователь {email}</p>
          <ul className="personal__items">
            <li className="personal__item">Email : {email}</li>
            <li className="personal__item">Телефон : {phone}</li>
            <li className="personal__item">
              Статус : {status ? "Тату мастер" : "Пользователь"}
            </li>
          </ul>
          <Link className="personal__back" to="/">
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonal;
