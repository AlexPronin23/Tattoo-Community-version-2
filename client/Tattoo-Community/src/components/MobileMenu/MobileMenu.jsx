import "./style.scss";

//React
import { useSelector } from "react-redux";
import { Link } from "react-router";

// Images
import CloseButton from "../../assets/icon/Header/CloseButton.svg";

// Components
import Nav from "../Nav/Nav";

const MobileMenu = ({ closeMobile }) => {
  const { isAuth } = useSelector((state) => state.users);
  return (
    <>
      {/* Mobile navigation */}
      <nav className="mobile__nav">
        <Nav />
      </nav>

      {/* Mobile button group */}
      <div className="mobile__group">
        {isAuth ? (
          <>
            <Link to={"/profile"} className="mobile__account">
              Личный кабинет
            </Link>
          </>
        ) : (
          <>
            <button className="button btn-login">Войти</button>
            <button className="button btn-reg">Зарегистрироваться</button>
          </>
        )}
      </div>

      <button onClick={() => closeMobile()}>
        <img src={CloseButton} alt="Close button" className="mobile__close" />
      </button>
    </>
  );
};

export default MobileMenu;
