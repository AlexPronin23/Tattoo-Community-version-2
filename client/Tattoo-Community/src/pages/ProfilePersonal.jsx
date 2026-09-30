import { useSelector } from "react-redux";
import { Link } from "react-router";
import "./style.scss";
import { useEffect } from "react";
const ProfilePersonal = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const { user_id, email, phone, status } = currentUser;

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
          <div className="personal__button">
            <Link className="personal__back" to="/">
              Назад
            </Link>
            <Link to={`/personal/edit/${user_id}`} className="button btn-edit">
              Изменить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePersonal;
