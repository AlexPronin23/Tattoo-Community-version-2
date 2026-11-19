// React
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

// Redux
import { getOneMaster } from "../slices/tattooMastersSlice";
import { getOnePortfolio } from "../slices/portfolioSlice";
import { setOpen } from "../slices/modalSlice";
import { getCurrentMasterServices } from "../slices/serviceSlice";
import { createReviews, getMasterReviews } from "../slices/reviewSlice";
import { showPopup, hidePopup } from "../slices/popupSlice";

const MasterPage = () => {
  const { id } = useParams();
  const now = new Date();
  const dispatch = useDispatch();
  const { masterPage } = useSelector((state) => state.tattooMasters);
  const { currentMasterServices } = useSelector((state) => state.service);
  const { currentPortfolio = [] } = useSelector((state) => state.portfolio);
  const { reviews, status, reviewsType, masterRate } = useSelector(
    (state) => state.review,
  );
  const [review, setReview] = useState({
    message: "",
    rate: "",
  });
  const { message, rate } = review;
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
    dispatch(getOnePortfolio({ id }));
    dispatch(getCurrentMasterServices({ id }));
    dispatch(getMasterReviews({ id }));
  }, [dispatch, id]);

  if (!masterPage) {
    return <p>Загрузка...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCreateReviews = async () => {
    if (!message || !rate) {
      alert("Введите полные данные!");
      return;
    }

    try {
      const resultAction = await dispatch(
        createReviews({
          master_id: id,
          message: message,
          rate: rate,
          dateReview: now.toLocaleDateString("sv-SE"),
          timeReview: now.toLocaleTimeString("sv-SE"),
        }),
      );

      if (createReviews.fulfilled.match(resultAction)) {
        setReview({
          message: "",
          rate: "",
        });

        dispatch(
          showPopup({
            type: "success",
            message: resultAction.payload.message,
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
        }, 1500);
      } else if (createReviews.rejected.match(resultAction)) {
        dispatch(
          showPopup({
            type: "error",
            message: resultAction.payload.message,
          }),
        );

        setTimeout(() => {
          dispatch(hidePopup());
        }, 1500);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getReviewsType = (rateValue) => {
    const numRate = Number(rateValue);
    if (numRate === 0 || numRate === 1) return "terrible";
    if (numRate === 2 || numRate === 3) return "satisfactory";
    if (numRate === 4 || numRate === 5) return "excellent";
    return "";
  };

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

          <div className="info__services">
            <h2 className="info__services__title">Мои услуги: </h2>
            <table>
              <thead>
                <tr>
                  <th>Название услуги</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {currentMasterServices.map((item) => (
                  <tr key={item.service_id}>
                    <td>{item.masterServicesInfo?.name || "Не указано"}</td>
                    <td>{item.servicePrice} руб</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="info__portfolio__title">Мои работы: </h2>
          <div className="info__portfolio">
            {currentPortfolio.map((photo) => (
              <div className="info__portfolio__photos" key={photo.portfolio_id}>
                <img
                  src={photo.img}
                  alt="Master work"
                  className="info__portfolio__photo"
                />
              </div>
            ))}
          </div>

          <div className="info__reviews">
            <h2 className="title info__reviews__title">Оставьте отзыв</h2>
            <div className="info__reviews__form">
              <div className="info__reviews__column">
                <label className="info__reviews__label">Ваш отзыв:</label>
                <textarea
                  className="info__reviews__textarea"
                  maxLength={255}
                  value={message}
                  name="message"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="info__reviews__column">
                <label className="info__reviews__label">
                  Поставьте рейтинг:
                </label>
                <input
                  className="info__reviews__input"
                  maxLength={1}
                  value={rate}
                  name="rate"
                  type="text"
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                className="button btn-review"
                onClick={fetchCreateReviews}
              >
                Оставить отзыв
              </button>
            </div>
            <div className="info__reviews__content">
              {status === "Загрузка" ? (
                <>
                  <p className="info__reviews__loading">Загрузка...</p>
                </>
              ) : (
                <>
                  {reviews.length > 0 ? (
                    <div className="info__reviews__grid">
                      {reviews.map((review) => (
                        <div
                          className={`info__reviews__card info__reviews__card-${getReviewsType(review.rate)}`}
                          key={review.review_id}
                        >
                          <div className="info__reviews__card__top">
                            <p className="info__reviews__email">
                              От кого: {review.client.email}
                            </p>
                            <p className="info__reviews__date">
                              Дата: {review.dateReview}
                            </p>
                            <p className="info__reviews__time">
                              Время: {review.timeReview}
                            </p>
                            <p className="info__reviews__rate">
                              Рейтинг: {review.rate}
                            </p>
                          </div>
                          <p className="info__reviews__message">
                            {review.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="info__reviews__none">Пока нет отзывов.</p>
                    </>
                  )}
                </>
              )}
            </div>
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
