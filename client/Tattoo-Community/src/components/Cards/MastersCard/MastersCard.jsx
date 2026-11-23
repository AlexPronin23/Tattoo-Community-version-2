// Styles
import "./style.scss";

// React
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Redux
import { getAverageMasterRate } from "../../../slices/reviewSlice";
import { getAverageMasterServicePrice } from "../../../slices/serviceSlice";

// Images
import UserImg from "../../../assets/img/Main/Masters/UserImg.jpg";

const MastersCard = ({
  user_id,
  first_name,
  last_name,
  tattooSalon,
  isAtHome,
  experience,
  cardImg,
}) => {
  const dispatch = useDispatch();
  const { averageRates } = useSelector((state) => state.review);
  const { averageServicePrices } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAverageMasterRate(user_id));
    dispatch(getAverageMasterServicePrice(user_id));
  }, [dispatch, user_id]);

  const currentRate = averageRates[user_id];
  const currentPrice = averageServicePrices[user_id];

  return (
    <Link
      key={user_id}
      to={`/master/${user_id}`}
      className="tattoomasters__card"
    >
      <img
        src={cardImg || UserImg}
        alt="Tattoo Masters picture"
        className="tattoomasters__card-img"
      />
      <div className="tattoomasters__card-info">
        <h2 className="tattoomasters__card-name">
          Имя тату мастера: {first_name}
        </h2>
        <h2 className="tattoomasters__card-name">
          Фамилия тату мастера: {last_name}
        </h2>

        <p className="tattoomasters__card-salon">
          Тату салон: {!isAtHome ? tattooSalon : "Работает на дому"}
        </p>

        <p className="tattoomasters__card-experience">Опыт: {experience} лет</p>

        <p className="tattoomasters__card-rate">Рейтинг: {currentRate || 0} </p>

        <p className="tattoomasters__card-price">
          Цена на услуги от {currentPrice || 0} руб
        </p>
      </div>
    </Link>
  );
};

export default MastersCard;
