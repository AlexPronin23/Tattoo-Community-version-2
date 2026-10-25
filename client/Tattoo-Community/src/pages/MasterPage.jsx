// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router";

// Redux
import { getOneMaster } from "../slices/tattooMastersSlice";
import { getOnePortfolio } from "../slices/portfolioSlice";
import { setOpen } from "../slices/modalSlice";

const MasterPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.users.users);
  const { masterPage } = useSelector((state) => state.tattooMasters);
  const { currentPortfolio = [] } = useSelector((state) => state.portfolio);
  const {
    first_name,
    last_name,
    experience,
    isColored,
    isAtHome,
    tattooSalon,
    description,
    cardImg,
    styles = [],
    workaddress,
    homeaddress,
  } = masterPage || {};
  useEffect(() => {
    dispatch(getOneMaster({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getOnePortfolio({ id }));
  }, [dispatch, id]);

  if (!masterPage) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="info">
      <div className="container">
        <div className="info__wrapper">
          <div className="info__content">
            <ul className="info__items">
              <li className="info__item">
                <img src={cardImg} alt="Master avatar" className="info__img" />
              </li>
              <li className="info__item">Имя: {first_name}</li>
              <li className="info__item">Фамилия: {last_name}</li>
              {/* <li className="info__item">Телефон: {users.phone}</li> */}
              <li className="info__item">Опыт работы: {experience} лет/года</li>
              <li className="info__item">
                Использую ли цветные краски {isColored ? "Да" : "Нет"}
              </li>
              <li className="info__item">
                Тату салон : {!isAtHome ? tattooSalon : "Работает на дому"}
              </li>
              <li className="info__item">
                {!isAtHome
                  ? `Рабочий адрес:   ${workaddress}`
                  : `Домашний адрес:  ${homeaddress || ""}`}
              </li>
              <li className="info__item">О себе :{description}</li>
            </ul>

            <div className="info__style">
              <p>Какие стили использую:</p>
              <ul className="info__styles">
                {styles.map((style) => (
                  <li key={style.style_id} className="info__styles__item">
                    {style.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h2 className="info__portfolio__title">Мои работы: </h2>
          <div className="info__portfolio">
            {currentPortfolio.map((photo) => (
              <div className="info__portfolio__photos" key={photo.user_id}>
                <img
                  src={photo.img}
                  alt="Master work"
                  className="info__portfolio__photo"
                />
              </div>
            ))}
          </div>
          <button
            className="button btn-info"
            onClick={() => dispatch(setOpen())}
          >
            Записаться
          </button>
          <Link className="info__back" to={"/"}>
            Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterPage;
