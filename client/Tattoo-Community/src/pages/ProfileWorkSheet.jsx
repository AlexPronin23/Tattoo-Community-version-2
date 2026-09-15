import { Link } from "react-router";
import { useSelector } from "react-redux";

import "./style.scss";
const ProfileWorkSheet = () => {
  const { currentMaster, created, status } = useSelector(
    (state) => state.tattooMasters,
  );
  const {
    first_name,
    last_name,
    experience,
    isColored,
    isAtHome,
    tattooSalon,
    description,
    styles,
  } = currentMaster || {};
  return (
    <div className="worksheet">
      <div className="container">
        <div className="worksheet__content">
          {!created ? (
            <>
              <h1 className="worksheet__title">У вас пока нет анкеты</h1>
              <Link to="/create" className="button btn-create">
                Создать
              </Link>
            </>
          ) : (
            <>
              <ul className="worksheet__items">
                <li className="worksheet__item">Имя: {first_name}</li>
                <li className="worksheet__item">Фамилия: {last_name}</li>
                <li className="worksheet__item">Опыт: {experience} лет/года</li>
                <li className="worksheet__item">
                  Используете цветные краски: {isColored ? "Да" : "Нет"}
                </li>
                <li className="worksheet__item">
                  Тату салон: {!isAtHome ? "Фриланс" : tattooSalon}
                </li>
                <li className="worksheet__item">О себе: {description}</li>
              </ul>
              <p className="worksheet__style">Используемые стили: </p>
              <ul className="worksheet__styles">
                {styles.map((style) => (
                  <li key={style.style_id}>{style.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileWorkSheet;
