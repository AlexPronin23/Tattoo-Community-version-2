import { Link } from "react-router";
import UserImg from "../../../assets/img/Main/Masters/UserImg.jpg";
import "./style.scss";

const MastersCard = ({
  user_id,
  first_name,
  last_name,
  tattooSalon,
  experience,
  cardImg,
}) => {
  return (
    <Link key={user_id} className="tattoomasters_card">
      <img
        src={cardImg || UserImg}
        alt="Tattoo Masters picture"
        className="tattoomasters_card-img"
      />

      <div className="tattoomasters_card-info">
        <h2 className="tattoomasters_card-name">
          Имя тату мастера: {first_name}
        </h2>
        <h2 className="tattoomasters_card-name">
          Фамилия тату мастера: {last_name}
        </h2>

        <p className="tattoomasters_card-salon">Тату салон: {tattooSalon}</p>

        <p className="tattoomasters_card-experience">Опыт: {experience} лет</p>
      </div>

      <button className="button tattoomasters_card-btn">Записаться</button>
    </Link>
  );
};

export default MastersCard;
