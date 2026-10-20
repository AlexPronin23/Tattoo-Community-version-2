import "./style.scss";
const Nav = () => {
  return (
    <ul className="nav__items">
      <li className="nav__item">
        <a href="#" className="nav__link">
          О нас
        </a>
      </li>
      <li className="nav__item">
        <a href="#" className="nav__link">
          Контакты
        </a>
      </li>
      <li className="nav__item">
        <a href="#" className="nav__link">
          Тату мастера
        </a>
      </li>
      <li className="nav__item">
        <a href="#" className="nav__link">
          Услуги
        </a>
      </li>
    </ul>
  );
};

export default Nav;
