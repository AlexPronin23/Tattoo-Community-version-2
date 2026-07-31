import "./style.scss";

// Images

import CloseButton from "../../assets/icon/Header/CloseButton.svg";

// Components
import Nav from "../Nav/Nav";

const MobileMenu = ({ closeMobile }) => {
  return (
    <>
      {/* Mobile navigation */}
      <nav className="mobile_nav">
        <Nav />
      </nav>

      {/* Mobile button group */}
      <div className="mobile_group">
        <button className="button btn-login">Войти</button>
        <button className="button btn-reg">Зарегистрироваться</button>
      </div>

      <button onClick={() => closeMobile()}>
        <img src={CloseButton} alt="Close button" className="mobile_close" />
      </button>
    </>
  );
};

export default MobileMenu;
