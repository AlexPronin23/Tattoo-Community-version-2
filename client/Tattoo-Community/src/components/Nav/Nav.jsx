import "./style.scss";
const Nav = () => {
  return (
    <ul className="nav_items">
      <li className="nav_item">
        <a href="#" className="nav_link">
          О нас
        </a>
      </li>
      <li className="nav_item">
        <a href="#" className="nav_link">
          Контакты
        </a>
      </li>
      <li className="nav_item">
        <a href="#" className="nav_link">
          Тату мастера
        </a>
      </li>
      <li className="nav_item">
        <a href="#" className="nav_link">
          Услуги
        </a>
      </li>
    </ul>
  );
};

export default Nav;
