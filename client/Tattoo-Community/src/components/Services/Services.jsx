import "./style.scss";

// Images

import FirstPicture from "@assets/img/Main/Services/FirstPicture.png";
import SecondPicture from "@assets/img/Main/Services/SecondPicture.png";
import ThirdPicture from "@assets/img/Main/Services/ThirdPicture.png";

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="services__wrapper">
          <h1 className="title services__title">Услуги</h1>

          <div className="services__card">
            <div className="card">
              <img
                src={FirstPicture}
                alt="First Picture"
                className="card__img"
              />
              <p className="card__text">Профиль мастера</p>
            </div>

            <div className="card">
              <img
                src={SecondPicture}
                alt="Second Picture"
                className="card_img"
              />
              <p className="card__text">Продвижение бренда</p>
            </div>

            <div className="card">
              <img
                src={ThirdPicture}
                alt="Third Picture"
                className="card_img"
              />
              <p className="card__text">Онлайн чат</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
