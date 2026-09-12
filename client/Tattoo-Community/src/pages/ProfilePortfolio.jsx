import { Link } from "react-router";
import { useSelector } from "react-redux";
import "./style.scss";
const ProfilePortfolio = () => {
  const { created } = useSelector((state) => state.tattooMasters);
  return (
    <div className="portfolio">
      <div className="container">
        <div className="portfolio__content">
          {!created ? (
            <>
              <h1 className=" portfolio__title">У вас пока нет портфолио</h1>
              <Link to="/create" className="button btn-create">
                Создать
              </Link>
            </>
          ) : (
            <>
              <h1>Данные пользователя</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePortfolio;
