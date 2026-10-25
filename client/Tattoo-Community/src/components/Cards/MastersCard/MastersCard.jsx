// Styles
import "./style.scss";

// React
import { Link } from "react-router";

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
  price,
}) => {
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

        <p className="tattoomasters__card-price">
          Цена на услуги от {price} руб
        </p>
      </div>
    </Link>
  );
};

export default MastersCard;
