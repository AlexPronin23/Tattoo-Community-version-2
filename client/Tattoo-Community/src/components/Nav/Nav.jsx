import "./style.scss";
const Nav = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 50;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <ul className="nav__items">
      <li className="nav__item">
        <button
          href="#"
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
        >
          О нас
        </button>
      </li>
      <li className="nav__item">
        <button
          href="#"
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contacts");
          }}
        >
          Контакты
        </button>
      </li>
      <li className="nav__item">
        <button
          href="#"
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("masters");
          }}
        >
          Тату мастера
        </button>
      </li>
      <li className="nav__item">
        <button
          href="#"
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("services");
          }}
        >
          Услуги
        </button>
      </li>
    </ul>
  );
};

export default Nav;
